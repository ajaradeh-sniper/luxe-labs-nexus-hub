import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAllocations } from '@/hooks/useAllocations';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { 
  FileSignature, 
  CheckCircle2, 
  Send, 
  DollarSign,
  User
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AllocationManagement({ projectId }: { projectId: string }) {
  const { list, loading, convertToCapTable, sendSignatureRequest } = useAllocations(projectId);
  const [selectedVendor, setSelectedVendor] = useState<string>("dropbox_sign");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_docs': return 'bg-yellow-100 text-yellow-800';
      case 'docs_sent': return 'bg-blue-100 text-blue-800';
      case 'signed': return 'bg-green-100 text-green-800';
      case 'funded': return 'bg-green-600 text-white';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Allocations Management</h2>
        <p className="text-muted-foreground">
          Manage investor allocations, send documents, and track signatures
        </p>
      </div>

      {/* E-signature Vendor Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">E-Signature Settings</CardTitle>
          <CardDescription>Choose your e-signature vendor</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedVendor} onValueChange={setSelectedVendor}>
            <SelectTrigger className="w-[280px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dropbox_sign">Dropbox Sign (HelloSign)</SelectItem>
              <SelectItem value="docusign">DocuSign</SelectItem>
              <SelectItem value="adobe">Adobe Sign</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-2">
            Note: Vendor API integration required for production use
          </p>
        </CardContent>
      </Card>

      {/* Allocations List */}
      <div className="space-y-4">
        {list.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No allocations yet</h3>
              <p className="text-muted-foreground">
                Allocations will appear here once investors express interest
              </p>
            </CardContent>
          </Card>
        ) : (
          list.map((allocation) => (
            <Card key={allocation.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      Allocation #{allocation.id.slice(0, 8)}
                    </CardTitle>
                    <CardDescription>
                      {allocation.opportunity?.title || allocation.project?.name || 'N/A'}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(allocation.status)}>
                    {allocation.status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Allocated Amount</p>
                      <p className="font-semibold">{formatCurrency(allocation.allocated_amount)}</p>
                    </div>
                    {allocation.units && (
                      <div>
                        <p className="text-sm text-muted-foreground">Units</p>
                        <p className="font-semibold">{allocation.units}</p>
                      </div>
                    )}
                    {allocation.unit_price && (
                      <div>
                        <p className="text-sm text-muted-foreground">Unit Price</p>
                        <p className="font-semibold">{formatCurrency(allocation.unit_price)}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {allocation.status === 'pending_docs' && (
                      <Button
                        onClick={() => sendSignatureRequest(allocation.id, selectedVendor)}
                        size="sm"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Documents
                      </Button>
                    )}

                    {allocation.status === 'signed' && (
                      <Button
                        onClick={() => convertToCapTable(allocation.id)}
                        size="sm"
                        variant="outline"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Add to Cap Table
                      </Button>
                    )}

                    {allocation.status === 'docs_sent' && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileSignature className="h-4 w-4 mr-2" />
                        Awaiting signature...
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
