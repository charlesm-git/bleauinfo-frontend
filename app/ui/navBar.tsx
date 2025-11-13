import { useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

import * as React from "react";

import { Link } from "react-router";
import { Search, Menu, ChevronDown } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";

interface NavigationComponents {
  title: string;
  href: string;
  description: string;
}

const componentTop: NavigationComponents[] = [
  {
    title: "Best rated",
    href: "/best-rated",
    description: "Best rated boulders per grade.",
  },
  {
    title: "Most ascents",
    href: "/most-ascents",
    description: "Top 10 most repeated boulders per grade.",
  },
];

const componentStatistics: NavigationComponents[] = [
  {
    title: "Grade Analytics",
    href: "/statistics/grade",
    description: "Insights on the grade repartition & grade based ascents",
  },
  {
    title: "Time Analytics",
    href: "/statistics/time",
    description: "Insights of ascents over the years and each month",
  },
  {
    title: "Area Analytics",
    href: "/statistics/area",
    description: "Presentation of most popular areas",
  },
  {
    title: "Style Analytics",
    href: "/statistics/style",
    description: "Most common styles in the forest",
  },
];

function NavMenuDesktop() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/recommender">Recommender</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Tops</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-2 md:w-[250px] md:grid-cols-1 lg:w-[300px]">
              {componentTop.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Statistics</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {componentStatistics.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/areas">Areas</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

function SearchBar() {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputRef.current?.blur();
    if (text.trim()) {
      navigate(`/search?q=${encodeURIComponent(text)}`);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-full max-w-sm items-center gap-2">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit">
          <Search className="" />
        </Button>
      </div>
    </form>
  );
}

function NavMenuMobile() {
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
          <Menu className="h-5 w-5" />
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

export function NavBar() {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="sticky top-0 z-[100] mb-8 py-4 bg-background hidden md:block">
        <div className="w-full md:w-2xl lg:w-3xl xl:w-5xl mx-auto">
          <div className="flex justify-between">
            <NavMenuDesktop />
            <div className="flex gap-4">
              <SearchBar />
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="sticky top-0 z-[100] mb-2 md:mb-8 py-4 bg-background md:hidden">
        <div className="px-4">
          <div className="flex justify-between items-center gap-4">
            <NavMenuMobile />
            <div className="flex gap-2 items-center flex-1 justify-end">
              <SearchBar />
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
