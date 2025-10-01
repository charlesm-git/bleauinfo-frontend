import type { Route } from "./+types/home";
import { MainLayout } from "../ui/mainLayout";
import { useEffect, useState } from "react";

import { Command, CommandInput, CommandList, CommandItem } from "~/components/ui/command";
import { GetRequest, PostRequest as PostRequestRecommendation } from "~/data/data";
import config from "~/config";
import { Button } from "~/components/ui/button";
import { Info, X } from "lucide-react";
import { BoulderCard, BoulderCardSkeleton } from "~/ui/boulderCard";
import { TypoH1, TypoH2, TypoP } from "~/ui/typography";
import { BoulderBadge } from "~/ui/boulderBadge";
import { PaginationControl } from "~/ui/paginationControl";
import { toast, Toaster } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { MarkdownContent } from "~/ui/markdownContent";

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false);

  // Calculate pagination
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(recommendations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedRecommendations = recommendations.slice(startIndex, endIndex);

  const resetEntry = () => {
    setBoulderSuggestions([]);
    setText("");
  };

  const selectBoulder = (boulder: Record<string, any>) => {
    if (!bouldersSelected.includes(boulder)) {
      setBouldersSelected([...bouldersSelected, boulder]);
    }
    setText("");
  };

  const unselectBoulder = (boulder: Record<string, any>) => {
    setBouldersSelected(bouldersSelected.filter((item) => item !== boulder));
  };

  const clearAll = () => {
    setBouldersSelected([]);
    setRecommendations([]);
    setBoulderSuggestions([]);
    setText("");
  };

  const getRecommendations = async () => {
    if (bouldersSelected.length === 0) {
      toast.info("Select some boulders first", {
        description: "Search for climbs you've enjoyed to get recommendations",
      });
      return;
    }
    setIsLoadingRecommendation(true);
    const boulderIDs = bouldersSelected.map((boulder) => boulder.id);
    const boulders = await PostRequestRecommendation(
      `${config.baseUrl}/recommendation`,
      boulderIDs
    );
    if (boulders) {
      setRecommendations(boulders);
      setCurrentPage(1);
    }
    setIsLoadingRecommendation(false);
  };

  useEffect(() => {
    if (!text.trim()) {
      setBoulderSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const fetchedBoulders = await GetRequest(
          `${config.baseUrl}/recommendation/selection?q=${text}`
        );
        setBoulderSuggestions(fetchedBoulders);
      } catch (error) {
        console.error("Search failed:", error);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <MainLayout>
      <div className="flex gap-5 items-end justify-center mb-6">
        {/* Title with tooltip */}
        <TypoH1 className="mb-0">Recommender</TypoH1>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost">
              <Info />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <TypoP className="text-sm">
              Find boulders similar to ones you've climbed based on ascents, styles, and grades.
            </TypoP>
          </TooltipContent>
        </Tooltip>
      </div>
      {/* Description Accordion */}
      <Accordion type="single" collapsible className="mb-5">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <TypoH2 className="mb-0 text-lg border-none">How it works</TypoH2>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance w-full">
            <MarkdownContent contentKey="recommender" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* Command window for climb search and selection */}
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
      {/* List of selected boulders */}
      {bouldersSelected.length > 0 && (
        <div className="flex flex-row gap-2 my-4 flex-wrap">
          {bouldersSelected.map((boulder) => (
            <BoulderBadge
              key={boulder.id}
              boulder={boulder}
              onClick={() => unselectBoulder(boulder)}
            />
          ))}
        </div>
      )}
      <div className="flex justify-center my-5 gap-10">
        <Button size="lg" className="" onClick={getRecommendations}>
          Recommend
        </Button>
        <Button variant="destructive" size="lg" onClick={clearAll}>
          Reset
        </Button>
      </div>
      {/* List of recommended boulders with pagination control */}
      {isLoadingRecommendation && (
        <div className="mt-8">
          <TypoH2>
            Recommendations: {currentPage}/{totalPages}
          </TypoH2>
          <div className="grid grid-cols-2 m-3 gap-3">
            {Array.from({ length: 10 }).map((_, index) => (
              <BoulderCardSkeleton key={index} />
            ))}
          </div>
        </div>
      )}
      {recommendations.length > 0 && !isLoadingRecommendation && (
        <div className="mt-8">
          <TypoH2>
            Recommendations: {currentPage}/{totalPages}
          </TypoH2>
          <div className="grid grid-cols-2 m-3 gap-3">
            {paginatedRecommendations.map((boulder) => (
              <a href={`/boulders/${boulder.id}`} target="_blank" rel="noopener noreferrer">
                <BoulderCard
                  key={boulder.id}
                  boulder={boulder}
                  showAddToSelection
                  onAddToSelection={selectBoulder}
                />
              </a>
            ))}
          </div>
          {recommendations.length > 10 && (
            <PaginationControl
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      )}
      <Toaster position="top-center" closeButton />
    </MainLayout>
  );
}
