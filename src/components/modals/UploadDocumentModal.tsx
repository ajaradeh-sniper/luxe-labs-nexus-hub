import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiFormData } from "@/lib/api";
import { 
  Upload, 
  FileText, 
  Image, 
  File, 
  X, 
  Loader2,
  CheckCircle 
} from "lucide-react";

const documentCategories = [
  { value: 'contract', label: 'Contract' },
  { value: 'permit', label: 'Permit/License' },
  { value: 'financial', label: 'Financial Document' },
  { value: 'legal', label: 'Legal Document' },
  { value: 'technical', label: 'Technical Drawing' },
  { value: 'photo', label: 'Photo/Image' },
  { value: 'report', label: 'Report' },
  { value: 'other', label: 'Other' },
];

interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  id: string;
}

export function UploadDocumentModal({ 
  open, 
  onClose 
}: { 
  open: boolean; 
  onClose: () => void;
}) {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(ext || '')) return Image;
    if (['pdf', 'doc', 'docx', 'txt'].includes(ext || '')) return FileText;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles: FileUpload[] = selectedFiles.map(file => ({
      file,
      progress: 0,
      status: 'pending',
      id: Math.random().toString(36).substr(2, 9)
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleUpload = async () => {
    if (files.length === 0 || !category) return;

    setIsUploading(true);
    
    try {
      for (const fileUpload of files) {
        if (fileUpload.status === 'completed') continue;
        
        setFiles(prev => prev.map(f => 
          f.id === fileUpload.id 
            ? { ...f, status: 'uploading', progress: 0 }
            : f
        ));

        // Create form data
        const formData = new FormData();
        formData.append('file', fileUpload.file);
        formData.append('category', category);
        formData.append('description', description);

        // Simulate progress for demo
        const progressInterval = setInterval(() => {
          setFiles(prev => prev.map(f => 
            f.id === fileUpload.id 
              ? { ...f, progress: Math.min(f.progress + 10, 90) }
              : f
          ));
        }, 200);

        try {
          await apiFormData('/api/documents/upload', formData);
          
          clearInterval(progressInterval);
          setFiles(prev => prev.map(f => 
            f.id === fileUpload.id 
              ? { ...f, status: 'completed', progress: 100 }
              : f
          ));
        } catch (error) {
          clearInterval(progressInterval);
          setFiles(prev => prev.map(f => 
            f.id === fileUpload.id 
              ? { ...f, status: 'error', progress: 0 }
              : f
          ));
          throw error;
        }
      }

      toast({ title: 'Documents uploaded successfully' });
      handleClose();
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    if (!isUploading) {
      setFiles([]);
      setCategory('');
      setDescription('');
      onClose();
    }
  };

  const completedFiles = files.filter(f => f.status === 'completed').length;
  const canUpload = files.length > 0 && category && !isUploading;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Documents
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Document Category *</Label>
            <Select value={category} onValueChange={setCategory} disabled={isUploading}>
              <SelectTrigger>
                <SelectValue placeholder="Select document category" />
              </SelectTrigger>
              <SelectContent>
                {documentCategories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Brief description of the documents..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isUploading}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Files</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                Select Files
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.svg"
            />

            {files.length === 0 ? (
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center text-muted-foreground">
                <Upload className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No files selected</p>
                <p className="text-xs">Select files to upload</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {files.map((fileUpload) => {
                  const FileIcon = getFileIcon(fileUpload.file.name);
                  return (
                    <div key={fileUpload.id} className="flex items-center gap-3 p-2 border rounded">
                      <div className={`p-1 rounded ${
                        fileUpload.status === 'completed' ? 'bg-green-100 text-green-600' :
                        fileUpload.status === 'error' ? 'bg-red-100 text-red-600' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {fileUpload.status === 'completed' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <FileIcon className="h-4 w-4" />
                        )}
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-medium truncate">{fileUpload.file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(fileUpload.file.size)}
                        </p>
                        
                        {fileUpload.status === 'uploading' && (
                          <Progress value={fileUpload.progress} className="h-1 mt-1" />
                        )}
                      </div>

                      {fileUpload.status === 'pending' && !isUploading && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(fileUpload.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {isUploading && (
            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Uploading {completedFiles} of {files.length} files...
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Cancel'}
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={!canUpload}
          >
            {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Upload {files.length > 0 ? `${files.length} File${files.length > 1 ? 's' : ''}` : 'Documents'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}