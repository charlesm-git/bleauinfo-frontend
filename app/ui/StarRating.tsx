export function StarRating({ rating }: { rating: number }) {
  const percentage = (rating / 5) * 100;

  return (
    <div className="flex items-baseline gap-1">
      <div className="relative inline-block w-max">
        {/* Background: empty stars */}
        <div title={`${rating} / 5`} className="text-border text-sm md:text-lg">
          ★★★★★
        </div>

        {/* Foreground: filled stars clipped to rating */}
        <div
          title={`${rating} / 5`}
          className="absolute top-0 left-0 overflow-hidden text-primary text-sm md:text-lg"
          style={{ width: `${percentage}%` }}>
          ★★★★★
        </div>
      </div>
      <p className="text-muted-foreground text-[10px] md:text-sm">({rating}/5)</p>
    </div>
  );
}
