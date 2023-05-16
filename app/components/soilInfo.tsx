import React from "react";
import { Card, Row, Col, Typography } from "antd";
import type { Soil } from "~/models/nature.server";

const { Text } = Typography;

interface LocationSoil {
  soil: Soil;
  address: string;
}

const SoilInformation: React.FC<LocationSoil> = ({ soil, address }) => {
  return (
    <Card
      title={address}
      className={`crop-card location-card`}
      bordered={false}
    >
      <Row gutter={16}>
        <Col span={3}>
          <Text strong>Mg:</Text> {soil.magnesium}
        </Col>
        <Col span={3}>
          <Text strong>K:</Text> {soil.potassium}
        </Col>
        <Col span={3}>
          <Text strong>Ca:</Text> {soil.calcium}
        </Col>
        <Col span={3}>
          <Text strong>Si:</Text> {soil.silicon}
        </Col>
        <Col span={3}>
          <Text strong>P:</Text> {soil.phosphorus}
        </Col>
        <Col span={3}>
          <Text strong>El:</Text> {soil.electricalConductivity}
        </Col>
        <Col span={3}>
          <Text strong>pH:</Text> {soil.pH}
        </Col>
        <Col span={3}>
          <Text strong>Drainage:</Text> {soil.drainage}
        </Col>
      </Row>
      <Row gutter={16}>
        {/* <Col span={4}>
          <Text strong>OrganicMatter:</Text> {soil.organicMatter}
        </Col> */}
        <Col span={4}>
          <Text strong>SoilType:</Text> {soil.soilType}
        </Col>
        <Col span={4}>
          <Text strong>Gravel:</Text> {soil.gravel}
        </Col>
        <Col span={4}>
          <Text strong>Hum 10:</Text> {soil.soilHumidity10cm}
        </Col>
        <Col span={4}>
          <Text strong>Hum 30:</Text> {soil.soilHumidity30cm}
        </Col>
      </Row>
    </Card>
  );
};

export default SoilInformation;
