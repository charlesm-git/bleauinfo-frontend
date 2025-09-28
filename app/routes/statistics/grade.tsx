import type { Route } from "./+types/grade";
import { MainLayout } from "../../ui/mainLayout";
import { GetRequest } from "~/data/data";
import { useEffect, useState } from "react";
import config from "~/config";
import { ChartBarVertical, ChartWrapper } from "~/ui/chart";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function GradeStatistics() {
  const [gradeDistributionData, setGradeDistributionData] = useState<Record<string, any>[]>([]);
  const [gradeAscentsData, setGradeAscentsData] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    async function load() {
      const gradeDistribution = await GetRequest(`${config.baseUrl}/stats/grades/distribution`);
      setGradeDistributionData(gradeDistribution);
    }
    load();
  }, []);

  useEffect(() => {
    async function load() {
      const gradeAscents = await GetRequest(`${config.baseUrl}/stats/ascents/per-grade`);
      setGradeAscentsData(gradeAscents);
    }
    load();
  }, []);

  const gradeDistributionChartConfig = {
    boulders: {
      label: "Boulders",
      color: "var(--chart-1)",
    },
  };

  const gradeAscentsChartConfig = {
    ascents: {
      label: "Ascents",
      color: "var(--chart-1)",
    },
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <ChartWrapper
          ChartType={ChartBarVertical}
          chartData={gradeDistributionData}
          chartConfig={gradeDistributionChartConfig}
          dataKeyX="grade.value"
          title="Grade Distribution"
          description="Repartition of the boulders across the grades"
          commentContent="statistics.grade.distribution"
        />
        <ChartWrapper
          ChartType={ChartBarVertical}
          chartData={gradeAscentsData}
          chartConfig={gradeAscentsChartConfig}
          dataKeyX="grade.value"
          title="Ascent distribution per grade"
          description="Repartition of the ascents across the grades"
          commentContent="statistics.grade.ascent"
        />
      </div>
    </MainLayout>
  );
}
