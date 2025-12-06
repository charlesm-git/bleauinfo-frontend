import type { Route } from "./+types/best-rated";
import { MainLayout } from "../ui/MainLayout";
import { GradeBlock, GradeBlockSkeleton } from "~/ui/GradeBlock";
import { useEffect, useState } from "react";
import { GetRequest } from "~/data/data";
import config from "~/config";
import { TypoH1 } from "~/ui/Typography";
import { Card, CardContent } from "~/components/ui/card";
import { MarkdownContent } from "~/ui/MarkdownContent";
import { GradeNavigationWrapper } from "~/ui/GradeNavigationSlider";
import { BoulderByGrade } from "~/types/boulder";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function BestRated() {
  const [data, setData] = useState<BoulderByGrade[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const grades = data
    .filter((item) => item.boulders.length > 0)
    .map((item) => ({
      id: `grade-${item.grade.value}`,
      label: item.grade.value,
    }));

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const sorted_boulders = await GetRequest(`${config.baseUrl}/stats/boulder/best-rated`);
      setData(sorted_boulders);
      setIsLoading(false);
    }
    load();
  }, []);

  return (
    <MainLayout className="flex gap-1 md:gap-4 lg:gap-8">
      <div className="flex flex-col flex-1">
        <TypoH1 className="mb-4">Best rated boulders</TypoH1>
        <Card className="bg-secondary mb-8">
          <CardContent>
            <MarkdownContent contentKey="best-rated" />
          </CardContent>
        </Card>
        {isLoading ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <GradeBlockSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {data
              .filter((block) => block.boulders.length !== 0)
              .map((block) => (
                <GradeBlock key={block.grade.id} data={block} />
              ))}
          </>
        )}
      </div>
      <GradeNavigationWrapper grades={grades} />
    </MainLayout>
  );
}
