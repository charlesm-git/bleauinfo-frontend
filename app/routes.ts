import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"), 
    route("best-rated", "./routes/best-rated.tsx"),
    route("most-ascents", "./routes/most-ascents.tsx"),
    route("statistics", "./routes/statistics.tsx"),
    route("areas", "./routes/areas-list.tsx"),
    route("areas/:areaId", "./routes/areas-detail.tsx"),
    route("boulders/:boulderId", "./routes/boulder-detail.tsx"),
    route("search/:text", "./routes/search.tsx"),
] satisfies RouteConfig;
