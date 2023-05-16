import React, { useState } from "react";

import { Row, Col, Button, Radio, Card, List } from "antd";
import MapComponent from "app/components/googleMapComponent";
import type { Crop } from "@prisma/client";
import type { LocationWithRecord } from "~/models/location.server";
import LocationScoreCard from "~/components/locationScoreCard";
import type { Score } from "~/models/score.server";
import { makeGradeIcon } from "~/components/grade";

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "400px",
  position: "relative",
};

const cardStyle: React.CSSProperties = {
  top: "10px", // Adjust the distance from the bottom as needed
  right: "10px", // Adjust the distance from the right as needed
  width: "300px",
  maxHeight: "55vh",
  overflow: "scroll",
  position: "absolute",
  zIndex: 1,
};

const bottomCardStyle: React.CSSProperties = {
  bottom: "10px", // Adjust the distance from the bottom as needed
  width: "60vh",
  maxHeight: "10vh",
  overflow: "scroll",
  position: "absolute",
  zIndex: 1,
};

const newMarkerData: MarkerData[] = [
  {
    position: { lat: 4.4697884, lng: 101.3879094 },
    selected: false,
    locationInfo: {
      location: {
        name: "Tanah Tinggi Cameron",
        latLng: { lat: 4.4697884, lng: 101.3879094 },
      },
      soilRecords: [],
      climateRecords: [],
    },
    score: {
      crop: {
        name: "Strawberry",
      } as Crop,
      location: {
        name: "Tanah Tinggi Cameron",
        latLng: { lat: 4.4697884, lng: 101.3879094 },
      },
      soilScore: {
        grade: "B",
        score: 0.83,
        description:
          "The soil has an acidic nature, requiring careful fertilizer management, and since the soil retains less moisture, it is important to water it frequently.",
      },
      climateScore: {
        grade: "A",
        score: 0.97,
        description:
          "From October onwards, the weather becomes cool, similar to the weather in Korea. However, it is important to monitor the sunlight intensity and duration. Additionally, for the ripening of strawberries, a slightly lower temperature is necessary, which may require refrigeration.",
      },
      totalScore: {
        grade: "A",
        score: 0.9,
        description:
          "It is evaluated as a suitable place where it is worth trying and plants can grow well.",
      },
    } as Score,
  },
  {
    position: { lat: 4.2107164, lng: 101.1248754 },
    selected: false,
    locationInfo: {
      location: {
        name: "Tapah",
        latLng: { lat: 4.2107164, lng: 101.1248754 },
      },
      soilRecords: [],
      climateRecords: [],
    },
    score: {
      crop: {
        name: "Strawberry",
      } as Crop,
      location: {
        name: "Tapah",
        latLng: { lat: 4.2107164, lng: 101.1248754 },
      },
      soilScore: {
        grade: "C",
        score: 0.71,
        description:
          "The soil belongs to the fertile category. Proper fertilizer usage is important.",
      },
      climateScore: {
        grade: "B",
        score: 0.84,
        description:
          "Due to the fluctuating weather conditions and the presence of wet and dry seasons, greenhouse cultivation is necessary. Proper humidity control is crucial.",
      },
      totalScore: {
        grade: "B",
        score: 0.77,
        description:
          "The temperature is similar to that of Korea, and it doesn't drop below freezing during winter, making it more comfortable in terms of temperature suitability. However, being a mountainous region, factors such as oxygen saturation level can be important.",
      },
    } as Score,
  },
  {
    position: { lat: 4.8606984, lng: 101.6050897 },
    selected: false,
    locationInfo: {
      location: {
        name: "Gua Musang",
        latLng: { lat: 4.8606984, lng: 101.6050897 },
      },
      soilRecords: [],
      climateRecords: [],
    },
    score: {
      crop: {
        name: "Strawberry",
      } as Crop,
      location: {
        name: "Gua Musang",
        latLng: { lat: 4.8606984, lng: 101.6050897 },
      },
      soilScore: {
        grade: "C",
        score: 0.71,
        description:
          "While the soil is fertile, it is regrettable that it is not suitable for growing strawberries in terms of soil quality.",
      },
      climateScore: {
        grade: "C",
        score: 0.74,
        description:
          "While it seems possible to control the weather conditions to some extent, there are concerns about higher electricity costs and whether the harvest yield will be satisfactory",
      },
      totalScore: {
        grade: "C",
        score: 0.73,
        description:
          "Overall, it may be possible to conduct experimental cultivation, but it remains uncertain whether a satisfactory harvest yield can be achieved. However, the proximity of the location could lead to reduced costs.",
      },
    } as Score,
  },
];

