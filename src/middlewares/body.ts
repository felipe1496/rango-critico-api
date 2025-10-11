import { NextFunction, Request, Response } from "express";
import z from "zod";
import { BadRequestException } from "../exceptions/BadRequestException";

export const body = (schema: z.ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const response = schema.safeParse(req.body);

    if (!response.success) {
      throw new BadRequestException(
        `${response.error.issues[0].path.join(".")}: ${
          response.error.issues[0].message
        }`
      );
    }

    next();
  };
};
