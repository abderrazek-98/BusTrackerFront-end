import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "./App.css";
import LeafletRoutingMachine from "./LeafletRoutingMachine.js";

function App() {
  const position = [36.8065, 10.1815];
  const phoneNumber = "+216 12 345 678"; // Remplace par le numéro que tu veux appeler

  return (
    <div className="App">
      
       <div className="centered-title">
        <h2> 🚍 Bus Tracker School</h2>
      </div>
      <div className="call-button">
        <a href={`tel:${phoneNumber}`} className="call-link">
        Call now {phoneNumber}
        </a>
      </div>
      <div className="map-wrapper" style={{ height: '90vh' }}>
      <MapContainer  center={position} zoom={13} scrollWheelZoom={false}>
        <LeafletRoutingMachine />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>

   </div>
     
    </div>
  );
}

let DefaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default App;
