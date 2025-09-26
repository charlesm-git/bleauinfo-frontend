import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { StarRating } from "./starRating";
import { TypoH3 } from "./typography";

interface BoulderItemProps {
  name: string;
  area: Record<string, string>;
  rating: number;
  ascents: number;
  grade: Record<string, any>;
  slash_grade?: Record<string, any>;
  styles?: Record<string, string>[];
}

export function BoulderCard({
  name,
  area,
  rating,
  ascents,
  grade,
  slash_grade,
  styles,
}: BoulderItemProps) {
  return (
    <Card className="flex-1 hover:shadow-lg transition-shadow">
      <CardContent className="">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <TypoH3 className="font-semibold text-lg mb-1">{name}</TypoH3>
            <p className="text-sm text-muted-foreground mb-2">{area.name}</p>
            <div className="flex items-center gap-1">
              <StarRating rating={rating}></StarRating>
            </div>
          </div>
          <div className="text-right space-y-2">
            {grade && (
              <Badge variant="secondary" className="">
                {grade.value}
                {slash_grade ? `/${slash_grade.value}` : ""}
              </Badge>
            )}
            <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>{ascents} ascents</span>
            </div>
            <div className="flex gap-1">
              {styles && styles.map((style) => <Badge variant="outline">{style.style}</Badge>)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
