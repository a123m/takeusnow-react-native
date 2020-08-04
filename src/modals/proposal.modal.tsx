export interface ProposalEntity {
  proposal_id: number;
  user_id: number;
  project_id: number;
  description: string;
  created_on: string;
  proposed_amount: number;
  status: boolean;
}
