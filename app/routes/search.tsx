import type { Route } from "./+types/search.tsx";
import { MainLayout } from "../ui/mainLayout";
import { GetRequest } from "~/data/data.js";
import config from "~/config";
import { TypoH1, TypoH2 } from "~/ui/typography.js";
import { AreaBadge } from "~/ui/areaBadge.js";
import { BoulderTableSearch } from "~/ui/BoulderTableSearch.js";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchText = url.searchParams.get("q") || "";

  if (!searchText.trim()) {
    return { boulders: [], areas: [], searchText: "" };
  }

  let data = await GetRequest(`${config.baseUrl}/search?q=${encodeURIComponent(searchText)}`);
  return { ...data, searchText };
}

export default function Search({ loaderData }: Route.ComponentProps) {
  const { boulders, areas, searchText } = loaderData;

  return (
    <MainLayout>
      <TypoH1>
        Search result for: <span className="text-primary">{searchText}</span>
      </TypoH1>
      {boulders.length === 0 && areas.length === 0 && (
        <TypoH2 className="text-center text-muted-foreground border-none">No result found</TypoH2>
      )}
      {boulders.length > 0 && (
        <div className="mb-16">
          <TypoH2 className="border-none">Boulders</TypoH2>
          <BoulderTableSearch boulders={boulders} />
        </div>
      )}
      {areas.length > 0 && (
        <div className="">
          <TypoH2 className="border-none">Areas</TypoH2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6">
            {areas.map((area: Record<string, any>) => (
              <AreaBadge key={area.id} area={area} />
            ))}
          </div>
        </div>
      )}
    </MainLayout>
  );
}
