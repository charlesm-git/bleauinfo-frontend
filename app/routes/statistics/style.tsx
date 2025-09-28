import type { Route } from "./+types/style";
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

export default function StyleStatistics() {
  const [styleData, setStyleData] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    async function load() {
      const stylesDistribution = await GetRequest(
        `${config.baseUrl}/stats/boulders/styles/distribution`
      );
      setStyleData(stylesDistribution);
    }
    load();
  }, []);

  const styleChartConfig = {
    boulders: {
      label: "Boulders",
      color: "var(--chart-1)",
    },
  };

  return (
    <MainLayout>
      <ChartWrapper
        ChartType={ChartBarVertical}
        chartData={styleData}
        chartConfig={styleChartConfig}
        dataKeyX="styleType"
        title="Style repartition"
        description="Repartition of all the styles in the entire forest"
        tickAngle={-50}
        legendOffset={12}
        commentContent="statistics.style"
      />
    </MainLayout>
  );
}
