import { ulid } from "ulid";
import { query } from "../../db";
import { where, type Where } from "sql-js-builder";

const save = async (data: {
  name: string;
  email: string;
  avatar_url?: string;
  username: string;
}) => {
  const response = await query<{
    id: string;
    name: string;
    email: string;
    avatar_url?: string | null;
    created_at: string;
    username: string;
  }>(
    "INSERT INTO users (id, name, email, avatar_url, username) VALUES (?, ?, ?, ?, ?) RETURNING *",
    [ulid(), data.name, data.email, data.avatar_url || null, data.username]
  );

  return response;
};

const find = (whereFilter?: Where) => {
  const { sql, values } = (whereFilter || where()).build();

  const response = query<{
    id: string;
    name: string;
    email: string;
    avatar_url?: string | null;
    username: string;
    created_at: string;
  }>(`SELECT * FROM users WHERE ${sql}`, values);

  return response;
};

export const UsersRepository = {
  save,
  find,
};
