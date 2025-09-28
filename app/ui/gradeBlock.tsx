import { Link } from "react-router";
import { BoulderCard } from "./boulderCard";
import { TypoH2 } from "./typography";

export function GradeBlock({ data }: { data: Record<string, any> }) {
  return (
    <div className="my-4">
      <TypoH2>{data.grade.value}</TypoH2>
      <div className="grid grid-cols-2 m-3 gap-3">
        {data.boulders.map((boulder: Record<string, any>) => (
          <Link to={`/boulders/${boulder.id}`}>
            <BoulderCard
              key={boulder.id}
              name={boulder.name}
              area={boulder.area}
              grade={boulder.grade}
              slash_grade={boulder.slash_grade}
              rating={boulder.rating}
              ascents={boulder.ascents}
              styles={boulder.styles}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
