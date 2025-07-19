export interface ProjectAgreement {
  id: string;
  project_id: string;
  opportunity_id?: string;
  agreement_type: 'agent_commission' | 'partner_contract' | 'vendor_agreement';
  parties: {
    luxury_labs: boolean;
    counterparty: {
      user_id: string;
      name: string;
      email: string;
      role: string;
    };
  };
  terms: {
    role_description: string;
    responsibilities: string[];
    deliverables: string[];
    deadlines: {
      description: string;
      due_date: string;
      penalty?: number;
    }[];
    payment_structure: {
      type: 'commission' | 'fixed' | 'milestone' | 'hourly';
      amount: number;
      currency: string;
      payment_schedule: string;
      commission_rates?: {
        purchase_commission: number; // percentage
        sale_commission?: number; // percentage
        rental_commission?: number; // percentage
      };
    };
    performance_metrics: {
      metric: string;
      target: string;
      measurement_method: string;
    }[];
  };
  legal_terms: {
    jurisdiction: string;
    dispute_resolution: string;
    termination_clause: string;
    confidentiality: boolean;
  };
  status: 'draft' | 'pending_signature' | 'signed' | 'active' | 'completed' | 'terminated';
  signatures: {
    luxury_labs_signed: boolean;
    luxury_labs_signed_date?: string;
    luxury_labs_signer?: string;
    counterparty_signed: boolean;
    counterparty_signed_date?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ProjectRole {
  id: string;
  project_id: string;
  user_id: string;
  agreement_id?: string;
  role: string;
  permissions: {
    view_project: boolean;
    edit_project: boolean;
    view_financials: boolean;
    edit_financials: boolean;
    view_documents: boolean;
    upload_documents: boolean;
    view_team: boolean;
    manage_team: boolean;
    approve_changes: boolean;
  };
  access_level: 'full' | 'limited' | 'view_only';
  start_date: string;
  end_date?: string;
  status: 'active' | 'suspended' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface Commission {
  id: string;
  project_id: string;
  agreement_id: string;
  user_id: string; // who earns the commission
  commission_type: 'purchase' | 'sale' | 'rental' | 'milestone';
  calculation_base: {
    base_amount: number;
    commission_rate: number;
    calculated_amount: number;
  };
  status: 'pending' | 'calculated' | 'approved' | 'paid' | 'disputed';
  transaction_details?: {
    property_sale_price?: number;
    rental_income?: number;
    milestone_completed?: string;
  };
  payment_details?: {
    payment_date?: string;
    payment_method?: string;
    reference?: string;
  };
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  opportunity_id?: string;
  property_address: string;
  project_type: 'flip' | 'rental' | 'development' | 'renovation';
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
  financial_summary: {
    total_budget: number;
    spent_to_date: number;
    projected_revenue: number;
    actual_revenue?: number;
    roi_target: number;
    roi_actual?: number;
  };
  timeline: {
    start_date: string;
    estimated_completion: string;
    actual_completion?: string;
    milestones: {
      name: string;
      due_date: string;
      completed_date?: string;
      status: 'pending' | 'in_progress' | 'completed' | 'overdue';
    }[];
  };
  team: ProjectRole[];
  agreements: ProjectAgreement[];
  commissions: Commission[];
  created_at: string;
  updated_at: string;
}