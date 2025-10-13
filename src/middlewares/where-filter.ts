import { NextFunction, Request, Response } from "express";
import { Where, where } from "sql-js-builder";

export const whereFilter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const whereFilter = req.query.filter;
  let reqWhere: Where;
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.per_page) || 200;

  if (!whereFilter) {
    reqWhere = where();
  } else {
    reqWhere = where(whereFilter as string);
  }

  if (req.query.sort) {
    const order = req.query.order === "desc" ? "desc" : "asc";
    reqWhere.orderBy(req.query.sort as string, order);
  }

  reqWhere = reqWhere.offset((page - 1) * perPage);
  reqWhere = reqWhere.limit(perPage + 1);

  req.page = page;
  req.per_page = perPage;

  req.whereFilter = reqWhere;

  return next();
};
