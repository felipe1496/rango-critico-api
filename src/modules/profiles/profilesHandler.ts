import { Router } from "express";
import { authGuard } from "../../middlewares/auth";
import { UsersService } from "../users/service";
import { where } from "sql-js-builder";
import { NotFoundException } from "../../exceptions/NotFoundException";
import { FollowsService } from "../follows/service";
import { ProfilesService } from "./service";

export const profilesHandler = Router();

profilesHandler.get("/:username", authGuard, async (req, res) => {
  const username = req.params.username;

  const user = await ProfilesService.list(
    where().and("username", "eq", username)
  );

  if (!user.length) {
    throw new NotFoundException("User not found");
  }

  const meIsFollowing = await FollowsService.isFollowing(
    req.userId,
    user[0].id
  );

  return res.send({
    data: {
      profile: {
        username: user[0].username,
        name: user[0].name,
        avatar_url: user[0].avatar_url,
        followers: user[0].followers,
        following: user[0].following,
      },
    },
    metadata: {
      following: meIsFollowing,
    },
  });
});
