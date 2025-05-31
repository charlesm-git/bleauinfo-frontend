import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"), 
    route("best-rated", "./routes/best-rated.tsx"),
    route("most-repeats", "./routes/most-repeats.tsx"),
    route("statistics", "./routes/statistics.tsx"),
] satisfies RouteConfig;
