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
    <Badge variant="secondary" className="flex gap-4 py-1.5 px-3">
      <div className="flex gap-2 items-end ms-2">
        <span className="font-bold text-sm">{boulder.name}</span>
        {!boulder.slash_grade ? (
          <span className="italic text-xs">{boulder.grade.value}</span>
        ) : (
          <span className="italic">
            {boulder.grade.value}/{boulder.slash_grade.value}
          </span>
        )}
      </div>
      <Button variant="ghost" size="icon" className="hover:bg-background hover:text-foreground" onClick={onClick}>
        <X />
      </Button>
    </Badge>
  );
}
