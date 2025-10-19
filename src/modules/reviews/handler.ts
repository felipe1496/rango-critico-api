import z from "zod";
import { Router } from "express";
import { body } from "../../middlewares/body";
import { authGuard } from "../../middlewares/auth";
import { ReviewsService } from "./service";
import { reviewsPostBodySchema } from "./schemas";
import { where } from "sql-js-builder";
import { whereFilter } from "../../middlewares/where-filter";
import { UsersService } from "../users/service";
import { NotFoundException } from "../../exceptions/NotFoundException";
import l from "lodash";

export const reviewsHandler = Router();

reviewsHandler.post(
  "/",
  authGuard,
  body(reviewsPostBodySchema),
  async (req, res) => {
    const body = req.body as z.infer<typeof reviewsPostBodySchema>;

    const review = await ReviewsService.create({
      ...body.data.review,
      user_id: req.userId,
    });

    const createdReview = await ReviewsService.list(
      where().and("review_id", "eq", review.id)
    );

    return res.send({
      data: {
        review: {
          id: createdReview[0].id,
          rating: createdReview[0].rating,
          comment: createdReview[0].comment,
          visited_at: createdReview[0].visited_at,
          restaurant: createdReview[0].restaurant,
        },
      },
    });
  }
);

reviewsHandler.get("/:username", whereFilter, authGuard, async (req, res) => {
  const filter = req.whereFilter;
  const username = req.params.username;

  const user = await UsersService.list(where().and("username", "eq", username));

  if (!user.length) {
    throw new NotFoundException("User not found");
  }

  const reviews = await ReviewsService.list(
    filter.and("review_user_id", "eq", user[0].id)
  );

  return res.send({
    data: {
      reviews: reviews
        .slice(0, req.whereFilter.limitValue - 1)
        .map((review) => ({ ...review, rating: l.toNumber(review.rating) })),
    },
    query: {
      page: req.page,
      per_page: req.per_page,
      next_page: reviews.length > req.per_page,
    },
  });
});

reviewsHandler.get(
  "/:username/friends",
  authGuard,
  whereFilter,
  async (req, res) => {
    const filter = req.whereFilter.and("follower_id", "eq", req.userId);

    const reviews = await ReviewsService.friendsReviews(filter);

    return res.send({
      data: {
        reviews: reviews
          .slice(0, req.whereFilter.limitValue - 1)
          .map((review) => ({ ...review, rating: l.toNumber(review.rating) })),
      },
      query: {
        page: req.page,
        per_page: req.per_page,
        next_page: reviews.length > req.per_page,
      },
    });
  }
);
