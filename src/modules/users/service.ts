import { Where } from "sql-js-builder";
import { InternalServerErrorException } from "../../exceptions/InternalServerErrorException";
import { UsersRepository } from "./repository";

const create = async (data: {
  name: string;
  email: string;
  avatar_url?: string;
}) => {
  const response = await UsersRepository.save(data);

  if (!response.ok) {
    throw new InternalServerErrorException("Failed to create user");
  }

  return response.data[0];
};

const list = async (whereFilter: Where) => {
  const response = await UsersRepository.find(whereFilter);

  if (!response.ok) {
    throw new InternalServerErrorException("Failed to list users");
  }

  return response.data;
};

export const UsersService = {
  create,
  list,
};
