export interface UserEntity {
  id: number;
  fname: string;
  lname: string;
  email: string;
  password: string;
  user_image: string;
  about: string;
  state: string;
  city: string;
  DOB: string;
  gender: string;
  work_experience: string;
  able_to_travel: string;
  portfolio: Array<object>;
}
