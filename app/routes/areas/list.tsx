import type { Route } from "./+types/list";
import { MainLayout } from "~/ui/mainLayout";
import { GetRequest } from "~/data/data";
import { useEffect, useState } from "react";
import config from "~/config";

import { TypoH1 } from "~/ui/typography";
import { RegionsAccordion } from "~/ui/regionAccordion";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AreasList() {
  const [regions, SetRegions] = useState([]);

  useEffect(() => {
    async function load() {
      const regionsData = await GetRequest(`${config.baseUrl}/region`);
      SetRegions(regionsData);
    }
    load();
  }, []);

  return (
    <MainLayout>
      <TypoH1>Areas</TypoH1>
      <RegionsAccordion regions={regions} />
    </MainLayout>
  );
}
