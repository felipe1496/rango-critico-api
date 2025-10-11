import { PoolClient } from "pg";
import { query } from "../db";
import { where, Where } from "sql-js-builder";

export const insert = <TData = any, TVariables extends object = any>(
  table: string
) => {
  return (variables: TVariables, db?: PoolClient) => {
    return query<TData>(
      `INSERT INTO ${table} (${Object.keys(variables).join(
        ", "
      )}) VALUES (${Object.keys(variables)
        .map(() => "?")
        .join(", ")}) RETURNING *`,
      Object.values(variables),
      db
    );
  };
};

export const select = <TData = any>(table: string) => {
  return (_where?: Where, db?: PoolClient) => {
    const w = _where ? _where.build() : where().build();
    return query<TData>(`SELECT * FROM ${table} WHERE ${w.sql};`, w.values, db);
  };
};

export const replacePlaceholders = (query: string) => {
  let index = 0;
  let insideQuotes = false;

  return query.replace(/(\?|['"])/g, (match) => {
    if (match === `'` || match === `"`) {
      insideQuotes = !insideQuotes; // Alterna se está dentro de aspas
      return match; // Retorna o caractere de aspas sem modificação
    }

    if (!insideQuotes && match === `?`) {
      return `$${++index}`; // Substitui apenas os placeholders fora de aspas
    }

    return match; // Retorna o `?` como está, se estiver entre aspas
  });
};
