import { Router } from "express";
import { where } from "sql-js-builder";
import { RestaurantsService } from "./service";
import { whereFilter } from "../../middlewares/where-filter";

export const restaurantsHandler = Router();

restaurantsHandler.get("/", whereFilter, async (req, res) => {
  const restaurants = await RestaurantsService.list(req.whereFilter);

  return res.send({
    data: {
      restaurants: restaurants.slice(0, req.whereFilter.limitValue - 1),
    },
    query: {
      page: req.page,
      per_page: req.per_page,
      next_page: restaurants.length > req.per_page,
    },
  });
});
