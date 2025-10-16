import { Router } from "express";
import { authGuard } from "../../middlewares/auth";
import { FollowsService } from "./service";

export const followsHandler = Router();

followsHandler.post("/:username", authGuard, async (req, res) => {
  const followedUsername = req.params.username;

  await FollowsService.follow({
    follower_id: req.userId,
    followed_username: followedUsername,
  });

  return res.status(204).send();
});

followsHandler.delete("/:username", authGuard, async (req, res) => {
  const followedUsername = req.params.username;

  await FollowsService.unfollow({
    follower_id: req.userId,
    followed_username: followedUsername,
  });

  return res.status(204).send();
});
