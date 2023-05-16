import React, { useState, useEffect } from "react";

import { Row, Col, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { LatLng, LocationWithRecord } from "~/models/location.server";
import type { SearchResult, Score } from "~/models/score.server";

import MapComponent from "app/components/googleMapComponent";
import SearchResultCard from "app/components/searchResultCard";
import LocationInfoCard from "~/components/locationInfoCard";

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "75vh",
  position: "relative",
};

const locationStyle: React.CSSProperties = {
  top: "10px", // Adjust the distance from the bottom as needed
  maxHeight: "55vh",
  position: "absolute",
  zIndex: 1,
};

const cardStyle: React.CSSProperties = {
  top: "10px", // Adjust the distance from the bottom as needed
  right: "10px", // Adjust the distance from the right as needed
  maxWidth: "400px",
  maxHeight: "75vh",
  overflow: "scroll",
  position: "absolute",
  zIndex: 1,
};

interface MarkerData {
  position: google.maps.LatLngLiteral;
  selected: boolean;
  locationInfo?: LocationWithRecord;
  score?: Score;
}

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
  const [marker, setMarker] = useState<MarkerData[]>([]);

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
        setMarker([
          {
            position: { lat: latitude, lng: longitude },
            selected: true,
          },
        ]);
      })
      .catch((error) => console.error(error));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleCenterChanged = (evt: any) => {};

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
      <Col xs={48} md={24}>
        <div style={containerStyle}>
          {locationInfo && (
            <div>
              <div style={locationStyle}>
                <LocationInfoCard locationInfo={locationInfo} />
              </div>
              <div style={cardStyle}>
                {searchResults.length > 0 &&
                  searchResults.map((result, idx) => (
                    <SearchResultCard
                      key={idx}
                      onClick={() => setSelectedResult(result)}
                      result={result}
                      isSelected={selectedResult?.id === result.id}
                    />
                  ))}
              </div>
            </div>
          )}
          <MapComponent
            zoom={zoomLevel}
            center={latLng}
            markerData={marker}
            onCenterChanged={handleCenterChanged}
            onMarkerClick={null}
            onClick={null}
          />
        </div>
      </Col>
    </Row>
  );
};

export default MapCropComponent;
