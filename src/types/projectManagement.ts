export interface ProjectTimeline {
  id: string;
  project_id: string;
  phase: string;
  tasks: Task[];
  milestones: Milestone[];
  dependencies: Dependency[];
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  duration: number; // days
  status: 'not_started' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assigned_to: string[];
  progress: number; // 0-100
  estimated_hours: number;
  actual_hours?: number;
  cost_estimate: number;
  actual_cost?: number;
  dependencies: string[]; // task IDs
  notes: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  due_date: string;
  completed_date?: string;
  status: 'pending' | 'completed' | 'overdue';
  critical: boolean;
  deliverables: string[];
}

export interface Dependency {
  id: string;
  predecessor_task_id: string;
  successor_task_id: string;
  type: 'finish_to_start' | 'start_to_start' | 'finish_to_finish' | 'start_to_finish';
  lag_days: number;
}

export interface ProjectPlan {
  id: string;
  project_id: string;
  title: string;
  description: string;
  scope: string;
  objectives: string[];
  success_criteria: string[];
  phases: ProjectPhase[];
  resources: Resource[];
  constraints: string[];
  assumptions: string[];
  created_at: string;
  updated_at: string;
}

export interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: 'planning' | 'active' | 'completed' | 'on_hold';
  deliverables: string[];
  gate_criteria: string[];
}

export interface Resource {
  id: string;
  name: string;
  type: 'human' | 'equipment' | 'material' | 'financial';
  availability: number; // percentage
  cost_per_unit: number;
  unit: string;
  allocated_quantity: number;
  utilized_quantity?: number;
}

export interface ProjectCosts {
  id: string;
  project_id: string;
  total_budget: number;
  spent_to_date: number;
  committed_costs: number;
  remaining_budget: number;
  cost_categories: CostCategory[];
  cost_variance: number;
  cost_performance_index: number;
  estimate_at_completion: number;
  created_at: string;
  updated_at: string;
}

export interface CostCategory {
  id: string;
  category: string;
  budgeted_amount: number;
  actual_amount: number;
  committed_amount: number;
  variance: number;
  line_items: CostLineItem[];
}

export interface CostLineItem {
  id: string;
  description: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
  vendor?: string;
  invoice_number?: string;
  date_incurred: string;
  approval_status: 'pending' | 'approved' | 'rejected';
}

export interface ProjectRisk {
  id: string;
  project_id: string;
  title: string;
  description: string;
  category: 'technical' | 'financial' | 'schedule' | 'resource' | 'external' | 'quality';
  probability: 'very_low' | 'low' | 'medium' | 'high' | 'very_high';
  impact: 'very_low' | 'low' | 'medium' | 'high' | 'very_high';
  risk_score: number;
  status: 'identified' | 'assessed' | 'mitigated' | 'closed' | 'occurred';
  owner: string;
  mitigation_strategy: string;
  contingency_plan: string;
  mitigation_actions: MitigationAction[];
  review_date: string;
  created_at: string;
  updated_at: string;
}

export interface MitigationAction {
  id: string;
  action: string;
  responsible_party: string;
  due_date: string;
  status: 'not_started' | 'in_progress' | 'completed';
  effectiveness: 'low' | 'medium' | 'high';
}

export interface ProjectTender {
  id: string;
  project_id: string;
  title: string;
  description: string;
  category: 'construction' | 'design' | 'consulting' | 'supplies' | 'services';
  tender_type: 'open' | 'selective' | 'negotiated' | 'framework';
  status: 'draft' | 'published' | 'submitted' | 'under_evaluation' | 'awarded' | 'cancelled';
  issue_date: string;
  submission_deadline: string;
  estimated_value: number;
  evaluation_criteria: EvaluationCriteria[];
  submissions: TenderSubmission[];
  awarded_to?: string;
  contract_value?: number;
  created_at: string;
  updated_at: string;
}

export interface EvaluationCriteria {
  id: string;
  criterion: string;
  weight: number; // percentage
  scoring_method: 'numerical' | 'pass_fail' | 'ranking';
}

export interface TenderSubmission {
  id: string;
  vendor_name: string;
  vendor_id: string;
  submission_date: string;
  bid_amount: number;
  technical_score?: number;
  commercial_score?: number;
  total_score?: number;
  status: 'submitted' | 'under_review' | 'shortlisted' | 'rejected' | 'awarded';
  documents: string[];
  evaluation_notes: string;
}