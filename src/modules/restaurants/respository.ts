import { where, Where } from "sql-js-builder";
import { query } from "../../db";

const find = (whereFilter?: Where) => {
  const { sql, values } = (whereFilter || where()).build();

  const response = query<{
    id: string;
    name: string;
    description?: string | null;
    avatar_url?: string | null;
    created_at: string;
  }>(`SELECT * FROM restaurants WHERE ${sql}`, values);

  return response;
};

export const RestaurantsRepository = {
  find,
};
