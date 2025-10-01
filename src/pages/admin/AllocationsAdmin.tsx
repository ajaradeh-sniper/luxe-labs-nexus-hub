import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { AllocationManagement } from '@/components/admin/AllocationManagement';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Helmet } from 'react-helmet-async';

// TODO: Replace with actual project fetching
const mockProjects = [
  { id: '1', name: 'Al Barari Villa Renovation' },
  { id: '2', name: 'Palm Jumeirah Penthouse' },
  { id: '3', name: 'Dubai Marina Tower' },
];

export default function AllocationsAdmin() {
  const [selectedProject, setSelectedProject] = useState<string>(mockProjects[0]?.id || '');

  return (
    <DashboardLayout>
      <Helmet>
        <title>Allocations Management | Luxury Labs Admin</title>
        <meta name="description" content="Manage investor allocations and e-signatures" />
      </Helmet>
      
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold">Allocations & E-Signatures</h1>
          <p className="text-muted-foreground">
            Manage investor allocations, send documents, and track signatures
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Project</label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {selectedProject && <AllocationManagement projectId={selectedProject} />}
      </div>
    </DashboardLayout>
  );
}
