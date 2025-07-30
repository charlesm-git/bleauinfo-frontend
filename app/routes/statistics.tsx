import type { Route } from "./+types/statistics";
import { MainLayout } from "../ui/mainLayout";
import { FetchData } from "~/ui/data";
import { CustomLineChart, SlidingLineChart } from "~/ui/chart";
import { useEffect, useState } from 'react';
import config from "~/config";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Statistics() {
  const [gradeDistributionData, setGradeDistributionData] = useState([]);
  const [areaAscentsData, setAreaAscentsData] = useState([]);
  const [monthlyAscentsData, setMonthlyAscentsData] = useState([]);
  const [yearlyAscentsData, setYearlyAscentsData] = useState([]);
  const [gradeAscentsData, setGradeAscentsData] = useState([]);
  const [styleData, setStyleData] = useState([]);


  useEffect(() => {
    async function load() {
      const gradeDistribution = await FetchData(`${config.baseUrl}/stats/grades/distribution`);
      setGradeDistributionData(gradeDistribution);
    }
    load();
  }, []);

  useEffect(() => {
    async function load() {
      const gradeAscents = await FetchData(`${config.baseUrl}/stats/ascents/per-grade`);
      setGradeAscentsData(gradeAscents);
    }
    load();
  }, []);

  useEffect(() => {
    async function load() {
      const areaAscents = await FetchData(`${config.baseUrl}/stats/areas/most-ascents`);
      setAreaAscentsData(areaAscents);
    }
    load();
  }, []);

  useEffect(() => {
    async function load() {
      const stylesDistribution = await FetchData(`${config.baseUrl}/stats/boulders/styles/distribution`);
      setStyleData(stylesDistribution);
    }
    load();
  }, []);

  useEffect(() => {
    async function load() {
      const monthAscents = await FetchData(`${config.baseUrl}/stats/ascents/per-month`);
      setMonthlyAscentsData(monthAscents);
    }
    load();
  }, []);

  useEffect(() => {
    async function load() {
      const yearAscents = await FetchData(`${config.baseUrl}/stats/ascents/per-year`);
      setYearlyAscentsData(yearAscents);
    }
    load();
  }, []);

  return (
    <MainLayout>
      <div>
        <h1 className="text-xl font-bold mb-8">Grade distribution</h1>
        <div className="justify-items-center">
          <CustomLineChart data={gradeDistributionData} dataKeyX="grade.value" dataKeyY1="boulders"
            tickAngle={-45} margin={{ left: 30, right: 30, top: 10, bottom: 30 }} />
          <div className="w-full bg-slate-300 p-4 mt-4 mb-8 rounded-xl">
            <h2 className="font-bold">Comments</h2>
            <ul className="list-disc pl-5">
              <li><span className="italic">6th grade don't make sense</span><br />
                There is no reason for an under-representation of "+" grades.
                If you ever thought that "+" grades in the 6th range are poorly graded, well based on this graph it's probably the case.
              </li>
              <li><span className="italic">More consistancy in the 7th and 8th grade but still...</span><br />
                Even if we can see a better grade repartition in the higher grades, the slope is still not quite as smooth as
                it should be.<br />
                To smooth it out, we need more "+" grade or less "round" grades. In the current state, that means that "round" grades cover
                a larger range of difficulty that "+" grades.
                <span className="font-semibold"> That means that "round" grades have greater chances to be  easy or hard for the grade.</span><br />
                I'll let you decide which side you think it has to go.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h1 className="text-xl font-bold mb-8">Number of ascents per grade</h1>
        <div className="justify-items-center">
          <CustomLineChart data={gradeAscentsData} dataKeyX="grade.value" dataKeyY1="ascents"
            tickAngle={-45} margin={{ left: 30, right: 30, top: 10, bottom: 30 }} />
        </div>
        <p className="w-full bg-slate-300 p-4 mt-2 mb-8 rounded-xl">Analysis : people don't climb in "+" grades and we can notice the tendency of "I don't log under 7a"</p>
      </div>
      <div className="mt-16">
        <h1 className="text-xl font-bold mb-8">Top 10 areas with the most registered ascents</h1>
        <div className="justify-items-center">
          <CustomLineChart data={areaAscentsData} dataKeyX="area.name" dataKeyY1="ascents"
            tickAngle={-45} margin={{ left: 30, right: 30, top: 10, bottom: 100 }} />
        </div>
        <p className="w-full bg-slate-300 p-4 mt-4 mb-8 rounded-xl">
          Non surprisingly, most popular areas count the most ascents. Isatis still being far in front.
        </p>
      </div>
      <div className="mt-16">
        <h1 className="text-xl font-bold mb-8">Style Distribution</h1>
        <div className="justify-items-center">
          <CustomLineChart data={styleData} dataKeyX="style" dataKeyY1="boulders"
            tickAngle={-45} margin={{ left: 30, right: 30, top: 10, bottom: 100 }} />
        </div>
        <p className="w-full bg-slate-300 p-4 mt-4 mb-8 rounded-xl">
          Non surprisingly, most popular areas count the most ascents. Isatis still being far in front.
        </p>
      </div>
      <div className="mt-16">
        <h1 className="text-xl font-bold mb-8">Percentage of ascents per month</h1>
        <SlidingLineChart data={monthlyAscentsData} setData={setMonthlyAscentsData} dataKeyX="month" dataKeyY1="percentage"
          margin={{ left: 30, right: 30, top: 10, bottom: 30 }} />
        <p className="w-full bg-slate-300 p-4 mb-8 rounded-xl">Analysis soming soon</p>
      </div>
      <div className="mt-16">
        <h1 className="text-xl font-bold mb-8">Number of ascents per year</h1>
        <div className="justify-items-center">
          <CustomLineChart data={yearlyAscentsData} dataKeyX="year" dataKeyY1="ascents"
            tickAngle={-45} margin={{ left: 30, right: 30, top: 10, bottom: 50 }} />
        </div>
        <p className="w-full bg-slate-300 p-4 mt-4 mb-8 rounded-xl">Analysis coming soon</p>
      </div>
    </MainLayout>
  )
}