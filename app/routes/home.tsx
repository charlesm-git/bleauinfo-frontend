import type { Route } from "./+types/home";
import { MainLayout } from "../ui/mainLayout";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <MainLayout />
    </>
  );
}
