import { useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

import * as React from "react";

import { Link } from "react-router";
import { Search } from "lucide-react";

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

function NavMenu() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/">Home</Link>
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
            <Link to="/areas">Areas list</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
                <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/recommender">Recommender</Link>
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
          <Search className=""/>
        </Button>
      </div>
    </form>
  );
}

export function NavBar() {
  return (
    <nav className="sticky top-0 z-[100] mb-8 py-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between">
          <NavMenu />
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
