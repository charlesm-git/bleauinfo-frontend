import type { Route } from "./+types/areas-list";
import { MainLayout } from "../ui/mainLayout";
import { StarRating } from "../ui/starRating";
import { FetchData } from "~/ui/data";
import { useEffect, useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AreasList() {
  const [regions, SetRegions] = useState([])

  useEffect(() => {
    async function load() {
      const regionsData = await FetchData('http://127.0.0.1:8000/regions/');
      SetRegions(regionsData);
    }
    load();
  }, [])

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Areas</h1>
      <div className="grid grid-cols-4 gap-6">
        {regions.map((region) => <RegionColumn key={region.id} region={region} />)}
      </div>
    </MainLayout>
  )

}

function RegionColumn({ region }) {
  return (
    <div className="grid grid-rows h-min">
      <h2 className="font-bold">{region.name}</h2>
      {region.areas.map((area) => <a key={area.id} href={`areas/${area.id}`} className="text-sky-600 hover:underline active:text-sky-800">{ area.name }</a>)}
    </div >
  )
}

