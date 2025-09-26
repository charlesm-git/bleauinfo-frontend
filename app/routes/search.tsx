import type { Route } from "./+types/search.tsx";
import { MainLayout } from "../ui/mainLayout";
import { FetchData } from "~/data/data.js";
import config from "~/config";
import { TypoH1, TypoH2 } from "~/ui/typography.js";
import { AreaBadge } from "~/ui/areaBadge.js";
import { BoulderTableSearch } from "~/ui/boulderTable.js";
import { useParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  let data = await FetchData(`${config.baseUrl}/search/${params.text}`);
  return data;
}

export default function Search({ loaderData }: Route.ComponentProps) {
  const { boulders, areas } = loaderData;
  const params = useParams();
  const searchText = params.text;
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
