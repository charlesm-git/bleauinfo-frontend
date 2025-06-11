import type { Route } from "./+types/statistics";
import { MainLayout } from "../ui/mainLayout";
import { FetchData } from "~/ui/data";
import React, { PureComponent, useEffect, useState } from 'react';
import {
  BarChart,
  LineChart,
  PieChart,
  Bar,
  Line,
  Pie,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
} from 'recharts';

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

  useEffect(() => {
    async function load() {
      const gradeDistribution = await FetchData("http://127.0.0.1:8000/stats/grades/distribution");
      setGradeDistributionData(gradeDistribution);
    }
    load();
  }, []);

  useEffect(() => {
    async function load() {
      const gradeAscents = await FetchData("http://127.0.0.1:8000/stats/repeats/per-grade");
      setGradeAscentsData(gradeAscents);
    }
    load();
  }, []);

  useEffect(() => {
    async function load() {
      const areaAscents = await FetchData("http://127.0.0.1:8000/stats/areas/most-ascents");
      setAreaAscentsData(areaAscents);
    }
    load();
  }, []);

  useEffect(() => {
    async function load() {
      const monthAscents = await FetchData("http://127.0.0.1:8000/stats/repeats/per-month");
      setMonthlyAscentsData(monthAscents);
    }
    load();
  }, []);

  useEffect(() => {
    async function load() {
      const yearAscents = await FetchData("http://127.0.0.1:8000/stats/repeats/per-year");
      setYearlyAscentsData(yearAscents);
    }
    load();
  }, []);

  return (
    <MainLayout>
      <div>
        <h1 className="text-xl font-bold mb-8">Grade distribution</h1>
        <div className="justify-items-center">
          <CustomLineChart data={gradeDistributionData} dataKeyX="grade.value" dataKeyY="boulders"
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
          <CustomLineChart data={gradeAscentsData} dataKeyX="grade.value" dataKeyY="ascents"
            tickAngle={-45} margin={{ left: 30, right: 30, top: 10, bottom: 30 }} />
        </div>
        <p className="w-full bg-slate-300 p-4 mt-2 mb-8 rounded-xl">Analysis : people don't climb in "+" grades and we can notice the tendency of "I don't log under 7a"</p>
      </div>
      <div className="mt-16">
        <h1 className="text-xl font-bold mb-8">Top 10 areas with the most registered ascents</h1>
        <div className="justify-items-center">
          <CustomLineChart data={areaAscentsData} dataKeyX="area.name" dataKeyY="ascents"
            tickAngle={-45} margin={{ left: 30, right: 30, top: 10, bottom: 100 }} />
        </div>
        <p className="w-full bg-slate-300 p-4 mt-4 mb-8 rounded-xl">
          Non surprisingly, most popular areas count the most ascents. Isatis still being far in front.
        </p>
      </div>
      <div className="mt-16">
        <h1 className="text-xl font-bold mb-8">Percentage of ascents per month</h1>
        <div className="justify-items-center mb-2">
          <div className="flex">
            <MonthButton content="&larr;" move="left" monthData={monthlyAscentsData} setMonthData={setMonthlyAscentsData} />
            <MonthButton content="&rarr;" move="right" monthData={monthlyAscentsData} setMonthData={setMonthlyAscentsData} />
          </div>
          <CustomLineChart data={monthlyAscentsData} dataKeyX="month" dataKeyY="percentage"
            margin={{ left: 30, right: 30, top: 10, bottom: 30 }} />
        </div>
        <p className="w-full bg-slate-300 p-4 mb-8 rounded-xl">Analysis</p>
      </div>
      <div className="mt-16">
        <h1 className="text-xl font-bold mb-8">Number of ascents per year</h1>
        <div className="justify-items-center">
          <CustomLineChart data={yearlyAscentsData} dataKeyX="year" dataKeyY="ascents"
            tickAngle={-45} margin={{ left: 30, right: 30, top: 10, bottom: 50 }} />
        </div>
        <p className="w-full bg-slate-300 p-4 mt-4 mb-8 rounded-xl">Analysis</p>
      </div>
    </MainLayout>
  )
}

function MonthButton({ content, move, monthData, setMonthData }) {
  function handleClick() {
    let newData
    if (move === "right") {
      const last = monthData[monthData.length - 1]
      newData = [last, ...monthData.slice(0, -1)]
    }
    else {
      const [first, ...rest] = monthData
      newData = [...rest, first]
    }
    setMonthData(newData)
  }
  return (
    <button className="bg-slate-300 text-2xl px-8 py-1 mx-8 rounded-3xl hover:scale-110 active:bg-slate-400 transition" onClick={handleClick}>{content}</button>
  )
}

export function CustomLineChart({ data, dataKeyX, dataKeyY, margin, tickAngle = 0}) {
  return (
    <LineChart
      width={800}
      height={400}
      data={data}
      margin={margin}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={dataKeyX} angle={tickAngle} textAnchor="end" interval={0} padding="gap" tick={{ fontSize: 14 }} tickMargin={5} />
      <YAxis />
      <Tooltip />
      <ReferenceLine y={0} stroke="#000" />
      <Line dataKey={dataKeyY} type="monotone" stroke="#45556c" activeDot={{ r: 8 }} isAnimationActive={false} />
    </LineChart>
  );
}