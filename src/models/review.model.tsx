export interface ReviewEntity {
  review_id: number;
  user_id: number;
  reviewer_user_id: number;
  description: string;
  rating: number;
}
