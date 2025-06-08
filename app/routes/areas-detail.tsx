import type { Route } from "./+types/areas-detail";
import { MainLayout } from "../ui/mainLayout";
import { StarRating } from "../ui/starRating";
import { FetchData } from "~/ui/data";
import { CustomLineChart } from "./statistics";
import { useEffect, useState } from "react";

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
        <a href={`https://www.bleau.info${data.area.url}`} className="text-sky-600 hover:underline active:text-sky-800">Go on Bleau.Info</a>
      </div>
      {data.number_of_boulders !== 0 ? <AreaStatistics data={data} /> : 
      <div className="bg-orange-400 p-4 rounded-xl">No statistics to display in this area. Go on Bleau.info for more information.</div>}
    </MainLayout>
  )
}

function AreaStatistics({ data }) {
  return (
    <>
      <div className="grid grid-cols-3 gap-15 max-w-2xl mx-auto mt-8 mb-5">
        <div className="border-2 border-slate-400 rounded-xl p-4 text-center">
          <h2 className="text-sm font-semibold text-slate-600 mb-2">Boulders</h2>
          <p className="text-2xl font-bold">{data.number_of_boulders}</p>
        </div>
        <div className="border-2 border-slate-400 rounded-xl p-4 text-center">
          <h2 className="text-sm font-semibold text-slate-600 mb-2">Ascents</h2>
          <p className="text-2xl font-bold">{data.total_number_of_repetition}</p>
        </div>
        <div className="border-2 border-slate-400 rounded-xl p-4 text-center">
          <h2 className="text-sm font-semibold text-slate-600 mb-2">Average Grade</h2>
          <p className="text-2xl font-bold">{data.average_grade.value}</p>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4" >Grade distribution</h2>
        <CustomLineChart data={data.grade_distribution} dataKeyX="grade.value" tickAngle={-45}
          dataKeyY="boulders" margin={{ left: 30, right: 30, top: 10, bottom: 50 }} />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Top 10 boulders with most ascents</h2>
        {data.most_climbed_boulders.map((item) => <BoulderItem key={item.boulder.id} item={item} />)}
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Best Rated Boulders (rating above 4 and more than 5 ascents)</h2>
        {data.best_rated_boulders.length > 0 ?
          data.best_rated_boulders.map((item) => <BoulderItem key={item.id} item={item} />) :
          <p className="bg-orange-400 p-4 rounded-xl">No Boulder with these criterion</p>
        }
      </div>
    </>
  )
}

function BoulderItem({ item }) {
  const boulder = item.boulder
  return (
    <div className="grid grid-cols-12 gap-3">
      <a href={boulder.url} className="col-span-5">{boulder.name}</a>
      <p className="col-span-4">{boulder.grade.value} {boulder.slash_grade && <span className="italic text-neutral-400">/ {boulder.slash_grade.value}</span>}</p>
      <div className="col-span-2">
        <StarRating rating={boulder.rating} />
      </div>
      <div className="text-center">{item.ascents}</div>
    </div>
  )
}