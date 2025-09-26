import type { Route } from "./+types/most-ascents";
import { MainLayout } from "../ui/mainLayout";
import { GradeBlock } from "~/ui/gradeBlock";
import { useEffect, useState } from "react";
import { FetchData } from "~/data/data";
import config from "~/config";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function MostAscents() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function load() {
      const sorted_boulders = await FetchData(`${config.baseUrl}/stats/boulders/most-ascents/`);
      setData(sorted_boulders);
    }
    load();
  }, []);
  if (!data.length) return null;

  return (
    <MainLayout>
      <div className="p-4 rounded-md bg-slate-200">
        <p className="">
          This page gather the <strong>top 10 most repeated boulders per grade.</strong>
        </p>
        <p className="italic">The last column shows the number of public ascents logged</p>
      </div>
      {data.map((grade_block: Record<string, any>) => (
        <GradeBlock key={grade_block.grade.id} data={grade_block} />
      ))}
    </MainLayout>
  );
}
