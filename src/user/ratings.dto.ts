export interface RatingsDTO {
  id: number;
  review: string;
  user_id: number;
  rating: number;
  restaurant_id: number;
  created_at: Date;
}

export interface createRatingsDto {
  review: string;
  user_id: number;
  rating: number;
  restaurant_id: number;
}
