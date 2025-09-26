import type { Route } from "./+types/style";
import { MainLayout } from "../../ui/mainLayout";
import { FetchData } from "~/data/data";
import { useEffect, useState } from "react";
import config from "~/config";
import { ChartArea, ChartWrapper } from "~/ui/chart";

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
      const stylesDistribution = await FetchData(
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
        ChartType={ChartArea}
        chartData={styleData}
        chartConfig={styleChartConfig}
        dataKeyX="style"
        title="Style repartition"
        description="Repartition of all the styles in the entire forest"
        tickAngle={-50}
        legendOffset={8}
        commentContent="statistics.style"
      />
    </MainLayout>
  );
}
