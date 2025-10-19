import { insert, select } from "../../utils/functions";

const save = insert<
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

const find = select<{
  id: string;
  user_id: string;
  restaurant_id: string;
  rating: number;
  comment?: string | null;
  visited_at: string;
  created_at: string;
}>("reviews");

const findDetail = select<{
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
}>("v_reviews_detail");

const friendsReviews = select<{
  followed_username: string;
  followed_avatar_url?: string | null;
  followed_name: string;
  follower_id: string;
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
}>("v_friends_reviews");

export const ReviewsRepository = {
  save,
  find,
  findDetail,
  friendsReviews,
};
