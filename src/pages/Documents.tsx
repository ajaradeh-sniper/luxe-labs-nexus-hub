import { DashboardLayout } from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentManagement } from '@/components/documents/DocumentManagement';
import { DocumentWorkflows } from '@/components/documents/DocumentWorkflows';
import { FileText, Workflow } from 'lucide-react';

export default function Documents() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Document Management</h1>
            <p className="text-muted-foreground">Manage documents, workflows, and document processing</p>
          </div>
        </div>

        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Document Management
            </TabsTrigger>
            <TabsTrigger value="workflows" className="flex items-center gap-2">
              <Workflow className="h-4 w-4" />
              Document Workflows
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-6">
            <DocumentManagement />
          </TabsContent>

          <TabsContent value="workflows" className="space-y-6">
            <DocumentWorkflows />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}