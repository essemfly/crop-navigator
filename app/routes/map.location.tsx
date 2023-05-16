import React, { useState, useEffect } from "react";

import { Row, Col, Input, Button, Radio } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { LatLng, LocationWithRecord } from "~/models/location.server";
import type { SearchResult } from "~/models/score.server";

import MapComponent from "app/components/googleMapComponent";
import SearchResultCard from "app/components/searchResultCard";
import LocationInfoCard from "~/components/locationInfoCard";
import CropInfo from "~/components/cropInfo";

const MapCropComponent: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null
  );
  const [locationInfo, setLocationInfo] = useState<LocationWithRecord | null>(
    null
  );
  const [latLng, setLatLng] = useState<LatLng>({ lat: 37.5665, lng: 126.978 });

  const zoomLevel = 12;

  useEffect(() => {
    if (searchValue === "") {
      return;
    }

    const formData = new FormData();
    formData.append("lat", latLng.lat.toString());
    formData.append("lng", latLng.lng.toString());

    const requestOptions: RequestInit = {
      method: "POST",
      body: formData,
    };

    fetch("/crops", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("new results", data);
        setSearchResults(data);
      })
      .catch((error) => {
        console.log("err", error);
      });
  }, [latLng]);

  const handleSearch = () => {
    const headers = {
      Authorization: `KakaoAK d739e6be1eae6ec1b48f57071b5582d1`,
    };
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${searchValue}`;
    fetch(url, { headers })
      .then((response) => response.json())
      .then((data) => {
        const firstResult = data.documents[0];
        console.log("first result", firstResult);
        const latitude = +firstResult.y;
        const longitude = +firstResult.x;
        setLatLng({ lat: latitude, lng: longitude });
        setLocationInfo({
          location: {
            name: firstResult.address_name,
            latLng: { lat: latitude, lng: longitude },
          },
          soilRecords: [],
          climateRecords: [],
        });
      })
      .catch((error) => console.error(error));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  let tempCenter: LatLng = { lat: 37.5665, lng: 126.978 };

  const handleCenterChanged = (evt: any) => {
    tempCenter = { lat: evt.lat(), lng: evt.lng() };
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={48} md={24}>
        <Input
          placeholder="Search"
          value={searchValue}
          allowClear
          suffix={<Button icon={<SearchOutlined />} onClick={handleSearch} />}
          onKeyPress={handleKeyPress}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Col>
      <Col xs={16} md={8}>
        {locationInfo && <LocationInfoCard locationInfo={locationInfo} />}
        {searchResults.length > 0 && (
          <div>
            {searchResults.map((result, idx) => (
              <SearchResultCard
                key={idx}
                onClick={() => setSelectedResult(result)}
                result={result}
                isSelected={selectedResult?.id === result.id}
              />
            ))}
          </div>
        )}
      </Col>
      <Col xs={32} md={16}>
        {!selectedResult && (
          <MapComponent
            zoom={zoomLevel}
            center={latLng}
            markerData={[]}
            onCenterChanged={handleCenterChanged}
            onMarkerClick={null}
            onClick={null}
          />
        )}
        {selectedResult && <CropInfo />}
      </Col>
    </Row>
  );
};

export default MapCropComponent;
