import React, { useState, useRef, useEffect } from "react";

import { Row, Col, Button, Radio, Card } from "antd";
import MapComponent from "app/components/googleMapComponent";
import type { Crop } from "@prisma/client";
import type { LatLng } from "~/models/location.server";

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "400px",
  position: "relative",
};

const cardStyle: React.CSSProperties = {
  top: "10px", // Adjust the distance from the bottom as needed
  right: "10px", // Adjust the distance from the right as needed
  width: "250px",
  position: "absolute",
  zIndex: 1,
};

interface MapData {
  center: google.maps.LatLngLiteral;
  markers: MarkerData[];
}

interface MarkerData {
  position: google.maps.LatLngLiteral;
  selected: boolean;
}

const MapLocationComponent: React.FC = () => {
  const [cropHouseType, setCropHouseType] = useState<string>("ground");
  const [crops, setCrops] = useState<Crop[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<Crop>();
  // const [markers, setMarkers] = useState<LatLng[]>([]);
  const [selectedMarker, setSelectedMarker] = useState();
  // const [center, setCenter] = useState<LatLng>({ lat: 37.5665, lng: 126.978 });

  const [mapData, setMapData] = useState<MapData>({
    center: { lat: 37.7749, lng: -122.4194 },
    markers: [],
  });

  const { center, markers } = mapData;

  let tempCenter: LatLng = { lat: 37.5665, lng: 126.978 };

  const handleCenterChanged = (evt: any) => {
    tempCenter = { lat: evt.lat(), lng: evt.lng() };
  };

  const handleMarkerClicked = (idx: number) => {
    mapData.markers[idx].selected = true;
    mapData.markers.forEach((marker, index) => {
      if (index !== idx) {
        marker.selected = false;
      }
    });
    mapData.center = mapData.markers[idx].position;
    setMapData({ ...mapData });
  };

  const handleSearch = () => {
    const newMarkerData: MarkerData[] = [
      { position: { lat: 37.7449, lng: -122.3794 }, selected: false },
      { position: { lat: 37.7749, lng: -122.4094 }, selected: false },
      { position: { lat: 37.7949, lng: -122.4394 }, selected: false },
    ];

    console.log("map data", mapData);
    setMapData((prevData) => ({
      ...prevData,
      markers: newMarkerData,
      center:
        newMarkerData.length > 0 ? newMarkerData[0].position : prevData.center,
    }));
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={48} md={24}>
        <div>
          <Radio.Group
            onChange={(e) => setCropHouseType(e.target.value)}
            defaultValue="ground"
            value={cropHouseType}
          >
            <Radio.Button value="ground">노지재배</Radio.Button>
            <Radio.Button value="facility">시설재배</Radio.Button>
          </Radio.Group>
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Radio.Group
            size="large"
            onChange={(e) => setSelectedCrop(e.target.value)}
            defaultValue="strawberry"
            value={selectedCrop}
          >
            <Radio.Button value="strawberry">
              <img
                src="https://modo-phinf.pstatic.net/20180104_55/1515058237254fV4ed_JPEG/mosaljL6dZ.jpeg?type=round256_256"
                alt="딸기"
                style={{ marginRight: "8px", height: "20px" }}
              />
              딸기
            </Radio.Button>
            <Radio.Button value="facility">
              <img
                src="https://modo-phinf.pstatic.net/20181211_210/1544525804735qyiom_JPEG/mosaluSftX.jpeg?type=round256_256"
                alt="복숭아"
                style={{ marginRight: "8px", height: "20px" }}
              />
              복숭아
            </Radio.Button>
          </Radio.Group>
          <Button type="primary" size="large" onClick={handleSearch}>
            현 지도에서 검색
          </Button>
        </div>
      </Col>
      {/* <Col xs={16} md={8}>
        {markers.length > 0 && <div></div>}
      </Col> */}
      <Col xs={48} md={24}>
        <div style={containerStyle}>
          {markers.length > 0 && (
            <div style={cardStyle}>
              <Card title="Candidates">
                <p>Card content goes here</p>
              </Card>
            </div>
          )}
          <MapComponent
            center={center}
            markerData={markers}
            onCenterChanged={handleCenterChanged}
            onMarkerClick={handleMarkerClicked}
          />
        </div>
      </Col>
    </Row>
  );
};

export default MapLocationComponent;
