import { where, Where } from "sql-js-builder";
import { InternalServerErrorException } from "../../exceptions/InternalServerErrorException";
import { UsersRepository } from "./repository";
import { ulid } from "ulid";
import { ConflictException } from "../../exceptions/ConflictException";

const create = async (data: {
  name: string;
  email: string;
  avatar_url?: string;
  username?: string | null;
}) => {
  const response = await UsersRepository.save({
    ...data,
    username:
      data.username ||
      `${data.name.toLocaleLowerCase().replace(" ", "_")}_${ulid()}`,
  });

  if (!response.ok) {
    throw new InternalServerErrorException("Failed to create user");
  }

  return response.data[0];
};

const list = async (whereFilter?: Where) => {
  const response = await UsersRepository.find(whereFilter);

  if (!response.ok) {
    throw new InternalServerErrorException("Failed to list users");
  }

  return response.data;
};

export const update = async (
  userId: string,
  data: { name?: string; username?: string }
) => {
  const user = await list(where().and("id", "eq", userId));

  if (!user.length) {
    throw new InternalServerErrorException("User not found");
  }

  if (data.username) {
    const usernameAlreadyExists = await list(
      where().and("username", "eq", data.username)
    );

    const isUpdateUsernameSameAsOld = user[0].username === data.username;

    if (usernameAlreadyExists.length && !isUpdateUsernameSameAsOld) {
      throw new ConflictException("Username already exists");
    }
  }

  const response = await UsersRepository.modify(
    where().and("id", "eq", userId),
    data
  );

  if (!response.ok) {
    throw new InternalServerErrorException("Failed to update user");
  }
};

export const UsersService = {
  create,
  list,
  update,
};
