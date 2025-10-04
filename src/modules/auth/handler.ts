import { Router } from "express";
import { AuthService } from "./service";
import { BadRequestException } from "../../exceptions/BadRequestException";

export const authHandler = Router();

authHandler.post("/login/google", async (req, res) => {
  const user = await AuthService.googleLogin(req.body.data.access_token);
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
});
