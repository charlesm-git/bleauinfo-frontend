import type { Route } from "./+types/home";
import { MainLayout } from "../ui/mainLayout";
import { useEffect, useState } from "react";

import { Command, CommandInput, CommandList, CommandItem } from "~/components/ui/command";
import { GetRequest, PostRequest } from "~/data/data";
import config from "~/config";
import { Button } from "~/components/ui/button";
import { X } from "lucide-react";
import { BoulderCard } from "~/ui/boulderCard";
import { TypoH1, TypoH2 } from "~/ui/typography";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Recommender() {
  const [text, setText] = useState<string>("");
  const [boulderSuggestions, setBoulderSuggestions] = useState<Record<string, any>[]>([]);
  const [bouldersSelected, setBouldersSelected] = useState<Record<string, any>[]>([]);
  const [recommendations, setRecommendations] = useState<Record<string, any>[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const resetEntry = () => {
    setBoulderSuggestions([]);
    setText("");
  };

  const selectBoulder = (boulder: Record<string, any>) => {
    if (!bouldersSelected.includes(boulder)) {
      setBouldersSelected([...bouldersSelected, boulder]);
    }
  };

  const unselectBoulder = (boulder: Record<string, any>) => {
    setBouldersSelected(bouldersSelected.filter((item) => item !== boulder));
  };

  const clearAll = () => {
    setBouldersSelected([]);
    setRecommendations([]);
    setBoulderSuggestions([]);
    setText("")
  };

  const getRecommendations = async () => {
    if (bouldersSelected.length === 0) {
      return;
    }
    setIsLoading(true);
    const boulderIDs = bouldersSelected.map((boulder) => boulder.id);
    const boulders = await PostRequest(`${config.baseUrl}/recommendation/`, boulderIDs);
    if (boulders) {
      setRecommendations(boulders);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!text.trim()) {
      setBoulderSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const fetchedBoulders = await GetRequest(
          `${config.baseUrl}/recommendation/selection?q=${text}`
        );
        setBoulderSuggestions(fetchedBoulders);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <MainLayout>
      <TypoH1>Recommender</TypoH1>
      <Command className="rounded-lg border shadow-md md:min-w-[450px] p-5" shouldFilter={false}>
        <div className="flex flex-row justify-between">
          <CommandInput
            placeholder="Search for boulders"
            onValueChange={setText}
            value={text}
            wrapperClassName="flex-1"
          />
          {text && (
            <Button variant="ghost" onClick={resetEntry}>
              <X />
            </Button>
          )}
        </div>
        <CommandList>
          {boulderSuggestions.map((boulder: Record<string, any>) => (
            <CommandItem
              key={boulder.id}
              className="mx-2 my-1 flex flex-row gap-8 p-2 mt-2 cursor-pointer"
              onSelect={() => selectBoulder(boulder)}>
              <span className="font-bold">{boulder.name}</span>
              {boulder.slash_grade ? (
                <span className="italic text-muted-foreground">
                  {boulder.grade.value}/{boulder.slash_grade.value}
                </span>
              ) : (
                <span className="italic text-muted-foreground">{boulder.grade.value}</span>
              )}
              <span>{boulder.area.name}</span>
            </CommandItem>
          ))}
        </CommandList>
      </Command>
      <div className="flex justify-center my-5 gap-10">
        <Button size="lg" className="" onClick={getRecommendations}>
          Recommend
        </Button>
        <Button variant="destructive" size="lg" onClick={clearAll}>
          Reset
        </Button>
      </div>
      {recommendations.length > 0 && (
        <div className="mt-8">
          <TypoH2>Recommendations</TypoH2>
          <div className="grid grid-cols-2 m-3 gap-3">
            {recommendations.map((boulder) => (
              <a href={`/boulders/${boulder.id}`} target="_blank" rel="noopener noreferrer">
                <BoulderCard
                  key={boulder.id}
                  name={boulder.name}
                  area={boulder.area}
                  grade={boulder.grade}
                  slash_grade={boulder.slash_grade}
                  rating={boulder.rating}
                  styles={boulder.styles}
                  ascents={boulder.ascents}
                />
              </a>
            ))}
          </div>
        </div>
      )}
      {bouldersSelected.length > 0 && (
        <div className="mt-8">
          <TypoH2>Boulders selected</TypoH2>
          <div className="grid grid-cols-2 m-3 gap-3">
            {bouldersSelected.map((boulder) => (
              <BoulderCard
                key={boulder.id}
                name={boulder.name}
                area={boulder.area}
                grade={boulder.grade}
                slash_grade={boulder.slash_grade}
                rating={boulder.rating}
                styles={boulder.styles}
                ascents={boulder.ascents}
                onClick={() => unselectBoulder(boulder)}
              />
            ))}
          </div>
        </div>
      )}
    </MainLayout>
  );
}
