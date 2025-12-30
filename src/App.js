import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "./App.css";
import LeafletRoutingMachine from "./LeafletRoutingMachine.js";

function App() {
  const position = [36.8065, 10.1815];

  return (
    <div className="App">
      
    
      {/* 
  <div className="centered-title">
    <h3> 🚍 Bus Tracker School</h3>
  </div> 
*/}
      <div className="map-wrapper" style={{ height: '90vh' }}>
      <MapContainer  center={position} zoom={10} scrollWheelZoom={false}>
        <LeafletRoutingMachine />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">Ecole</a> Educanet'
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