interface MapData {
  center: google.maps.LatLngLiteral;
  markers: MarkerData[];
  zoom: number;
}

interface MarkerData {
  position: google.maps.LatLngLiteral;
  selected: boolean;
  locationInfo?: LocationWithRecord;
  score?: Score;
}

const MapLocationComponent: React.FC = () => {
  const [cropHouseType, setCropHouseType] = useState<string>("ground");
  const [selectedCrop, setSelectedCrop] = useState<Crop>();
  const [selectedMarker, setSelectedMarker] = useState<Score | null>(null);

  const [mapData, setMapData] = useState<MapData>({
    center: { lat: 1.392854, lng: 103.781753 },
    markers: [],
    zoom: 9,
  });

  const { center, markers, zoom } = mapData;

  const handleCenterChanged = (evt: any) => {
    console.log({ lat: evt.lat(), lng: evt.lng() });
  };

  const handleMarkerClicked = (idx: number) => {
    mapData.markers[idx].selected = true;
    mapData.markers.forEach((marker, index) => {
      if (index !== idx) {
        marker.selected = false;
      }
    });
    mapData.center = mapData.markers[idx].position;
    mapData.zoom = 12;
    setMapData({ ...mapData });
    setSelectedMarker(mapData.markers[idx].score!);
  };

  const handleEmptyClicked = () => {
    setSelectedMarker(null);
  };

  const handleSearch = () => {
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
      <Col xs={48} md={24}>
        <div style={containerStyle}>
          {markers.length > 0 && selectedMarker === null && (
            <div style={cardStyle}>
              <Card title="Candidates">
                <List>
                  {markers.map((marker, idx) => (
                    <LocationScoreCard
                      key={idx}
                      score={marker.score!}
                      onClick={() => handleMarkerClicked(idx)}
                    />
                  ))}
                </List>
              </Card>
            </div>
          )}
          {selectedMarker !== null && (
            <div style={cardStyle}>
              <Card title={selectedMarker.location.name}>
                <List>
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <div>
                          {makeGradeIcon(selectedMarker.climateScore.grade)}
                          <span>{selectedMarker.climateScore.score}</span>
                        </div>
                      }
                      title="Climate Score"
                      description={selectedMarker.climateScore.description}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <div>
                          {makeGradeIcon(selectedMarker.soilScore.grade)}
                          <span>{selectedMarker.soilScore.score}</span>
                        </div>
                      }
                      title="Soil Score"
                      description={selectedMarker.soilScore.description}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <div>
                          {makeGradeIcon(selectedMarker.totalScore.grade)}
                          <span>{selectedMarker.totalScore.score}</span>
                        </div>
                      }
                      title="Total Score"
                      description={selectedMarker.totalScore.description}
                    />
                  </List.Item>
                </List>
              </Card>
            </div>
          )}
          <MapComponent
            zoom={zoom}
            center={center}
            markerData={markers}
            onCenterChanged={handleCenterChanged}
            onMarkerClick={handleMarkerClicked}
            onClick={handleEmptyClicked}
          />
        </div>
      </Col>
    </Row>
  );
};

export default MapLocationComponent;
