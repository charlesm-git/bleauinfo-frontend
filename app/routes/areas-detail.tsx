import type { Route } from "./+types/areas-detail";
import { MainLayout } from "../ui/mainLayout";
import { Box } from "~/ui/box";
import { FetchData } from "~/ui/data";
import { CustomLineChart } from "~/ui/chart";
import { BoulderGradeItem } from "~/ui/list-boulder-item";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  let data = await FetchData(`http://127.0.0.1:8000/areas/${params.areaId}/stats`);
  return data;
}

export default function AreasDetail({ loaderData }: Route.ComponentProps) {
  const data = loaderData
  return (
    <MainLayout>
      <div className="flex flex-row gap-4 items-end mb-4">
        <h1 className="text-xl font-bold">{data.area.name} {data.area.status && <span className="font-bold">({data.area.status})</span>}</h1>
        <a href={`https://www.bleau.info${data.area.url}`} className="text-sky-600 hover:underline active:text-sky-800">Check on Bleau.Info</a>
      </div>
      {data.number_of_boulders > 0 ? <AreaStatistics data={data} /> :
        <div className="bg-orange-400 p-4 rounded-xl">No statistics to display in this area. Go on Bleau.info for more information.</div>}
    </MainLayout>
  )
}

function AreaStatistics({ data }) {
  return (
    <>
      <div className="grid grid-cols-3 gap-15 max-w-2xl mx-auto mt-8 mb-5">
        <Box title="Boulders" content={data.number_of_boulders} />
        <Box title="Ascents" content={data.ascents} />
        <Box title="Average Grade" content={data.average_grade.value} />
      </div>
      <div className="">
        <h2 className="text-xl font-semibold mb-4" >Grade distribution</h2>
        <div className="justify-items-center">
          <CustomLineChart data={data.grade_distribution} dataKeyX="grade.value" tickAngle={-45}
            dataKeyY1="boulders" margin={{ left: 30, right: 30, top: 10, bottom: 50 }} />
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Top 10 boulders with most ascents</h2>
        {data.most_climbed_boulders.map((item) => <BoulderGradeItem key={item.boulder.id} item={item} />)}
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Best Rated Boulders (rating above 4 and more than 5 ascents)</h2>
        {data.best_rated_boulders.length > 0 ?
          data.best_rated_boulders.map((item) => <BoulderGradeItem key={item.boulder.id} item={item} />) :
          <p className="bg-orange-400 p-4 rounded-xl">No Boulder with these criterion</p>
        }
      </div>
    </>
  )
}