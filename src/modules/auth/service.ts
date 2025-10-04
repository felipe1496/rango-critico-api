import axios from "axios";
import { UsersService } from "../users/service";
import { where } from "sql-js-builder";
import { env } from "../../utils/env";
import jwt from "jsonwebtoken";

const googleLogin = async (accessToken: string) => {
  const googleRes = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  let user = await UsersService.list(
    where().and("email", "eq", googleRes.data.email)
  );

  if (user.length) {
    return user[0];
  } else {
    return UsersService.create({
      name: googleRes.data.name,
      email: googleRes.data.email,
      avatar_url: googleRes.data.picture,
    });
  }
};

const generateToken = (userId: string) => {
  env.JWT_SECRET;

  const token = jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "30d" });

  const decoded = jwt.verify(token, env.JWT_SECRET) as { exp?: number };

  const expiresAt = decoded?.exp ? new Date(decoded.exp * 1000) : null;

  return { token, expiresAt };
};

export const AuthService = {
  googleLogin,
  generateToken,
};
