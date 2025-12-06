import { BoulderWithAscentCount } from "./boulder";
import { Area } from "./area";

export interface SearchBoulderArea {
  boulders: BoulderWithAscentCount[];
  areas: Area[];
}
