import { Skeleton } from "~/components/ui/skeleton";
import { BoulderCard, BoulderCardSkeleton } from "./BoulderCard";
import { TypoH2 } from "./Typography";

export function GradeBlock({ data }: { data: Record<string, any> }) {
  return (
    <section id={`grade-${data.grade.value}`} className="my-4 scroll-mt-16">
      <TypoH2>{data.grade.value}</TypoH2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 m-3 gap-3">
        {data.boulders.map((boulder: Record<string, any>) => (
          <BoulderCard key={boulder.id} boulder={boulder} />
        ))}
      </div>
    </section>
  );
}

export function GradeBlockSkeleton() {
  return (
    <div className="my-4">
      <Skeleton className="h-8 w-full rounded-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3 m-3 gap-3">
        <BoulderCardSkeleton />
        <BoulderCardSkeleton />
        <BoulderCardSkeleton />
      </div>
    </div>
  );
}
