import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("best-rated", "./routes/best-rated.tsx"),
  route("most-ascents", "./routes/most-ascents.tsx"),

  ...prefix("statistics", [
    route("grade", "./routes/statistics/grade.tsx"),
    route("time", "./routes/statistics/time.tsx"),
    route("area", "./routes/statistics/area.tsx"),
    route("style", "./routes/statistics/style.tsx"),
  ]),

  ...prefix("areas", [
    route("/", "./routes/areas/list.tsx"),
    route("/:areaId", "./routes/areas/detail.tsx"),
  ]),

  route("boulders/:boulderId", "./routes/boulder-detail.tsx"),
  route("search/:text", "./routes/search.tsx"),
] satisfies RouteConfig;
