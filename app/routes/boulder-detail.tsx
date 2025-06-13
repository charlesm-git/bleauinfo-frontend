import type { Route } from "./+types/areas-detail";
import { MainLayout } from "../ui/mainLayout";
import { FetchData } from "~/ui/data";
import { CustomLineChart } from "~/ui/chart";
import { Box } from "~/ui/box";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  let data = await FetchData(`http://127.0.0.1:8000/boulders/${params.boulderId}`);
  return data;
}

export default function BouldersDetail({ loaderData }: Route.ComponentProps) {
  const boulder = loaderData
  console.log(boulder)
  return (
    <MainLayout>
      <div className="flex flex-row items-end gap-4">
        <h1 className="text-2xl font-bold">{boulder.name}</h1>
        <a href={`/areas/${boulder.area.id}`} className="text-lg text-slate-700">{boulder.area.name}</a>
        <a href={boulder.url} className="text-sky-600 hover:underline active:text-sky-800 ml-8">Check on Bleau.Info</a>
      </div>
      <div className="grid grid-cols-3 gap-15 max-w-4xl mx-auto my-8">
        {
          !boulder.slash_grade ?
            <Box title="Grade" content={`${boulder.grade.value}`} /> :
            <Box title="Grade" content={`${boulder.grade.value} / ${boulder.slash_grade.value}`} />
        }
        <Box title="Ascents" content={boulder.repetitions.length} />
        <Box title="Rating" content={boulder.rating} />
      </div>
      <h2 className="text-xl font-semibold mb-4">Pourcentage of ascents per month</h2>
      <CustomLineChart data={boulder.aggregated_ascents} dataKeyX="month" tickAngle={-45}
        dataKeyY="percentage" margin={{ left: 30, right: 30, top: 10, bottom: 50 }} />
    </MainLayout >
  )
}