import type { Route } from "./+types/boulder-detail";
import { MainLayout } from "../ui/mainLayout";
import { FetchData } from "~/data/data";
import { StatBadge } from "~/ui/statBadge";
import { useState } from "react";
import config from "~/config";
import { ChartLine, ChartWrapper } from "~/ui/chart";
import { ChartColumnBig, Star, TrendingUp } from "lucide-react";
import { BleauInfoButton } from "~/ui/bleauInfoButton";
import { TypoH1, TypoH3 } from "~/ui/typography";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

interface BoulderParams {
  boulderId: number;
}

export async function loader({ params }: { params: BoulderParams }) {
  let data = await FetchData(`${config.baseUrl}/boulders/${params.boulderId}`);
  return data;
}

export default function BouldersDetail({ loaderData }: Route.ComponentProps) {
  const boulder = loaderData;
  const [chartData, setChartData] = useState(boulder.aggregated_ascents);
  const chartConfig = {
    boulder: {
      label: "Boulder",
      color: "var(--chart-1)",
    },
    general: {
      label: "Overall",
      color: "var(--chart-reference)",
    },
  };

  return (
    <MainLayout>
      <div className="flex flex-col mb-4">
        <div className="flex flex-row justify-between align-items-center">
          <TypoH1 className="mb-2">{boulder.name}</TypoH1>
          <BleauInfoButton link={boulder.url} />
        </div>
        <TypoH3 className="w-fit text-muted-foreground hover:text-muted">
          <Link to={`/areas/${boulder.area.id}`}>{boulder.area.name}</Link>
        </TypoH3>
      </div>
      <div className="grid grid-cols-3 gap-15 max-w-4xl mx-auto my-8">
        {!boulder.slash_grade ? (
          <StatBadge Icon={ChartColumnBig} content="Grade" value={`${boulder.grade.value}`} />
        ) : (
          <StatBadge
            Icon={ChartColumnBig}
            content="Grade"
            value={`${boulder.grade.value} / ${boulder.slash_grade.value}`}
          />
        )}
        <StatBadge Icon={TrendingUp} content="Ascents" value={boulder.ascents.length} />
        <StatBadge Icon={Star} content="Rating" value={`${boulder.rating}/5`} />
      </div>
      <ChartWrapper
        ChartType={ChartLine}
        chartConfig={chartConfig}
        chartData={chartData}
        dataKeyX="month"
        title="Pourcentage of ascents per month"
        chartSetData={setChartData}
        enableSliding={true}
        margin={{ right: 50, left: 50, bottom: 20, top: 20 }}
      />
    </MainLayout>
  );
}
