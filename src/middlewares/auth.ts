import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/UnauthorizedException";
import jwt from "jsonwebtoken";
import { env } from "../utils/env";

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization)
    throw new UnauthorizedException("Authorization not provided");

  const token = authorization.split(" ")[1];

  if (!token) throw new UnauthorizedException("Token not found");

  try {
    jwt.verify(token, env.JWT_SECRET);
    const payload = jwt.decode(token) as { userId: string };
    req.userId = payload.userId;
    next();
  } catch (err) {
    throw new UnauthorizedException("Invalid token");
  }
};
