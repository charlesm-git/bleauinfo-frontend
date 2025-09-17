import type { Route } from "./+types/most-ascents";
import { MainLayout } from "../ui/mainLayout";
import { GradeBlock } from "~/ui/list-grade-block";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function MostAscents() {
  const grades = [
    "9a",
    "8c+",
    "8c",
    "8b+",
    "8b",
    "8a+",
    "8a",
    "7c+",
    "7c",
    "7b+",
    "7b",
    "7a+",
    "7a",
    "6c+",
    "6c",
    "6b+",
    "6b",
    "6a+",
    "6a",
    "5+",
    "5",
    "5-",
    "4+",
    "4",
    "4-",
    "3+",
    "3",
    "3-",
    "2+",
    "2",
    "2-",
    "1+",
    "1",
  ];

  return (
    <MainLayout>
      <div className="p-4 rounded-md bg-slate-200">
        <p className="">
          This page gather the <strong>top 10 most repeated boulders per grade.</strong>
        </p>
        <p className="italic">The last column shows the number of public ascents logged</p>
      </div>
      {grades.map((grade: string) => (
        <GradeBlock key={grade} grade={grade} type="most-ascents" />
      ))}
    </MainLayout>
  );
}
