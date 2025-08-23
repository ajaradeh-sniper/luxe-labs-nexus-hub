import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  FileText, 
  Download, 
  Trash2, 
  Search,
  Filter,
  Eye,
  Share,
  FolderPlus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RoleBasedRoute } from '@/components/RoleBasedRoute';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  category: string;
  status: 'draft' | 'approved' | 'archived';
  tags: string[];
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Property_Agreement_001.pdf',
    type: 'pdf',
    size: 2048576,
    uploadedBy: 'John Doe',
    uploadedAt: '2024-01-15',
    category: 'Contracts',
    status: 'approved',
    tags: ['contract', 'property', 'legal']
  },
  {
    id: '2',
    name: 'Project_Blueprint_Tower_A.dwg',
    type: 'dwg',
    size: 5242880,
    uploadedBy: 'Jane Smith',
    uploadedAt: '2024-01-20',
    category: 'Blueprints',
    status: 'draft',
    tags: ['blueprint', 'architecture', 'tower-a']
  },
  {
    id: '3',
    name: 'Financial_Report_Q1.xlsx',
    type: 'xlsx',
    size: 1024000,
    uploadedBy: 'Mike Johnson',
    uploadedAt: '2024-01-25',
    category: 'Reports',
    status: 'approved',
    tags: ['financial', 'quarterly', 'report']
  }
];

export function DocumentManagement() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const categories = ['all', 'Contracts', 'Blueprints', 'Reports', 'Permits', 'Other'];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpload = () => {
    toast({
      title: 'Upload Started',
      description: 'Document upload functionality will be implemented with file storage.',
    });
  };

  const handleDownload = (doc: Document) => {
    toast({
      title: 'Download Started',
      description: `Downloading ${doc.name}`,
    });
  };

  const handleDelete = (docId: string) => {
    setDocuments(docs => docs.filter(d => d.id !== docId));
    toast({
      title: 'Document Deleted',
      description: 'Document has been removed successfully.',
    });
  };

  return (
    <RoleBasedRoute allowedRoles={['administrator', 'project_manager', 'real_estate_director', 'finance_lead']}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-2">
            <Button onClick={handleUpload} className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FolderPlus className="h-4 w-4" />
              New Folder
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="grid" className="space-y-4">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-medium truncate" title={doc.name}>
                        {doc.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(doc.size)}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">
                        {doc.category} • {doc.uploadedAt}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {doc.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{doc.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => handleDownload(doc)}>
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDownload(doc)}>
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleDelete(doc.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="h-6 w-6 text-blue-500" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{doc.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{doc.category}</span>
                            <span>•</span>
                            <span>{formatFileSize(doc.size)}</span>
                            <span>•</span>
                            <span>{doc.uploadedBy}</span>
                            <span>•</span>
                            <span>{doc.uploadedAt}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => handleDownload(doc)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDownload(doc)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Share className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleDelete(doc.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </RoleBasedRoute>
  );
}