import type { Route } from "./+types/search.tsx";
import { MainLayout } from "../ui/mainLayout";
import { useEffect, useState } from "react";
import { FetchData } from "~/ui/data.js";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  let data = await FetchData(`http://127.0.0.1:8000/search/${params.text}`);
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
  return <div>{boulder.name}</div>
}

function AreaItem({ area }) {
  return (
    <div>
      <a href={`/areas/${area.id}`}>{area.name}</a>
    </div>
  )
}