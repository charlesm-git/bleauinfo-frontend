import type { Route } from "./+types/grade";
import { MainLayout } from "../../ui/MainLayout";
import { GetRequest } from "~/data/data";
import { useEffect, useState } from "react";
import config from "~/config";
import { TypoH1 } from "~/ui/Typography";
import ChartBarVertical from "~/ui/chart/ChartBarVertical";
import ChartWrapper from "~/ui/chart/ChartWrapper";
import { GradeAscents, GradeDistribution } from "~/types/grade";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function GradeStatistics() {
  const [gradeDistributionData, setGradeDistributionData] = useState<GradeDistribution[]>([]);
  const [gradeAscentsData, setGradeAscentsData] = useState<GradeAscents[]>([]);

  useEffect(() => {
    async function load() {
      const gradeDistribution = await GetRequest(`${config.baseUrl}/stats/grade/distribution`);
      setGradeDistributionData(gradeDistribution);
    }
    load();
  }, []);

  useEffect(() => {
    async function load() {
      const gradeAscents = await GetRequest(`${config.baseUrl}/stats/grade/ascent`);
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
      color: "var(--chart-2)",
    },
  };

  return (
    <MainLayout className="flex flex-col gap-1 md:gap-3">
      <TypoH1>Grade Analytics</TypoH1>
      <ChartWrapper
        ChartType={ChartBarVertical}
        chartData={gradeDistributionData}
        chartConfig={gradeDistributionChartConfig}
        dataKeyX="grade.value"
        title="Grade Distribution"
        description="Repartition of the boulders across the grades"
        commentContent="statistics.grade.distribution"
        marginMobile={{ top: 0, bottom: 0, right: 5, left: 5 }}
        ticksMobile={[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6a",
          "6b",
          "6c",
          "7a",
          "7b",
          "7c",
          "8a",
          "8b",
          "8c",
          "9a",
        ]}
      />
      <ChartWrapper
        ChartType={ChartBarVertical}
        chartData={gradeAscentsData}
        chartConfig={gradeAscentsChartConfig}
        dataKeyX="grade.value"
        title="Ascent distribution per grade"
        description="Repartition of the ascents across the grades"
        commentContent="statistics.grade.ascent"
        marginMobile={{ top: 0, bottom: 0, right: 5, left: 5 }}
        ticksMobile={[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6a",
          "6b",
          "6c",
          "7a",
          "7b",
          "7c",
          "8a",
          "8b",
          "8c",
          "9a",
        ]}
      />
    </MainLayout>
  );
}
