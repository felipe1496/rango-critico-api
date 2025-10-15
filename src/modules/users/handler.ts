import { Router } from "express";
import { authGuard } from "../../middlewares/auth";
import { body } from "../../middlewares/body";
import z from "zod";
import { usersPatchBodySchema } from "./schemas";
import { UsersService } from "./service";
import { where } from "sql-js-builder";

export const usersHandler = Router();

usersHandler.patch(
  "/",
  authGuard,
  body(usersPatchBodySchema),
  async (req, res) => {
    await new Promise((resolve) => setTimeout(resolve, 10 * 1000));
    const body = req.body as z.infer<typeof usersPatchBodySchema>;

    await UsersService.update(req.userId, body.data.user);

    const user = await UsersService.list(where().and("id", "eq", req.userId));

    return res.send({
      data: {
        user: user[0],
      },
    });
  }
);
