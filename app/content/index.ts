import statisticsGradeDistrib from "./statistics/grade-distribution.md?raw";
import statisticsGradeAscent from "./statistics/grade-ascent-distribution.md?raw";
import statisticsStyle from "./statistics/style.md?raw";
import statisticsTimeMonth from "./statistics/time-month.md?raw";
import statisticsTimeYear from "./statistics/time-year.md?raw";
import statisticsArea from "./statistics/area.md?raw";
import home from "./home.md?raw";

export const content = {
  "home": home,
  "statistics.area": statisticsArea,
  "statistics.grade.ascent": statisticsGradeAscent,
  "statistics.grade.distribution": statisticsGradeDistrib,
  "statistics.style": statisticsStyle,
  "statistics.time.month": statisticsTimeMonth,
  "statistics.time.year": statisticsTimeYear,
} as const;

export type ContentKey = keyof typeof content;

export const getContent = (key: ContentKey): string => content[key];
