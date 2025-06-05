// src/components/Maps/Routing.tsx
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

// Hapus seluruh blok 'declare module "leaflet" { ... }' karena menyebabkan konflik tipe saat build.

interface RoutingMachineProps {
  userLocation: [number, number];
  destination: [number, number];
}

const RoutingMachine: React.FC<RoutingMachineProps> = ({
  userLocation,
  destination,
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !userLocation || !destination) return;

    if (!(L as any).Routing || !(L as any).Routing.control) {
      console.error("Leaflet Routing Machine tidak termuat dengan benar.");
      return;
    }

    // Opsi untuk L.Routing.control
    const routingOptions = {
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(destination[0], destination[1]),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      createMarker: () => null,
      lineOptions: {
        styles: [{ color: "deepskyblue", opacity: 0.8, weight: 5 }],
      },
    };

    // Gunakan 'as any' untuk melewati pemeriksaan tipe yang terlalu ketat saat build
    const routingControl = (L as any).Routing.control(routingOptions).addTo(
      map
    );

    // Fungsi cleanup
    return () => {
      if (routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [map, userLocation, destination]);

  return null;
};

export default RoutingMachine;
