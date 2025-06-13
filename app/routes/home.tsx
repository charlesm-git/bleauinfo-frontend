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
        <p className="mb-4">All statistics presented on this website are based 
          on <span className="underline">publicly available data</span> from Bleau.info </p>
        <p className="mb-4">
          Please note that <strong>this data is highly subjective.</strong> The recorded number of ascents can differ significantly 
          from reality, as it only includes ascents logged by users who have a Bleau.info account and have logged their ascents publicly.
          That means the numbers provided are, at best, useful for comparing climbs — and, at worst, completely misleading.</p>
        <p>We encourage users to <strong>approach the information critically</strong> and avoid drawing conclusions too fast.</p>
      </div>
    </MainLayout>
  );
}
