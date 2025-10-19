import { Where, where } from "sql-js-builder";
import { InternalServerErrorException } from "../../exceptions/InternalServerErrorException";
import { RestaurantsService } from "../restaurants/service";
import { ReviewsRepository } from "./repository";
import { NotFoundException } from "../../exceptions/NotFoundException";
import { ulid } from "ulid";

const create = async (data: {
  restaurant_id: string;
  user_id: string;
  rating: number;
  comment?: string | null;
  visited_at: string;
}) => {
  const restaurantExists = await RestaurantsService.list(
    where().and("id", "eq", data.restaurant_id)
  );

  if (!restaurantExists.length) {
    throw new NotFoundException("Restaurant not found");
  }

  const response = await ReviewsRepository.save({ id: ulid(), ...data });

  if (!response.ok) {
    throw new InternalServerErrorException("Failed to create review");
  }

  return response.data[0];
};

export const list = async (whereFilter?: Where) => {
  const reviewsResponse = await ReviewsRepository.findDetail(whereFilter);

  if (!reviewsResponse.ok) {
    throw new InternalServerErrorException("Failed to list reviews");
  }

  return reviewsResponse.data.map((review) => ({
    id: review.review_id,
    user_id: review.review_user_id,
    restaurant_id: review.review_restaurant_id,
    rating: review.review_rating,
    comment: review.review_comment,
    visited_at: review.review_visited_at,
    created_at: review.review_created_at,
    restaurant: {
      id: review.restaurant_id,
      name: review.restaurant_name,
      description: review.restaurant_description,
      avatar_url: review.restaurant_avatar_url,
      created_at: review.restaurant_created_at,
    },
  }));
};

export const friendsReviews = async (whereFilter?: Where) => {
  const reviewsResponse = await ReviewsRepository.friendsReviews(whereFilter);

  if (!reviewsResponse.ok) {
    throw new InternalServerErrorException("Failed to list reviews");
  }

  return reviewsResponse.data.map((review) => ({
    id: review.review_id,
    user_id: review.review_user_id,
    restaurant_id: review.review_restaurant_id,
    rating: review.review_rating,
    comment: review.review_comment,
    visited_at: review.review_visited_at,
    created_at: review.review_created_at,
    restaurant: {
      id: review.restaurant_id,
      name: review.restaurant_name,
      description: review.restaurant_description,
      avatar_url: review.restaurant_avatar_url,
      created_at: review.restaurant_created_at,
    },
    followed: {
      name: review.followed_name,
      username: review.followed_username,
      avatar_url: review.followed_avatar_url,
    },
  }));
};

export const ReviewsService = {
  create,
  list,
  friendsReviews,
};
