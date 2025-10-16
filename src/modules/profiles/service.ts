import { where, Where } from "sql-js-builder";
import { ProfilesRepository } from "./repository";
import { InternalServerErrorException } from "../../exceptions/InternalServerErrorException";

const list = async (whereFilter?: Where) => {
  const response = await ProfilesRepository.find(whereFilter);

  if (!response.ok) {
    throw new InternalServerErrorException("Failed to list profiles");
  }

  return response.data;
};
export const ProfilesService = { list };
