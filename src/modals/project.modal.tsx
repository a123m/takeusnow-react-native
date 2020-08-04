export interface ProjectEntity {
  project_id: number;
  project_title: string;
  project_description: string;
  project_status: string;
  provider_id: number;
  created_on: string;
  updated_on: string;
  budget: string;
  location: string;
  req_skills: string[];
  req_on: string;
  user_id: number;
  accepted_proposal_id: number | null;
  state: string;
  city: string;
  category_id: number;
}
