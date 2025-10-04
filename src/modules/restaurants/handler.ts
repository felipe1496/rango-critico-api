import { Router } from "express";
import { where } from "sql-js-builder";
import { RestaurantsService } from "./service";
import { whereFilter } from "../../middlewares/where-filter";

export const restaurantsHandler = Router();

restaurantsHandler.get("/", whereFilter, async (req, res) => {
  const restaurants = await RestaurantsService.list(req.whereFilter);
  console.log(restaurants);

  return res.send({
    data: {
      restaurants: restaurants.slice(0, req.whereFilter.perPageValue - 1),
    },
    page: req.whereFilter.pageValue,
    per_page: req.whereFilter.perPageValue,
    next_page: restaurants.length > req.whereFilter.perPageValue - 1,
  });
});
