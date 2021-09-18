import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ position, location }) => {
  return (
    <div className="leaflet-container">
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        className="relative z-10"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {location.city}, {location.region}, {location.postalCode}
            {location.country}.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
