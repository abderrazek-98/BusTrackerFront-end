import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "https://server-production-3f37.up.railway.app/"; // Replace with your server's IP

const LeafletRoutingMachine = () => {
  const map = useMap();
  const [socket, setSocket] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [stopPoint, setStopPoint] = useState(null);
  const [busMarker, setBusMarker] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => console.log("✅ Connected to WebSocket server!"));
    newSocket.on("connect_error", (err) => console.error("❌ WebSocket connection error:", err));
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!map || !socket) return;

    let busIcon = L.icon({
      iconUrl: "/bus.png",
      iconSize: [20, 20],
      iconAnchor: [20, 20],
    });

    let startIcon = L.icon({
      iconUrl: "/START.png",
      iconSize: [20, 20],
      iconAnchor: [17, 35],
    });

    let stopIcon = L.icon({
      iconUrl: "/STOP.png",
      iconSize: [20, 20],
      iconAnchor: [17, 35],
    });

    socket.on("busLocationStart&&StopPoint", (data) => {
      console.log("📍 Received Start & Stop Points:", data);

      setStartPoint(data.newCoords1);
      setStopPoint(data.stopPoint);

      // Add markers for start and stop if they don't exist
      if (data.newCoords1.latitude && data.newCoords1.longitude) {
        L.marker([data.newCoords1.latitude, data.newCoords1.longitude], { 
          icon: startIcon, 
          draggable: false  // Disable marker dragging
        }).addTo(map);
      }

      if (data.stopPoint.latitude && data.stopPoint.longitude) {
        L.marker([data.stopPoint.latitude, data.stopPoint.longitude], { 
          icon: stopIcon, 
          draggable: false  // Disable marker dragging
        }).addTo(map);
      }

      map.setView([data.newCoords1.latitude, data.newCoords1.longitude], 14);

      // Initialize the routing control if not already set
      if (data.newCoords1 && data.stopPoint && !routingControl) {
        const control = L.Routing.control({
          waypoints: [
            L.latLng(data.newCoords1.latitude, data.newCoords1.longitude),
            L.latLng(data.stopPoint.latitude, data.stopPoint.longitude)
          ],
          lineOptions: {
            styles: [{ color: "blue", weight: 3 }],
          },
          routeWhileDragging: false, // Disable route dragging (don't want users to drag the start or stop point)
          // Disable markers (no markers will appear on the route)
          createMarker: () => null
        }).addTo(map);

        setRoutingControl(control); // Store reference to routing control
      }
    });

    // Add bus marker update functionality
    socket.on("updateBusLocation", (data) => {
      console.log("🚍 Bus Location Updated:", data);
      if (!busMarker) {
        const marker = L.marker([data.latitude, data.longitude], { icon: busIcon, draggable: false }).addTo(map);
        setBusMarker(marker);
      } else {
        busMarker.setLatLng([data.latitude, data.longitude]);
      }
      map.setView([data.latitude, data.longitude], 14);
    });

    return () => {
      socket.off("busLocationUpdate");
      socket.off("busLocationStart&&StopPoint");
    };
  }, [map, socket, startPoint, stopPoint, busMarker, routingControl]);

  return null;
};

export default LeafletRoutingMachine;
