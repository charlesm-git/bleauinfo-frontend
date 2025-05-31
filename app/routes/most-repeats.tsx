import type { Route } from "./+types/home";
import { MainLayout } from "../ui/mainLayout";
import { StarRating } from "~/ui/starRating";
import { FetchData } from "~/ui/data";
import { useEffect, useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function MostRepeats() {
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
      <p className="p-4 rounded-md bg-slate-200">This page gather the <strong>top 10 most repeated boulders per grade.</strong><br />
        Last column shows the number of public repetitions registered on Bleau.Info</p>
      {grades.map((grade) => <GradeBlock key={grade} grade={grade} />)}
    </MainLayout>
  )

}
function GradeBlock({ grade }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function load() {
      const boulders = await FetchData(`http://127.0.0.1:8000/stats/boulders/most-repeats/${grade}`);
      setData(boulders);
    }
    load();
  }, []);
  if (!data.length) return null;

  return (
    <div className="my-4">
      <h1 className="text-xl font-bold">{grade}</h1>
      {data.map((item) => <BoulderItem key={item.boulder.id} item={item} />)}
    </div>
  );
}

function BoulderItem({ item }) {
  const boulder = item.boulder
  return (
    <div className="grid grid-cols-12 gap-3">
      <a href={boulder.url} className="col-span-5">{boulder.name}</a>
      <p className="col-span-4">{item.area.name} {item.area.status && <strong>({item.area.status})</strong>}</p>
      <div className="col-span-2">
        <StarRating rating={boulder.rating} />
      </div>
      <div className="text-center">{item.number_of_repetition}</div>
    </div>
  )
}