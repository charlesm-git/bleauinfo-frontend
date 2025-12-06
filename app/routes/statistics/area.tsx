import type { Route } from "./+types/area";
import { MainLayout } from "../../ui/MainLayout";
import { GetRequest } from "~/data/data";
import { useEffect, useState } from "react";
import config from "~/config";
import { TypoH1 } from "~/ui/Typography";
import ChartWrapper from "~/ui/chart/ChartWrapper";
import ChartBarVertical from "~/ui/chart/ChartBarVertical";
import { AreaCount } from "~/types/area";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AreaStatistics() {
  const [areaAscentsData, setAreaAscentsData] = useState<AreaCount[]>([]);
  const [areaBouldersData, setAreaBouldersData] = useState<AreaCount[]>([]);

  useEffect(() => {
    async function load() {
      const areaAscents = await GetRequest(`${config.baseUrl}/stats/area/most-ascents`);
      setAreaAscentsData(areaAscents);
    }
    load();
  }, []);

  useEffect(() => {
    async function load() {
      const areaBoulders = await GetRequest(`${config.baseUrl}/stats/area/most-boulders`);
      setAreaBouldersData(areaBoulders);
    }
    load();
  }, []);

  const areaAscentsChartConfig = {
    count: {
      label: "Ascents",
      color: "var(--chart-1)",
    },
  };

  const areaBouldersChartConfig = {
    count: {
      label: "Boulders",
      color: "var(--chart-2)",
    },
  };
  return (
    <MainLayout className="flex flex-col gap-1 md:gap-3">
      <TypoH1>Area Analytics</TypoH1>
      <ChartWrapper
        ChartType={ChartBarVertical}
        chartData={areaAscentsData}
        chartConfig={areaAscentsChartConfig}
        dataKeyX="area.name"
        title="Top 10 areas with the most registered ascents"
        commentContent="statistics.area.ascent"
        tickAngle={-30}
        legendOffset={12}
        marginMobile={{ top: 0, bottom: 0, right: 0, left: 0 }}
        tickAngleMobile={-90}
        legendOffsetMobile={16}
      />
      <ChartWrapper
        ChartType={ChartBarVertical}
        chartData={areaBouldersData}
        chartConfig={areaBouldersChartConfig}
        dataKeyX="area.name"
        title="Top 10 areas with the most boulders"
        commentContent="statistics.area.boulder"
        tickAngle={-30}
        legendOffset={12}
        marginMobile={{ top: 0, bottom: 0, right: 0, left: 0 }}
        tickAngleMobile={-90}
        legendOffsetMobile={12}
      />
    </MainLayout>
  );
}
