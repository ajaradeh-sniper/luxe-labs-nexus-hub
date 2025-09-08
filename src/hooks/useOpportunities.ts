import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface OpportunityData {
  id: string;
  title: string;
  description: string | null;
  location: string;
  opportunity_type: string;
  investment_required: number | null;
  expected_roi: number | null;
  deadline: string | null;
  status: string;
  risk_rating: string | null;
  contact_info: any;
  documents: any;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export const useOpportunities = () => {
  const [opportunities, setOpportunities] = useState<OpportunityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // Mock data fallback when database is not available
  const mockOpportunities: OpportunityData[] = [
    {
      id: '1',
      title: 'Luxury Penthouse - DIFC',
      description: 'Premium penthouse with panoramic city views and world-class amenities',
      location: 'DIFC, Dubai',
      opportunity_type: 'real_estate',
      investment_required: 8500000,
      expected_roi: 35.3,
      deadline: '2024-03-01',
      status: 'under_review',
      risk_rating: 'medium',
      contact_info: { email: 'agent@luxurylabs.com', phone: '+971-4-123-4567' },
      documents: ['property_valuation.pdf', 'financial_analysis.xlsx'],
      created_by: 'agent-1',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-20T15:30:00Z'
    },
    {
      id: '2',
      title: 'Luxury Villa - Emirates Hills',
      description: 'Exclusive villa in Dubai\'s most prestigious residential community',
      location: 'Emirates Hills, Dubai',
      opportunity_type: 'real_estate',
      investment_required: 15000000,
      expected_roi: 27.5,
      deadline: '2024-04-15',
      status: 'approved',
      risk_rating: 'low',
      contact_info: { email: 'agent2@luxurylabs.com', phone: '+971-4-987-6543' },
      documents: ['villa_blueprint.pdf', 'market_analysis.xlsx'],
      created_by: 'agent-2',
      created_at: '2024-01-18T14:30:00Z',
      updated_at: '2024-01-22T09:15:00Z'
    }
  ];

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to fetch from Supabase first
      const { data, error: supabaseError } = await supabase
        .from('opportunities')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) {
        console.error('Error fetching opportunities from Supabase:', supabaseError);
        
        // Fallback to mock data
        console.log('Using mock data for opportunities');
        setOpportunities(mockOpportunities);
        
        toast({
          title: "Using Demo Data",
          description: "Connected to demonstration data while database is unavailable",
          variant: "default"
        });
      } else {
        // Transform the data to match our interface
        const transformedData = (data || []).map((item: any) => ({
          ...item,
          documents: Array.isArray(item.documents) ? item.documents : [],
          contact_info: item.contact_info || {}
        }));
        setOpportunities(transformedData);
      }
    } catch (error) {
      console.error('Error in fetchOpportunities:', error);
      setError('Failed to load opportunities');
      
      // Fallback to mock data
      setOpportunities(mockOpportunities);
      
      toast({
        title: "Using Demo Data", 
        description: "Connected to demonstration data",
        variant: "default"
      });
    } finally {
      setLoading(false);
    }
  };

  const createOpportunity = async (opportunityData: Partial<OpportunityData>) => {
    try {
      if (!user) {
        throw new Error('User must be authenticated');
      }

      const newOpportunity = {
        title: opportunityData.title || '',
        description: opportunityData.description || '',
        location: opportunityData.location || '',
        opportunity_type: opportunityData.opportunity_type || 'real_estate',
        investment_required: opportunityData.investment_required || 0,
        expected_roi: opportunityData.expected_roi || 0,
        deadline: opportunityData.deadline || '',
        status: 'evaluation',
        risk_rating: opportunityData.risk_rating || 'medium',
        contact_info: opportunityData.contact_info || {},
        documents: opportunityData.documents || [],
        created_by: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Try Supabase first
      const { data, error: supabaseError } = await supabase
        .from('opportunities')
        .insert([newOpportunity])
        .select()
        .single();

      if (supabaseError) {
        console.error('Error creating opportunity in Supabase:', supabaseError);
        
        // Fallback: Add to mock data locally
        const mockOpportunity: OpportunityData = {
          id: Math.random().toString(36).substr(2, 9),
          title: opportunityData.title || '',
          description: opportunityData.description || '',
          location: opportunityData.location || '',
          opportunity_type: opportunityData.opportunity_type || 'real_estate',
          investment_required: opportunityData.investment_required || 0,
          expected_roi: opportunityData.expected_roi || 0,
          deadline: opportunityData.deadline || '',
          status: 'evaluation',
          risk_rating: opportunityData.risk_rating || 'medium',
          contact_info: opportunityData.contact_info || {},
          documents: opportunityData.documents || [],
          created_by: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        setOpportunities(prev => [mockOpportunity, ...prev]);
        
        toast({
          title: "Opportunity Created",
          description: "Added to demonstration data",
        });
        
        return mockOpportunity;
      } else {
        setOpportunities(prev => [data, ...prev]);
        
        toast({
          title: "Opportunity Created",
          description: "Successfully added to database",
        });
        
        return data;
      }
    } catch (error) {
      console.error('Error creating opportunity:', error);
      setError('Failed to create opportunity');
      
      toast({
        title: "Error",
        description: "Failed to create opportunity",
        variant: "destructive"
      });
      
      throw error;
    }
  };

  const updateOpportunity = async (id: string, updates: Partial<OpportunityData>) => {
    try {
      const updatedData = {
        ...updates,
        updated_at: new Date().toISOString()
      };

      // Try Supabase first
      const { data, error: supabaseError } = await supabase
        .from('opportunities')
        .update(updatedData)
        .eq('id', id)
        .select()
        .single();

      if (supabaseError) {
        console.error('Error updating opportunity in Supabase:', supabaseError);
        
        // Fallback: Update mock data locally
        setOpportunities(prev => 
          prev.map(opp => 
            opp.id === id ? { ...opp, ...updatedData } : opp
          )
        );
        
        toast({
          title: "Opportunity Updated",
          description: "Updated in demonstration data",
        });
      } else {
        setOpportunities(prev => 
          prev.map(opp => opp.id === id ? { ...data, documents: Array.isArray(data.documents) ? data.documents : [], contact_info: data.contact_info || {} } : opp)
        );
        
        toast({
          title: "Opportunity Updated",
          description: "Successfully updated in database",
        });
      }
    } catch (error) {
      console.error('Error updating opportunity:', error);
      setError('Failed to update opportunity');
      
      toast({
        title: "Error",
        description: "Failed to update opportunity",
        variant: "destructive"
      });
      
      throw error;
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  return {
    opportunities,
    loading,
    error,
    fetchOpportunities,
    createOpportunity,
    updateOpportunity,
    promote: updateOpportunity // Add promote as alias to updateOpportunity
  };
};