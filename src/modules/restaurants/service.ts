import { Where } from "sql-js-builder";
import { RestaurantsRepository } from "./respository";
import { InternalServerErrorException } from "../../exceptions/InternalServerErrorException";

const list = async (whereFilter: Where) => {
  const response = await RestaurantsRepository.find(whereFilter);

  if (!response.ok) {
    throw new InternalServerErrorException("Failed to list users");
  }

  return response.data;
};

export const RestaurantsService = { list };
