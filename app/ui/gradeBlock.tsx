import { Skeleton } from "~/components/ui/skeleton";
import { BoulderCard, BoulderCardSkeleton } from "./boulderCard";
import { TypoH2 } from "./typography";

export function GradeBlock({ data }: { data: Record<string, any> }) {
  return (
    <div className="my-4">
      <TypoH2>{data.grade.value}</TypoH2>
      <div className="grid grid-cols-3 m-3 gap-3">
        {data.boulders.map((boulder: Record<string, any>) => (
          <BoulderCard key={boulder.id} boulder={boulder} />
        ))}
      </div>
    </div>
  );
}

export function GradeBlockSkeleton() {
  return (
    <div className="my-4">
      <Skeleton className="h-8 w-full rounded-full" />
      <div className="grid grid-cols-3 m-3 gap-3">
        <BoulderCardSkeleton />
        <BoulderCardSkeleton />
        <BoulderCardSkeleton />
      </div>
    </div>
  );
}
