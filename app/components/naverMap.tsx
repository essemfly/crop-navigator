import React, { useEffect } from "react";

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

declare global {
  interface Window {
    naver: any;
  }
}

const Map: React.FC<MapProps> = ({ center, zoom }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NAVER_MAPS_API_KEY}`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const map = new window.naver.maps.Map("map", {
        center,
        zoom,
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [center, zoom]);

  return <div id="map" style={{ position: "relative", height: "70vh" }} />;
};

export default Map;
