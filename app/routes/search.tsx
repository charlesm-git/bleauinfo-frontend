import type { Route } from "./+types/search.tsx";
import { MainLayout } from "../ui/mainLayout";
import { FetchData } from "~/ui/data.js";
import config from "~/config";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  let data = await FetchData(`${config.baseUrl}/search/${params.text}`);
  return data;
}

export default function Search({ loaderData }: Route.ComponentProps) {
  const { boulders, areas } = loaderData
  return (
    <MainLayout>
      {boulders.length > 0 && (
        <>
          <h1 className="text-2xl font-semibold mb-4">Boulders</h1>
          {boulders.map((boulder) => <BoulderItem key={boulder.id} boulder={boulder} />)}
        </>
      )}
      {areas.length > 0 && (
        <>
          <h1 className="text-2xl font-semibold my-4">Areas</h1>
          {areas.map((area) => <AreaItem key={area.id} area={area} />)}
        </>
      )}
    </MainLayout>
  );
}

function BoulderItem({ boulder }) {
  return (
    <div className="flex flex-row gap-4">
      <a href={`/boulders/${boulder.id}`} className="text-slate-700 text-medium">{boulder.name}</a>
      <div className="grade">
        {boulder.grade.value}
        {boulder.slash_grade ? <span className="italic text-slate-400"> {boulder.slash_grade.value}</span> : null}
      </div>
      <a href={`/areas/${boulder.area.id}`}>{boulder.area.name}</a>
    </div>
  )
}

function AreaItem({ area }) {
  return (
    <div>
      <a href={`/areas/${area.id}`}>{area.name}</a>
    </div>
  )
}