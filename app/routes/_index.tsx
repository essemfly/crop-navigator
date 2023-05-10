import React, { useState, useEffect } from "react";

import { Row, Col, Input, Button, Radio } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import MapComponent from "app/components/googleMap";
import type { LatLng } from "app/models/location";

interface SearchResult {
  id: number;
  title: string;
}

const HomeComponent: React.FC = () => {
  const [cropHouseType, setCropHouseType] = useState<string>("ground");
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [latLng, setLatLng] = useState<LatLng>({ lat: 37.5665, lng: 126.978 });

  const handleSearch = () => {
    // Code to perform the search and set searchResults
    console.log("searchValue", searchValue);
    console.log("cropHouseType", cropHouseType);

    const headers = {
      Authorization: `KakaoAK d739e6be1eae6ec1b48f57071b5582d1`,
    };
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${searchValue}`;
    fetch(url, { headers })
      .then((response) => response.json())
      .then((data) => {
        const firstResult = data.documents[0];
        const latitude = +firstResult.y;
        const longitude = +firstResult.x;
        console.log(latitude, longitude);
        setLatLng({ lat: latitude, lng: longitude });
      })
      .catch((error) => console.error(error));
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={48} md={24}>
        <Radio.Group
          onChange={(e) => setCropHouseType(e.target.value)}
          defaultValue="ground"
          value={cropHouseType}
        >
          <Radio.Button value="ground">노지재배</Radio.Button>
          <Radio.Button value="facility">시설재배</Radio.Button>
        </Radio.Group>
        <Input
          placeholder="Search"
          value={searchValue}
          allowClear
          suffix={<Button icon={<SearchOutlined />} onClick={handleSearch} />}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Col>
      <Col xs={16} md={8}>
        {searchResults.length > 0 && (
          <div>
            {searchResults.map((result) => (
              <div key={result.id}>{result.title}</div>
            ))}
          </div>
        )}
      </Col>
      <Col xs={32} md={16}>
        <MapComponent center={latLng} />
        {/* <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <Meta title="Card 1" description="Description of card 1" />
            </Card>
          </Col>
          <Col span={24}>
            <Card>
              <Meta title="Card 2" description="Description of card 2" />
            </Card>
          </Col>
          <Col span={24}>
            <Card>
              <Meta title="Card 3" description="Description of card 3" />
            </Card>
          </Col>
        </Row> */}
      </Col>
    </Row>
  );
};

export default HomeComponent;
