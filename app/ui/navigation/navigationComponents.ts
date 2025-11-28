interface NavigationComponents {
  title: string;
  href: string;
  description: string;
}

export const componentTop: NavigationComponents[] = [
  {
    title: "Best rated",
    href: "/best-rated",
    description: "Best rated boulders per grade.",
  },
  {
    title: "Most ascents",
    href: "/most-ascents",
    description: "Top 10 most repeated boulders per grade.",
  },
];

export const componentStatistics: NavigationComponents[] = [
  {
    title: "Grade Analytics",
    href: "/statistics/grade",
    description: "Insights on the grade repartition & grade based ascents",
  },
  {
    title: "Time Analytics",
    href: "/statistics/time",
    description: "Insights of ascents over the years and each month",
  },
  {
    title: "Area Analytics",
    href: "/statistics/area",
    description: "Presentation of most popular areas",
  },
  {
    title: "Style Analytics",
    href: "/statistics/style",
    description: "Most common styles in the forest",
  },
];
