import type { Route } from "./+types/detail";
import { MainLayout } from "~/ui/mainLayout";
import { StatBadge } from "~/ui/statBadge";
import { GetRequest } from "~/data/data";
import { BoulderTable } from "~/ui/boulderTable";
import config from "~/config";
import { ChartBarVertical, ChartWrapper } from "~/ui/chart";
import { Mountain, Star, TrendingUp } from "lucide-react";
import { TypoH1, TypoH2, TypoH3 } from "~/ui/typography";
import { BleauInfoButton } from "~/ui/bleauInfoButton";
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
      <div className="flex flex-col mb-4">
        <div className="flex flex-row justify-between align-items-center">
          <TypoH1 className="mb-2">
            {data.area.status ? `${data.area.name} (${data.area.status})` : `${data.area.name}`}
          </TypoH1>
          <BleauInfoButton link={data.area.url} />
        </div>
        <TypoH3 className="text-muted-foreground">{data.area.region.name}</TypoH3>
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
      <div className="grid grid-cols-3 justify-items-center gap-15 max-w-2xl mx-auto mt-8 mb-8">
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
        tickAngle={-45}
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
