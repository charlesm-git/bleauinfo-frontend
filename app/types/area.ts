import { Region } from "./region";
import { Grade, GradeDistribution } from "./grade";
import { BoulderWithAscentCount } from "./boulder";

export interface Area {
  id: number;
  name: string;
  url: string;
  status: string | null;
  region_id: number;
}

export interface AreaDetail {
  id: number;
  name: string;
  url: string;
  status: string | null;
  region: Region;
}

export interface AreaStats {
  area: AreaDetail;
  number_of_boulders: number;
  average_grade: Grade | null;
  ascents: number;
  grade_distribution: GradeDistribution[];
  most_climbed_boulders: BoulderWithAscentCount[];
  best_rated_boulders: BoulderWithAscentCount[];
}

export interface AreaCount {
  area: Area;
  count: number;
}
