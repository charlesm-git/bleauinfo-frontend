import { X } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";
import { BoulderWithAscentCount } from "~/types/boulder";
import React from "react";
import { useMediaQuery } from "~/lib/hook/useMediaQuery";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";

export function BoulderBadge({
  boulder,
  onClick,
}: {
  boulder: BoulderWithAscentCount;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { isMobile } = useMediaQuery();

  return !isMobile ? (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>
          <BoulderBadgeTrigger boulder={boulder} onClick={onClick} />
        </div>
      </HoverCardTrigger>
      <HoverCardContent align="start" sideOffset={10}>
        <BoulderBadgeContent boulder={boulder} />
      </HoverCardContent>
    </HoverCard>
  ) : (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          <BoulderBadgeTrigger boulder={boulder} onClick={onClick} />
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={10} className="w-72">
        <BoulderBadgeContent boulder={boulder} />
      </PopoverContent>
    </Popover>
  );
}

function BoulderBadgeTrigger({
  boulder,
  onClick,
}: {
  boulder: BoulderWithAscentCount;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Badge variant="secondary" className="flex gap-1 md:gap-3 py-1 px-3 max-w-full">
      <div className="flex flex-1 gap-2 items-end ms-2 min-w-0 text-xs md:text-sm font-bold text-wrap break-words">
        {boulder.name}
      </div>
      {!boulder.slash_grade ? (
        <span className="italic text-[10px] md:text-xs whitespace-nowrap">
          {boulder.grade.value}
        </span>
      ) : (
        <span className="italic text-[10px] md:text-xs whitespace-nowrap">
          {boulder.grade.value}/{boulder.slash_grade.value}
        </span>
      )}
      <Button
        variant="ghost"
        size="mobileicon"
        className="hover:bg-background hover:text-foreground"
        onClick={onClick}>
        <X />
      </Button>
    </Badge>
  );
}

function BoulderBadgeContent({ boulder }: { boulder: BoulderWithAscentCount }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 text-xs">
        <div className="flex flex-col gap-2 flex-1">
          <span className="font-bold">{boulder.name}</span>
          <span className="flex-1 text-muted-foreground">{boulder.area.name}</span>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant="secondary">
            <span>{boulder.grade.value}</span>
            {boulder.slash_grade && <span>/{boulder.slash_grade.value}</span>}
          </Badge>
          <span>{boulder.ascents} ascents</span>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {boulder.styles.length > 0 &&
          boulder.styles.map((style) => <Badge variant="outline">{style.style}</Badge>)}
      </div>
    </div>
  );
}
