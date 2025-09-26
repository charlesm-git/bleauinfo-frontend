import { LucideIcon } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { TypoP } from "./typography";

interface StatGadgeProps {
  Icon: LucideIcon;
  content: string;
  value: string;
}

export function StatBadge({ Icon, content, value}: StatGadgeProps) {
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
