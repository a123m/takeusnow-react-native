export interface ProjectEntity {
  id: number;
  title: string;
  status: string;
  posted_on: string;
  about?: string;
  budget?: number;
  location?: string;
  req_skills?: string[];
  req_on?: string;
  user_id?: number;
  accepted_proposal_id?: number | null;
}
