import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const GradeA: React.FC = () => {
  return (
    <Title level={2} style={{ fontSize: "3rem", color: "#41B883" }}>
      A
    </Title>
  );
};

const GradeB: React.FC = () => {
  return (
    <Title level={2} style={{ fontSize: "3rem", color: "#E2C044" }}>
      B
    </Title>
  );
};

const GradeC: React.FC = () => {
  return (
    <Title level={2} style={{ fontSize: "3rem", color: "#3498DB" }}>
      C
    </Title>
  );
};

const GradeD: React.FC = () => {
  return (
    <Title level={2} style={{ fontSize: "3rem", color: "#E74C3C" }}>
      D
    </Title>
  );
};

export { GradeA, GradeB, GradeC, GradeD };
