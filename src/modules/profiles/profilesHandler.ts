import { Router } from "express";
import { authGuard } from "../../middlewares/auth";
import { UsersService } from "../users/service";
import { where } from "sql-js-builder";
import { NotFoundException } from "../../exceptions/NotFoundException";

export const profilesHandler = Router();

profilesHandler.get("/:username", authGuard, async (req, res) => {
  const username = req.params.username;

  const user = await UsersService.list(where().and("username", "eq", username));

  if (!user.length) {
    throw new NotFoundException("User not found");
  }

  return res.send({
    data: {
      profile: {
        username: user[0].username,
        name: user[0].name,
        avatar_url: user[0].avatar_url,
      },
    },
  });
});
