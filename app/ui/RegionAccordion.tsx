import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { AreaBadge } from "./AreaBadge";
import { RegionDetail } from "~/types/region";

export function RegionsAccordion({ regions }: { regions: RegionDetail[] }) {
  return (
    <Accordion type="multiple" className="w-full">
      {regions.map((region) => (
        <AccordionItem value={`item-${region.id}`}>
          <AccordionTrigger>{region.name}</AccordionTrigger>
          <AccordionContent className="px-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6">
              {region.areas.map((area) => (
                <AreaBadge area={area} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
