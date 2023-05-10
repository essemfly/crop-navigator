import { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  position: "relative",
  height: "70vh",
};

const MapComponent = ({ center }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBIAVCWoBcNFcjxklrWfD3dSGHTajsJ0KQ",
  });

  const [map, setMap] = useState(null);

  const onMapLoad = (map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  useEffect(() => {
    if (map) {
      map.setCenter(center);
    }
  }, [center, map]);

  return isLoaded ? (
    <GoogleMap
      id="map"
      center={center}
      zoom={13}
      onLoad={onMapLoad}
      onUnmount={onUnmount}
      mapContainerStyle={containerStyle}
    >
      {map && <Marker position={center} map={map} />}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default MapComponent;
