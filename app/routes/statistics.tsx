import type { Route } from "./+types/home";
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
  const [monthAscentsData, setMonthAscentsData] = useState([]);


  useEffect(() => {
    async function load() {
      const gradeDistribution = await FetchData("http://127.0.0.1:8000/stats/grades/distribution");
      const areaAscents = await FetchData("http://127.0.0.1:8000/stats/areas/most-repeats");
      const monthAscents = await FetchData("http://127.0.0.1:8000/stats/repeats/per-month");
      setGradeDistributionData(gradeDistribution);
      setAreaAscentsData(areaAscents);
      setMonthAscentsData(monthAscents);
    }
    load();
  }, []);

  return (
    <MainLayout>
      <div>
        <h1 className="text-xl font-bold mb-8">Grade distribution</h1>
        <div className="justify-items-center">
          <GradeDistributionLineChart data={gradeDistributionData} />
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
      <div>
        <h1 className="text-xl font-bold mb-8">Top 10 areas with the most registered ascents</h1>
        <MostAscentsAreaLineChart data={areaAscentsData} />
        <p className="w-full bg-slate-300 p-4 mt-4 mb-8 rounded-xl">
          Non surprisingly, most popular areas count the most ascents. Isatis is still far in front of every others though.
        </p>
      </div>
      <div>
        <h1 className="text-xl font-bold mb-8">Percentage of ascents per month</h1>
        <div className="flex justify-center">
          <MonthButton content="-" monthData={monthAscentsData} setMonthData={setMonthAscentsData} />
          <MonthButton content="+" monthData={monthAscentsData} setMonthData={setMonthAscentsData} />
        </div>
        <AscentPerMonthLineChart data={monthAscentsData} />
        <p className="w-full bg-slate-300 p-4 mt-4 mb-8 rounded-xl">Test
        </p>
      </div>
    </MainLayout>
  )
}

function MonthButton({ content, monthData, setMonthData }){
  function handleClick(){
    let newData
    if ( content === "+" ) {
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
    <button className="bg-slate-300 px-8 py-2 mx-8 rounded-3xl hover:scale-110 active:bg-slate-400 transition" onClick={handleClick}>{ content }</button>
  )
}

function GradeDistributionLineChart({ data }) {
  return (
    <LineChart
      width={1000}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 40,
        left: 40,
        bottom: 50,
      }}

    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="grade.value" angle={-45} textAnchor="end" interval={0} padding="gap" tick={{ fontSize: 14 }} tickMargin={5} />
      <YAxis />
      <Tooltip />
      <ReferenceLine y={0} stroke="#000" />
      {/* <Brush dataKey="grade.value" height={20} stroke="#8884d8"/> */}
      <Line dataKey="boulders" type="monotone" stroke="#8884d8" activeDot={{ r: 8 }}/>
    </LineChart>
  );
}

function MostAscentsAreaLineChart({ data }) {
  return (
    <LineChart
      width={1000}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 40,
        left: 40,
        bottom: 120,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="area.name" angle={-45} textAnchor="end" interval={0} padding="gap" tick={{ fontSize: 14 }} tickMargin={5} />
      <YAxis />
      <Tooltip />
      <ReferenceLine y={0} stroke="#000" />
      {/* <Brush dataKey="grade.value" height={20} stroke="#8884d8"/> */}
      <Line dataKey="ascents" type="monotone" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
}
function AscentPerMonthLineChart({ data }) {
  return (
    // <PieChart width={400} height={400}>
    //   <Pie
    //     dataKey="percentage"
    //     nameKey="month"
    //     cx="50%"
    //     cy="50%"
    //     isAnimationActive={false}
    //     data={ data }
    //     innerRadius={30}
    //     outerRadius={120}
    //     fill="#8884d8"
    //     label
    //   />
    //   <Tooltip />
    // </PieChart>
    <LineChart
      width={1000}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 40,
        left: 40,
        bottom: 20,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" tick={{ fontSize: 14 }} tickMargin={8} />
      <YAxis />
      <Tooltip />
      <ReferenceLine y={0} stroke="#000" />
      {/* <Brush dataKey="grade.value" height={20} stroke="#8884d8"/> */}
      <Line dataKey="percentage" type="monotone" stroke="#8884d8" activeDot={{ r: 8 }} isAnimationActive={false} />
    </LineChart>
  );
}
