import { User } from "./user";

export interface Ascent {
  boulder_id: number;
  user_id: number;
  log_date: string;
}

export interface AscentRead {
  user: User;
  log_date: string;
}

export interface AscentsPerMonth {
  month: string;
  percentage: number;
}

export interface AscentsPerMonthWithGeneral {
  month: string;
  boulder: number;
  general: number;
}

export interface AscentsPerYear {
  year: string;
  ascents: number;
}
