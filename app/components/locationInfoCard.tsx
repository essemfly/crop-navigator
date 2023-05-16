import { Card } from "antd";
import type { Crop } from "@prisma/client";
import type { LocationWithRecord } from "~/models/location.server";

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
  return (
    <Card className={`crop-card location-card`} style={{ marginBottom: 10 }}>
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: 16 }}>
          <h2 style={{ marginBottom: 5 }}>{locationInfo.location.name}</h2>
          <p>평균습도: info fix required</p>
          <p>평균강수량: info fix required</p>
          <p>평균온도: info fix required</p>
          <p>연평균최소기온: info fix required</p>
          <p>연평균최고기온: info fix required</p>
        </div>
      </div>
    </Card>
  );
};

export default LocationInfoCard;
