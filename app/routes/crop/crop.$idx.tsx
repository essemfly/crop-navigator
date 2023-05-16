import type { Crop } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import { getStrawberry } from "~/models/crop.server";

export async function action({ request, params }: ActionArgs) {
  const strawberry: Crop = await getStrawberry();
  return strawberry;
}
