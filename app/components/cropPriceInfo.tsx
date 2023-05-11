import { Card } from "antd";

export default function CropPriceInfo() {
  return (
    <Card title="Crop Price Info" className="info-card">
      <iframe
        style={{ width: "100%", height: "30vh" }}
        src="https://www.nongnet.or.kr/front/M000000250/content/view.do#lineChartForcast"
      ></iframe>
    </Card>
  );
}
