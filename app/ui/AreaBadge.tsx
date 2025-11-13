import { ChevronRight, MapPin } from "lucide-react";

export function AreaBadge({ area }: { area: Record<string, any> }) {
  return (
    <a
      key={area.id}
      href={`/areas/${area.id}`}
      className="group flex items-center justify-between gap-2 px-4 py-2 rounded-lg hover:bg-accent border border-border transition-all duration-200 hover:scale-103 hover:shadow-md">
      <div className="flex items-center gap-3 min-w-0">
        <MapPin className="h-3 w-3 text-muted-foreground group-hover:text-accent-foreground transition-all" />
        <span className="text-sm font-medium text-foreground group-hover:text-accent-foreground transition-colors">
          {area.name}
        </span>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground group-hover:translate-x-1 transition-all" />
    </a>
  );
}