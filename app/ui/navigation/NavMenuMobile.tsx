import { useState } from "react";
import { Link } from "react-router";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import { componentStatistics, componentTop } from "./navigationComponents";

export default function NavMenuMobile() {
  const [open, setOpen] = useState(false);
  const [topsOpen, setTopsOpen] = useState(false);
  const [statisticsOpen, setStatisticsOpen] = useState(false);

  const closeMenus = () => {
    (setTopsOpen(false), setStatisticsOpen(false));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-3">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-4">
          <SheetClose asChild>
            <Link to="/" className="text-sm font-medium px-3 py-2 hover:bg-accent rounded-md">
              Home
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link
              to="/recommender"
              className="text-sm font-medium px-3 py-2 hover:bg-accent rounded-md">
              Recommender
            </Link>
          </SheetClose>

          <Collapsible open={topsOpen} onOpenChange={setTopsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between px-4 text-sm font-medium">
                Tops
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    topsOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="flex flex-col gap-2 pl-4">
                {componentTop.map((component) => (
                  <SheetClose asChild key={component.title} onClick={() => closeMenus()}>
                    <Link to={component.href} className="py-2 px-4 hover:bg-accent rounded-md">
                      <div className="text-sm font-medium">{component.title}</div>
                      <p className="text-muted-foreground text-xs">{component.description}</p>
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={statisticsOpen} onOpenChange={setStatisticsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between px-4 text-sm font-medium">
                Statistics
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    statisticsOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="flex flex-col gap-2 pl-4">
                {componentStatistics.map((component) => (
                  <SheetClose asChild key={component.title} onClick={() => closeMenus()}>
                    <Link to={component.href} className="py-2 px-4 hover:bg-accent rounded-md">
                      <div className="text-sm font-medium">{component.title}</div>
                      <p className="text-muted-foreground text-xs">{component.description}</p>
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <SheetClose asChild>
            <Link to="/areas" className="text-sm font-medium px-3 py-2 hover:bg-accent rounded-md">
              Areas
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
