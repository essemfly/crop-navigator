import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { getAvailableCrops } from "~/models/serachResults.server";
import type { SearchResult } from "app/components/searchResultCard";

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();
  const lat = formData.get("lat");
  const lng = formData.get("lng");

  const suggestedCrops: SearchResult[] = await getAvailableCrops(
    parseFloat(lat!.toString()),
    parseFloat(lng!.toString())
  );
  return suggestedCrops;
}

function CropsPage() {
  return <h2>Rovers Crop Navigator</h2>;
}

export default CropsPage;
