import { LucideIcon } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { TypoP } from "./Typography";
import { Skeleton } from "~/components/ui/skeleton";

interface StatGadgeProps {
  Icon: LucideIcon;
  value: string;
  content?: string;
}

export function StatBadge({ Icon, value, content }: StatGadgeProps) {
  return (
    <Badge
      variant="stat"
      className={`px-4 py-2 md:px-6 md:py-4 text-base ${content ? "gap-2" : "gap-4"}`}>
      <Icon className="mr-3 text-primary" />
      <span>
        <TypoP className="font-bold">{value}</TypoP>
      </span>
      {content && (
        <span>
          <TypoP>{content}</TypoP>
        </span>
      )}
    </Badge>
  );
}

export function StatBadgeSkeleton() {
  return (
    <Badge variant="stat" className="px-6 py-4 gap-2">
      <Skeleton className="h-6 w-6 rounded-full" />
      <Skeleton className="h-5 w-20 rounded-full bg-ring/30" />
      <Skeleton className="h-4 w-12 rounded-full bg-ring/30" />
    </Badge>
  );
}
