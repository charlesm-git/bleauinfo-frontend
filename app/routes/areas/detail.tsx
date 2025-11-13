import type { Route } from "./+types/detail";
import { MainLayout } from "~/ui/MainLayout";
import { StatBadge } from "~/ui/StatBadge";
import { GetRequest } from "~/data/data";
import { BoulderTable } from "~/ui/BoulderTable";
import config from "~/config";
import { ChartBarVertical, ChartWrapper } from "~/ui/Chart";
import { Mountain, Star, TrendingUp } from "lucide-react";
import { TypoH1, TypoH2, TypoH3 } from "~/ui/Typography";
import { BleauInfoButton } from "~/ui/BleauInfoButton";
import { formatNumber } from "~/data/helper";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  let data = await GetRequest(`${config.baseUrl}/area/${params.areaId}/stats`);
  return data;
}

export default function AreasDetail({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start mb-4">
        <div className="flex flex-col">
          <TypoH1 className="mb-2">
            {data.area.status ? `${data.area.name} (${data.area.status})` : `${data.area.name}`}
          </TypoH1>
          <TypoH3 className="text-muted-foreground">{data.area.region.name}</TypoH3>
        </div>
        <BleauInfoButton link={data.area.url} />
      </div>
      {data.number_of_boulders > 0 ? (
        <AreaStatistics data={data} />
      ) : (
        <div className="bg-orange-400 p-4 rounded-xl">
          No statistics to display in this area. Go on Bleau.info for more information.
        </div>
      )}
    </MainLayout>
  );
}

function AreaStatistics({ data }: { data: Record<string, any> }) {
  const areaChartConfig = {
    boulders: {
      label: "Boulders",
      color: "var(--chart-1)",
    },
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-6 md:gap-15 my-8">
        <StatBadge
          Icon={Mountain}
          content="Boulders"
          value={formatNumber(data.number_of_boulders)}
        />
        <StatBadge Icon={TrendingUp} content="Ascents" value={formatNumber(data.ascents)} />
        <StatBadge Icon={Star} content="Avg Grade" value={data.average_grade.value} />
      </div>
      <ChartWrapper
        ChartType={ChartBarVertical}
        chartData={data.grade_distribution}
        chartConfig={areaChartConfig}
        dataKeyX="grade.value"
        title="Grade distribution"
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
      <div className="my-8">
        <TypoH2>Boulders with most ascents</TypoH2>
        <BoulderTable items={data.most_climbed_boulders} />
      </div>
      <div className="mb-8">
        <TypoH2>Best Rated Boulders</TypoH2>
        {data.best_rated_boulders.length > 0 ? (
          <BoulderTable items={data.best_rated_boulders} />
        ) : (
          <p className="bg-orange-400 p-4 rounded-xl">
            Unfortunately, no boulder in this area have more than 5 ratings.
          </p>
        )}
      </div>
    </>
  );
}
