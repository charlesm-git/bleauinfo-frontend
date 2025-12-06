import { Area } from "./area";
import { Grade } from "./grade";
import { AscentRead, AscentsPerMonthWithGeneral } from "./ascent";
import { Style } from "./style";

export interface Boulder {
  id: number;
  name: string;
  rating: number | null;
  number_of_rating: number;
  url: string;
}

export interface BoulderWithFullDetail extends Boulder {
  grade: Grade;
  slash_grade: Grade | null;
  area: Area;
  styles: Style[];
  ascents: AscentRead[];
  aggregated_ascents: AscentsPerMonthWithGeneral[];
}

export interface BoulderWithAscentCount extends Boulder {
  grade: Grade;
  slash_grade: Grade | null;
  area: Area;
  styles: Style[];
  ascents: number;
}

export interface BoulderByGrade {
  grade: Grade;
  boulders: BoulderWithAscentCount[];
}
