import type { Route } from "./+types/best-rated";
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

export default function BestRated() {
  const grades = [
    "9a", "8c+", "8c", "8b+", "8b", "8a+", "8a",
    "7c+", "7c", "7b+", "7b", "7a+", "7a",
    "6c+", "6c", "6b+", "6b", "6a+", "6a",
    "5+", "5", "5-",
    "4+", "4", "4-",
    "3+", "3", "3-",
    "2+", "2", "2-",
    "1+", "1"
  ]

  return (
    <MainLayout>
      <div className="p-4 rounded-md bg-slate-200">
        <p>This page gather the <strong>best rated boulders.</strong><br />
          All boulders that have <strong>more than 10 publics ratings and a rating above or equal to 4.7/5 are displayed</strong></p>
        <p className="italic">The last column shows the number of public rating registered</p>
      </div>
      {grades.map((grade) => <GradeBlock key={grade} grade={grade} />)}
    </MainLayout>
  )

}
function GradeBlock({ grade }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function load() {
      const boulders = await FetchData(`http://127.0.0.1:8000/stats/boulders/best-rated/${grade}`);
      setData(boulders);
    }
    load();
  }, []);

  if (!data.length) return null;

  return (
    <div className="my-4">
      <h1 className="text-xl font-bold mb-2">{grade}</h1>
      <div className="mx-3">
        {data.map((boulder) => <BoulderItem key={boulder.id} boulder={boulder} />)}
      </div>
    </div>
  );
}

function BoulderItem({ boulder }) {
  return (
    <div className="grid grid-cols-12 gap-3">
      <a href={`boulders/${boulder.id}`} className="col-span-5 text-sky-600 underline hover:text-sky-800">{boulder.name}</a>
      <a href={`areas/${boulder.area.id}`} className="col-span-4">{boulder.area.name} {boulder.area.status && <strong>({boulder.area.status})</strong>}</a>
      <div className="col-span-2">
        <StarRating rating={boulder.rating} />
      </div>
      <div>{boulder.number_of_rating}</div>
    </div>
  )
}
