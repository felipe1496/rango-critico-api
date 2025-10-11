import z from "zod";

export const authLoginGoogleBodySchema = z.object({
  data: z.object({
    access_token: z.string(),
  }),
});
