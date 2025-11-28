import type { Route } from "./+types/style";
import { MainLayout } from "../../ui/MainLayout";
import { GetRequest } from "~/data/data";
import { useEffect, useState } from "react";
import config from "~/config";
import { TypoH1 } from "~/ui/Typography";
import ChartWrapper from "~/ui/chart/ChartWrapper";
import ChartBarVertical from "~/ui/chart/ChartBarVertical";

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
      const stylesDistribution = await GetRequest(`${config.baseUrl}/stats/style/distribution`);
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
      <TypoH1>Style Analytics</TypoH1>
      <ChartWrapper
        ChartType={ChartBarVertical}
        chartData={styleData}
        chartConfig={styleChartConfig}
        dataKeyX="styleType"
        title="Style repartition"
        description="Repartition of all the styles in the entire forest"
        tickAngle={-50}
        tickAngleMobile={-90}
        legendOffset={12}
        commentContent="statistics.style"
      />
    </MainLayout>
  );
}
