import express, { NextFunction, Request, Response } from "express";
import { env } from "./utils/env";
import { authHandler } from "./modules/auth/handler";
import cors from "cors";
import { AppException } from "./exceptions/AppException";
import { restaurantsHandler } from "./modules/restaurants/handler";
import { reviewsHandler } from "./modules/reviews/handler";
import { NotFoundException } from "./exceptions/NotFoundException";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(`${env.API_PREFIX}/v1/auth`, authHandler);
app.use(`${env.API_PREFIX}/v1/restaurants`, restaurantsHandler);
app.use(`${env.API_PREFIX}/v1/reviews`, reviewsHandler);

app.use(() => {
  throw new NotFoundException("Route not found");
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppException) {
    console.error(err.message, err);

    return res.status(err.status).json(err.toJSON());
  } else {
    console.error("Unknown error", err);
    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      message: "An uncaught error occurred",
    });
  }
});

app.listen(env.API_PORT, () => {
  console.log(`App listening on port ${env.API_PORT}`);
});
