import type { ActionArgs } from "@remix-run/node";
import { getAvailableCrops } from "~/models/score.server";
import type { SearchResult } from "~/models/score.server";

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
