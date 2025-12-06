export interface Grade {
  id: number;
  value: string;
  correspondence: number;
}

export interface GradeDistribution {
  grade: Grade;
  boulders: number;
}

export interface GradeAscents {
  grade: Grade;
  ascents: number;
}
