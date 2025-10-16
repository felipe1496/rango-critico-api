import { where } from "sql-js-builder";
import { UsersService } from "../users/service";
import { NotFoundException } from "../../exceptions/NotFoundException";
import { BadRequestException } from "../../exceptions/BadRequestException";
import { FollowsRepository } from "./repository";
import { InternalServerErrorException } from "../../exceptions/InternalServerErrorException";
import { ConflictException } from "../../exceptions/ConflictException";
import { ulid } from "ulid";
import l from "lodash";

const follow = async (data: {
  follower_id: string;
  followed_username: string;
}) => {
  const usersExists = await UsersService.list(
    where().or([
      ["id", "eq", data.follower_id],
      ["username", "eq", data.followed_username],
    ])
  );

  const follower = usersExists.find((user) => user.id === data.follower_id);
  const followed = usersExists.find(
    (user) => user.username === data.followed_username
  );

  if (!follower) {
    throw new NotFoundException("Follower user not found");
  }

  if (!followed) {
    throw new NotFoundException("Following user not found");
  }

  if (follower.id === followed.id) {
    throw new BadRequestException("Cannot follow same user");
  }

  const alreadyFollowing = await FollowsRepository.find(
    where()
      .and("follower_id", "eq", data.follower_id)
      .and("followed_id", "eq", followed.id)
  );

  if (!alreadyFollowing.ok) {
    throw new InternalServerErrorException(
      "Failed to check if already following"
    );
  }

  if (alreadyFollowing.data.length) {
    throw new ConflictException("Already following");
  }

  const response = await FollowsRepository.save({
    id: ulid(),
    follower_id: data.follower_id,
    followed_id: followed.id,
  });

  if (!response.ok) {
    throw new InternalServerErrorException("Failed to follow user");
  }
};

export const unfollow = async (data: {
  follower_id: string;
  followed_username: string;
}) => {
  const usersExists = await UsersService.list(
    where().or([
      ["id", "eq", data.follower_id],
      ["username", "eq", data.followed_username],
    ])
  );

  const follower = usersExists.find((user) => user.id === data.follower_id);
  const followed = usersExists.find(
    (user) => user.username === data.followed_username
  );

  if (!follower) {
    throw new NotFoundException("Follower user not found");
  }

  if (!followed) {
    throw new NotFoundException("Following user not found");
  }

  if (follower.id === followed.id) {
    throw new BadRequestException("Cannot unfollow same user");
  }

  const followExists = await FollowsRepository.find(
    where()
      .and("follower_id", "eq", data.follower_id)
      .and("followed_id", "eq", followed.id)
  );

  if (!followExists.ok) {
    throw new InternalServerErrorException("Failed to check if is following");
  }

  if (!followExists.data.length) {
    throw new ConflictException("Follower is not following");
  }

  const response = await FollowsRepository.remove(
    where()
      .and("follower_id", "eq", data.follower_id)
      .and("followed_id", "eq", followed.id)
  );

  if (!response.ok) {
    throw new InternalServerErrorException("Failed to follow user");
  }
};

const isFollowing = async (follower_id: string, followed_id: string) => {
  const response = await FollowsRepository.find(
    where()
      .and("follower_id", "eq", follower_id)
      .and("followed_id", "eq", followed_id)
  );

  if (!response.ok) {
    throw new InternalServerErrorException("Failed to check if is following");
  }

  return !!response.data.length;
};

export const FollowsService = Object.freeze({
  follow,
  unfollow,
  isFollowing,
});
