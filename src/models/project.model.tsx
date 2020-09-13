export interface ProjectEntity {
  state_name: String;
  project_id: number;
  project_title: string;
  project_description: string;
  project_status: string;
  owner_id: number;
  created_on: string;
  updated_on: string;
  req_skills: any;
  req_on: string;
  state: string;
  city: string;
  city_name: string;
  budget: number;
  ap_id: number; //accepted_proposal_id
}