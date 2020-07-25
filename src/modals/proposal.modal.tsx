export interface ProposalEntity {
  id: number;
  proposal_text: string;
  user_id: number;
  project_id: number;
  created_at: string;
  proposed_amount: number;
  status: boolean;
}
