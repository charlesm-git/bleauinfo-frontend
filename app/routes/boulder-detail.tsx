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
  let data = await FetchData(`http://127.0.0.1:8000/boulders/${params.boulderId}`);
  return data;
}

export default function BouldersDetail({ loaderData }: Route.ComponentProps) {
  const boulder = loaderData
  return (
    <MainLayout>
      <div className="flex flex-row gap-4 items-end mb-4">
        <h1 className="text-xl font-bold">{boulder.name}</h1>
        <a href={boulder.url} className="text-sky-600 hover:underline active:text-sky-800">Go on Bleau.Info</a>
      </div>
    </MainLayout>
  )
}

function AreaStatistics({ data }) {
  return (
    <>
    </>
  )
}

function BoulderItem({ item }) {

}