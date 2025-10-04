import { NextFunction, Request, Response } from "express";
import z from "zod";
import { BadRequestException } from "../exceptions/BadRequestException";

export const body = (req: Request, res: Response, next: NextFunction) => {
  return (schema: z.ZodObject) => {
    const response = schema.safeParse(req.body);

    if (!response.success) {
      throw new BadRequestException(
        "Invalid request body: " + JSON.stringify(response.error)
      );
    }

    next();
  };
};
