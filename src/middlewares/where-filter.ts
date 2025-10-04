import { NextFunction, Request, Response } from "express";
import z from "zod";
import { BadRequestException } from "../exceptions/BadRequestException";
import { Where, where } from "sql-js-builder";

export const whereFilter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const whereFilter = req.query.filter;
  let reqWhere: Where;
  const page = req.query.page;
  const perPage = req.query.per_page;

  if (!whereFilter) {
    reqWhere = where();
  } else {
    reqWhere = where(whereFilter as string);
  }

  if (page) {
    reqWhere = reqWhere.page(Number(page));
  }

  if (perPage) {
    reqWhere = reqWhere.perPage(Number(perPage) + 1);
  }

  req.whereFilter = reqWhere;

  return next();
};
