import { LucideIcon } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { TypoP } from "./Typography";
import { Skeleton } from "~/components/ui/skeleton";

interface StatGadgeProps {
  Icon: LucideIcon;
  content: string;
  value: string;
}

export function StatBadge({ Icon, content, value }: StatGadgeProps) {
  return (
    <Badge variant="stat" className="px-6 py-4 text-base gap-2">
      <Icon className="mr-3 text-primary" />
      <span>
        <TypoP className="font-bold text-xl">{value}</TypoP>
      </span>
      <span>
        <TypoP className="text-sm">{content}</TypoP>
      </span>
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
