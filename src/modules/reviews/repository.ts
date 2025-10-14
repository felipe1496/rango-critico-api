import { insert, select } from "../../utils/functions";

export const save = insert<
  {
    id: string;
    user_id: string;
    restaurant_id: string;
    rating: number;
    comment?: string | null;
    visited_at: string;
  },
  {
    id: string;
    user_id: string;
    restaurant_id: string;
    rating: number;
    comment?: string | null;
    visited_at: string;
  }
>("reviews");

export const find = select<{
  id: string;
  user_id: string;
  restaurant_id: string;
  rating: number;
  comment?: string | null;
  visited_at: string;
  created_at: string;
}>("reviews");

export const findDetail = select<{
  review_id: string;
  review_user_id: string;
  review_restaurant_id: string;
  review_comment?: string | null;
  review_rating: string;
  review_visited_at: string;
  review_created_at: string;
  restaurant_id: string;
  restaurant_name: string;
  restaurant_description?: string | null;
  restaurant_avatar_url?: string | null;
  restaurant_created_at: string;
}>("reviews_detail");

export const ReviewsRepository = {
  save,
  find,
  findDetail,
};
