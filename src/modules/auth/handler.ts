import { Router } from "express";
import { AuthService } from "./service";
import { body } from "../../middlewares/body";
import z from "zod";
import { authLoginGoogleBodySchema } from "./schemas";

export const authHandler = Router();

authHandler.post(
  "/login/google",
  body(authLoginGoogleBodySchema),
  async (req, res) => {
    const body = req.body as z.infer<typeof authLoginGoogleBodySchema>;
    const user = await AuthService.googleLogin(body.data.access_token);
    const session = AuthService.generateToken(user.id);

    return res.send({
      data: {
        user,
        session: {
          token: session.token,
          expires_at: session.expiresAt,
        },
      },
    });
  }
);
