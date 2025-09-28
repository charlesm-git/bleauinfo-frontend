import type { Route } from "./+types/list";
import { MainLayout } from "~/ui/mainLayout";
import { GetRequest } from "~/data/data";
import { useEffect, useState } from "react";
import config from "~/config";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { TypoH1 } from "~/ui/typography";
import { AreaBadge } from "~/ui/areaBadge";

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
      const regionsData = await GetRequest(`${config.baseUrl}/regions/`);
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

export function RegionsAccordion({ regions }: { regions: Record<string, any>[] }) {
  return (
    <Accordion type="multiple" className="w-full">
      {regions.map((region) => (
        <AccordionItem value={`item-${region.id}`}>
          <AccordionTrigger>{region.name}</AccordionTrigger>
          <AccordionContent className="px-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6">
              {region.areas.map((area: Record<string, any>) => (
                <AreaBadge area={area} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
