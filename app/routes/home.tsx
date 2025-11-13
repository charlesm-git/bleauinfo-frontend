import type { Route } from "./+types/home";
import { MainLayout } from "../ui/MainLayout";
import { Card, CardContent } from "~/components/ui/card";
import { MarkdownContent } from "~/ui/MarkdownContent";
import { StatBadge, StatBadgeSkeleton } from "~/ui/StatBadge";
import { useEffect, useState } from "react";
import { GetRequest } from "~/data/data";
import config from "~/config";
import { MapPin, Mountain, Star, TrendingUp } from "lucide-react";
import { TypoH2 } from "~/ui/Typography";
import { formatNumber } from "~/data/helper";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

interface GeneralStatisticsData {
  boulder_count: string;
  area_count: string;
  ascent_count: string;
  average_grade: { id: number; value: string; correspondence: number };
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<GeneralStatisticsData>({} as GeneralStatisticsData);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const statistics = await GetRequest(`${config.baseUrl}/stats/general`);
      setData(statistics);
      setIsLoading(false);
    }
    load();
  }, []);

  return (
    <MainLayout>
      <Card className="bg-destructive">
        <CardContent>
          <MarkdownContent contentKey="home" />
        </CardContent>
      </Card>
      <TypoH2 className="mt-8">General Statistics</TypoH2>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-4 max-w-2xl mx-auto mt-8 mb-8">
        {!isLoading ? (
          <>
            <StatBadge
              Icon={Mountain}
              content="Boulders"
              value={formatNumber(data.boulder_count)}
            />
            <StatBadge Icon={MapPin} content="Areas" value={data.area_count} />
            <StatBadge
              Icon={TrendingUp}
              content="Ascents"
              value={formatNumber(data.ascent_count)}
            />
            <StatBadge Icon={Star} content="Avg Grade" value={data.average_grade?.value} />
          </>
        ) : (
          <>
            <StatBadgeSkeleton />
            <StatBadgeSkeleton />
            <StatBadgeSkeleton />
            <StatBadgeSkeleton />
          </>
        )}
      </div>
    </MainLayout>
  );
}
