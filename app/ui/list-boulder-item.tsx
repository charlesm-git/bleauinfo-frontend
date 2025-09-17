import { StarRating } from "./starRating";

export function BoulderAreaItem({ item }: { item: Record<string, any> }) {
  const boulder = item.boulder;
  return (
    <div className="grid grid-cols-12 gap-3">
      <a
        href={`/boulders/${boulder.id}`}
        className="col-span-5 text-sky-600 underline hover:text-sky-800">
        {boulder.name}
      </a>
      <a href={`/areas/${boulder.area.id}`} className="col-span-4">
        {boulder.area.name} {boulder.area.status && <strong>({boulder.area.status})</strong>}
      </a>
      <div className="col-span-2">
        <StarRating rating={boulder.rating} />
      </div>
      <div className="text-center">{item.ascents}</div>
    </div>
  );
}

export function BoulderGradeItem({ item }: { item: Record<string, any> }) {
  const boulder = item.boulder;
  return (
    <div className="grid grid-cols-12 gap-3">
      <a href={`/boulders/${boulder.id}`} className="col-span-5">
        {boulder.name}
      </a>
      <p className="col-span-4">
        {boulder.grade.value}{" "}
        {boulder.slash_grade && (
          <span className="italic text-neutral-400">/ {boulder.slash_grade.value}</span>
        )}
      </p>
      <div className="col-span-2">
        <StarRating rating={boulder.rating} />
      </div>
      <div className="text-center">{item.ascents}</div>
    </div>
  );
}
