import { Card } from "antd";
import { useState } from "react";

interface SoilCropFitItem {
  bjdCode: string;
  bjdNm: string;
  soilCropCode: string;
  soilCropNm: string;
  highSuitArea: string;
  suitArea: string;
  possArea: string;
  lowSuitArea: string;
  etcArea: string;
}

export default function CropSoilInfo() {
  const url: string =
    "http://apis.data.go.kr/1390802/SoilEnviron/SoilFitStat/getSoilCropFitInfo";
  let queryParams: string =
    "?" +
    encodeURIComponent("serviceKey") +
    "=" +
    "gqOFkbCIrB5kn5SVgm7ar7w7xh%2B5cOyzh02t%2BtP7WvHqaErq6Pt5ke52sCBNuVSYVOUCabVBKrxgAZGoIg3taQ%3D%3D";
  queryParams +=
    "&" +
    encodeURIComponent("BJD_Code") +
    "=" +
    encodeURIComponent("4571033024");
  queryParams +=
    "&" +
    encodeURIComponent("soil_Crop_Code") +
    "=" +
    encodeURIComponent("CR001");

  const [highSuitArea, sethighSuitArea] = useState<string>("");
  const [suitArea, setsuitArea] = useState<string>("");
  const [possArea, setpossArea] = useState<string>("");
  const [cropName, setcropName] = useState<string>("");

  fetch(url + queryParams)
    .then((response) => response.text())
    .then((xmlResponse) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
      const result = xmlDoc.querySelector("response body items item");

      const soilCropFitInfo = result
        ? {
            bjdCode: result.querySelector("bjd_Code")?.textContent,
            bjdNm: result.querySelector("bjd_Nm")?.textContent,
            soilCropCode: result.querySelector("soil_Crop_Code")?.textContent,
            soilCropNm: result.querySelector("soil_Crop_Nm")?.textContent,
            highSuitArea: result.querySelector("high_Suit_Area")?.textContent,
            suitArea: result.querySelector("suit_Area")?.textContent,
            possArea: result.querySelector("poss_Area")?.textContent,
            lowSuitArea: result.querySelector("low_Suit_Area")?.textContent,
            etcArea: result.querySelector("etc_Area")?.textContent,
          }
        : null;

      console.log(soilCropFitInfo);
      sethighSuitArea(soilCropFitInfo?.highSuitArea!);
      setsuitArea(soilCropFitInfo?.suitArea!);
      setpossArea(soilCropFitInfo?.possArea!);
      setcropName(soilCropFitInfo?.soilCropNm!);
    })
    .catch((error: Error) => {
      console.error("error??", error);
    });

  return (
    <Card title="Crop Soil Info" className="info-card">
      <p>토양적성 작물명: {cropName}</p>
      <p>최적지 면적(ha): {highSuitArea}</p>
      <p>적지 면적(ha): {suitArea}</p>
      <p>가능지 면적(ha): {possArea}</p>
    </Card>
  );
}
