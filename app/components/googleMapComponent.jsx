import { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  position: "relative",
  height: "70vh",
};

const mapStyles = [
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
];

const MapComponent = ({ center, markers }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBIAVCWoBcNFcjxklrWfD3dSGHTajsJ0KQ",
  });

  const [map, setMap] = useState(null);
  const [loadedMarkers, setLoadedMarkers] = useState([]);

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

  useEffect(() => {
    setLoadedMarkers(markers);
  }, [markers]);

  return isLoaded ? (
    <GoogleMap
      id="map"
      center={center}
      zoom={13}
      onLoad={onMapLoad}
      onUnmount={onUnmount}
      mapContainerStyle={containerStyle}
      options={{ styles: mapStyles }}
    >
      {/* {map && <Marker position={center} map={map} />} */}
      {loadedMarkers.map((marker, index) => (
        <Marker key={index} position={marker} />
      ))}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default MapComponent;
