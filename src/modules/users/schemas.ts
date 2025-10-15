import z from "zod";

export const usersPatchBodySchema = z.object({
  data: z.object({
    user: z
      .object({
        name: z.string().min(3).max(200).optional(),
        username: z.string().min(3).max(200).optional(),
      })
      .strict(),
  }),
});
