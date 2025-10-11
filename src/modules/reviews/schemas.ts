import dayjs from "dayjs";
import z from "zod";

export const reviewsPostBodySchema = z.object({
  data: z.object({
    review: z.object({
      restaurant_id: z.string(),
      rating: z.union([
        z.literal(0),
        z.literal(0.5),
        z.literal(1),
        z.literal(1.5),
        z.literal(2),
        z.literal(2.5),
        z.literal(3),
        z.literal(3.5),
        z.literal(4),
        z.literal(4.5),
        z.literal(5),
      ]),
      comment: z.string().max(5000).optional(),
      visited_at: z
        .string()
        .refine((data) => dayjs(data).isValid())
        .refine(
          (data) => dayjs(data).isBefore(dayjs()),
          "Date must be in the past"
        ),
    }),
  }),
});
