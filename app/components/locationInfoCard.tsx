import { Card } from "antd";
import type { Crop } from "@prisma/client";
import type { LocationWithRecord } from "~/models/location.server";
import SoilInformation from "./soilInfo";
import type { Soil } from "~/models/nature.server";

export interface SearchResult {
  id: number;
  crop: Crop;
  expectedProfit: number;
  fitness: number;
}

interface LocationProps {
  locationInfo: LocationWithRecord;
}

const LocationInfoCard: React.FC<LocationProps> = ({ locationInfo }) => {
  const soilInfo: Soil = {
    magnesium: 10,
    potassium: 20,
    calcium: 15,
    silicon: 8,
    phosphorus: 12,
    electricalConductivity: 5,
    organicMatter: 3,
    pH: 6.5,
    soilType: "Loam",
    gravel: 2,
    drainage: 4,
    soilHumidity10cm: 30,
    soilHumidity30cm: 40,
  };

  console.log("locationInfo", locationInfo.location.name);
  return (
    <div style={{ display: "block" }}>
      <SoilInformation soil={soilInfo} address={locationInfo.location.name} />
    </div>
  );
};

export default LocationInfoCard;
