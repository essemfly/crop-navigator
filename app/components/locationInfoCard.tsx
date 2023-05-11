import { Card } from "antd";
import type { Crop } from "@prisma/client";
import type { Location } from "~/models/location.server";

export interface SearchResult {
  id: number;
  crop: Crop;
  expectedProfit: number;
  fitness: number;
}

interface LocationProps {
  locationInfo: Location;
}

const LocationInfoCard: React.FC<LocationProps> = ({ locationInfo }) => {
  return (
    <Card className={`crop-card location-card`} style={{ marginBottom: 10 }}>
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: 16 }}>
          <h2 style={{ marginBottom: 5 }}>{locationInfo.name}</h2>
          <p>평균습도: {locationInfo.avgYearHumitidy}</p>
          <p>평균강수량: {locationInfo.avgYearRainfall}</p>
          <p>평균온도: {locationInfo.avgYearTemp}</p>
          <p>연평균최소기온: {locationInfo.lowestTemp}</p>
          <p>연평균최고기온: {locationInfo.highestTemp}</p>
        </div>
      </div>
    </Card>
  );
};

export default LocationInfoCard;
