import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { AreaBadge } from "./AreaBadge";

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
