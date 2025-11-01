import type { Route } from "./+types/boulder-detail";
import { MainLayout } from "../ui/mainLayout";
import { GetRequest } from "~/data/data";
import { StatBadge } from "~/ui/statBadge";
import { useState } from "react";
import config from "~/config";
import { ChartLine, ChartWrapper } from "~/ui/chart";
import { Star, TrendingUp } from "lucide-react";
import { BleauInfoButton } from "~/ui/bleauInfoButton";
import { TypoH1, TypoH3 } from "~/ui/typography";
import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";

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
  let data = await GetRequest(`${config.baseUrl}/boulder/${params.boulderId}`);
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
      <div className="flex flex-col mb-4 gap-2">
        <div className="flex flex-row justify-between align-items-center">
          <div className="flex gap-8 items-center">
            <TypoH1 className="mb-2">{boulder.name}</TypoH1>
            <Badge variant="secondary" className="px-4 py-2 text-base bg-accent">
              {!boulder.slash_grade
                ? `${boulder.grade.value}`
                : `${boulder.grade.value}/${boulder.slash_grade.value}`}
            </Badge>
          </div>
          <BleauInfoButton link={boulder.url} />
        </div>
        <TypoH3 className="w-fit text-muted-foreground hover:text-muted">
          <Link to={`/areas/${boulder.area.id}`}>{boulder.area.name}</Link>
        </TypoH3>
        <div className="flex gap-4">
          {boulder.styles.map((style: Record<string, string>) => (
            <Badge variant="outline" className="py-1 px-3 text-sm">
              {style.style}
            </Badge>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-15 max-w-2xl mx-auto my-8 justify-items-center">
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
