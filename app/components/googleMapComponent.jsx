import { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Circle,
} from "@react-google-maps/api";

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

const MapComponent = ({
  zoom,
  center,
  markerData,
  onCenterChanged,
  onMarkerClick,
  onClick,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBIAVCWoBcNFcjxklrWfD3dSGHTajsJ0KQ",
  });

  const [map, setMap] = useState(null);
  const [loadedMarkers, setLoadedMarkers] = useState([]);

  const handleCenterChanged = () => {
    if (map) {
      const center = map.getCenter();
      onCenterChanged(center);
    }
  };
  const onMapLoad = (map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  // useEffect(() => {
  //   if (map) {
  //     map.setCenter(center);
  //   }
  // }, [center, map]);

  useEffect(() => {
    console.log("marker changed");
    setLoadedMarkers(markerData);
  }, [markerData]);

  return isLoaded ? (
    <GoogleMap
      id="map"
      center={center}
      zoom={zoom}
      onLoad={onMapLoad}
      onUnmount={onUnmount}
      onClick={onClick}
      onCenterChanged={handleCenterChanged}
      mapContainerStyle={containerStyle}
      options={{ styles: mapStyles }}
    >
      {loadedMarkers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          onClick={() => onMarkerClick(index)}
          icon={
            marker.selected
              ? "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
              : "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
          }
        />
      ))}
      {loadedMarkers.length > 0 &&
        loadedMarkers.map(
          (marker, index) =>
            marker && (
              <Circle
                key={`circle-${index}`}
                center={marker.position}
                radius={500} // 5km radius in meters
                options={{
                  strokeColor: "#00FF00", // Green stroke color
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#00FF00", // Light green fill color
                  fillOpacity: 0.4,
                }}
              />
            )
        )}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default MapComponent;
