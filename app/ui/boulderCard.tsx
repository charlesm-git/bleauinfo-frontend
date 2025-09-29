import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { BarChart, ExternalLink, MoreVertical, Plus, TrendingUp } from "lucide-react";
import { StarRating } from "./starRating";
import { TypoH3 } from "./typography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import { Dispatch, SetStateAction } from "react";

interface BoulderItemProps {
  boulder: Record<string, any>;
  showAddToSelection?: boolean;
  onAddToSelection?: Dispatch<SetStateAction<Record<string, any>>>;
}

export function BoulderCard({
  boulder,
  showAddToSelection = false,
  onAddToSelection,
}: BoulderItemProps) {
  return (
    <Card className="flex-1 hover:shadow-lg transition-shadow relative">
      <CardContent className="">
        {/* Single column vertical layout */}
        <div className="flex flex-col gap-3">
          {/* Name + Area */}
          <div className="flex gap-2 justify-between">
            <div className="flex-1">
              <TypoH3 className="font-semibold text-lg mb-0">{boulder.name}</TypoH3>
              <p className="text-sm text-muted-foreground">{boulder.area.name}</p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" onClick={(e) => e.stopPropagation()}>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={`/boulders/${boulder.id}`}>
                      <BarChart className="h-4 w-4 mr-2" />
                      View statistics
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href={boulder.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open on Bleau.info
                    </a>
                  </DropdownMenuItem>
                  {showAddToSelection && onAddToSelection && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToSelection(boulder);
                        }}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add to selection
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Grade + Ascents inline */}
          <div className="flex items-center gap-3">
            {boulder.grade && (
              <Badge variant="secondary" className="text-sm">
                {boulder.grade.value}
                {boulder.slash_grade ? `/${boulder.slash_grade.value}` : ""}
              </Badge>
            )}
            {boulder.ascents !== null && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>{boulder.ascents} ascents</span>
              </div>
            )}
          </div>

          {/* Rating */}
          <StarRating rating={boulder.rating} />

          {/* Styles */}
          {boulder.styles && boulder.styles.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {boulder.styles.map((style: Record<string, any>) => (
                <Badge key={style.id} variant="outline">
                  {style.style}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
