import React, { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";


const Map = () => {
  const { mapPosition } = useContext(WeatherContext);

  //? Set the default icon for Leaflet markers
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });

  return (
    <MapContainer
      center={mapPosition ? mapPosition : null}
      zoom={7}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={mapPosition ? mapPosition : null}>
        <Popup>You're Here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
