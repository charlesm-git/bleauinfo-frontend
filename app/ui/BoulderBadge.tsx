import { X } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

export function BoulderBadge({
  boulder,
  onClick,
}: {
  boulder: Record<string, any>;
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
