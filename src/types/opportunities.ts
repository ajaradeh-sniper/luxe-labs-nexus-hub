export interface Opportunity {
  id: string;
  title: string;
  description: string;
  property_address: string;
  property_type: 'apartment' | 'villa' | 'townhouse' | 'commercial' | 'land';
  current_value: number;
  estimated_renovation_cost: number;
  estimated_after_value: number;
  potential_roi: number;
  sourced_by: string; // agent user_id
  sourced_date: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'converted_to_project';
  location: {
    area: string;
    city: string;
    coordinates?: { lat: number; lng: number };
  };
  property_details: {
    bedrooms?: number;
    bathrooms?: number;
    area_sqft: number;
    parking?: number;
    amenities?: string[];
  };
  financial_details: {
    asking_price: number;
    estimated_purchase_price: number;
    holding_costs: number;
    selling_costs: number;
    financing_required: boolean;
  };
  timeline: {
    estimated_purchase_date: string;
    estimated_renovation_duration: number; // months
    estimated_sale_date: string;
  };
  documents: string[]; // file URLs
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface OpportunityEvaluation {
  id: string;
  opportunity_id: string;
  evaluated_by: string; // user_id
  evaluation_date: string;
  score: number; // 1-10
  comments: string;
  recommendation: 'approve' | 'reject' | 'needs_revision';
  financial_adjustments?: {
    revised_purchase_price?: number;
    revised_renovation_cost?: number;
    revised_after_value?: number;
  };
}