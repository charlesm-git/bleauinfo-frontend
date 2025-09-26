import type { Route } from "./+types/home";
import { MainLayout } from "../ui/mainLayout";
import { Card, CardContent } from "~/components/ui/card";
import { MarkdownContent } from "~/ui/markdownContent";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <MainLayout>
      <Card className="bg-destructive">
        <CardContent>
          <MarkdownContent contentKey="home"/>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
