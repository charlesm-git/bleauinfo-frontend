import type { Route } from "./+types/best-rated";
import { MainLayout } from "../ui/mainLayout";
import { GradeBlock, GradeBlockSkeleton } from "~/ui/gradeBlock";
import { useEffect, useState } from "react";
import { GetRequest } from "~/data/data";
import config from "~/config";
import { TypoH1 } from "~/ui/typography";
import { Card, CardContent } from "~/components/ui/card";
import { MarkdownContent } from "~/ui/markdownContent";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function BestRated() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const sorted_boulders = await GetRequest(`${config.baseUrl}/stats/boulders/best-rated`);
      setData(sorted_boulders);
      setIsLoading(false);
    }
    load();
  }, []);

  return (
    <MainLayout>
      <TypoH1>Best rated boulders</TypoH1>
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
          {data.map((grade_block: Record<string, any>) => (
            <GradeBlock key={grade_block.grade.id} data={grade_block} />
          ))}
        </>
      )}
    </MainLayout>
  );
}
