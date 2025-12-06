import { Area } from "./area";

export interface Region {
  id: number;
  name: string;
}

export interface RegionDetail {
  id: number;
  name: string;
  areas: Area[];
}
