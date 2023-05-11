import { Row, Col } from "antd";
import CropPriceInfo from "./cropPriceInfo";
import CropClimateInfo from "./cropClimateInfo";
import CropSoilInfo from "./cropSoilInfo";
import type { Crop } from "@prisma/client";

interface CropInfoProps {
  location: Location;
  crop: Crop;
}

export default function CropInfo() {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <CropPriceInfo />
      </Col>
      <Col span={24}>
        <CropSoilInfo />
      </Col>
    </Row>
  );
}
