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

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function BestRated() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const grades = data
    .filter((g: Record<string, any>) => g.boulders.length > 0)
    .map((item: Record<string, any>) => ({
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
              .filter((grade_block: Record<string, any>) => grade_block.boulders.length !== 0)
              .map((grade_block: Record<string, any>) => (
                <GradeBlock key={grade_block.grade.id} data={grade_block} />
              ))}
          </>
        )}
      </div>
      <GradeNavigationWrapper grades={grades} />
    </MainLayout>
  );
}
