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
    <MainLayout>
      <div className="p-4 rounded-md bg-red-400">
        <h2 className="font-bold mb-4">Disclaimer</h2>
        <p className="mb-4">All the statistics provided on this website are extracted 
          from <span className="underline">public data</span> available on Bleau.info </p>
        <p className="mb-4">
          This data is EXTREMELY subjective. Mostly, the number of ascents provided here are nowhere nears the reality.
          These are counted based on the people that have a bleau.info account and that logged their ascent publically.
          That means the numbers are, at best, useful for comparing climbs — and, at worst, completely misleading.</p>
        <p>Please, keep a critical eye when browsing the website and don't draw conclusions too fast.</p>
      </div>
    </MainLayout>
  );
}
