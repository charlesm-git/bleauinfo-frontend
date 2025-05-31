export function StarRating({ rating }) {
    const percentage = (rating / 5) * 100;

    return (
        <div className="relative inline-block w-max">
            {/* Background: empty stars */}
            <div className="text-gray-300 text-xl">★★★★★</div>

            {/* Foreground: filled stars clipped to rating */}
            <div
                className="absolute top-0 left-0 overflow-hidden text-slate-700 text-xl"
                style={{ width: `${percentage}%` }}
            >
                ★★★★★
            </div>
        </div>
    );
  }