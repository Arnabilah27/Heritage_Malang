import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

interface RoutingMachineProps {
  userLocation: [number, number];
  destination: [number, number];
  onRouteFound?: (bounds: L.LatLngBounds) => void;
}

const RoutingMachine: React.FC<RoutingMachineProps> = ({
  userLocation,
  destination,
  onRouteFound,
}) => {
  const map = useMap();
  const routingControlRef = useRef<any>(null);

  useEffect(() => {
    if (!map || !userLocation || !destination) return;

    // Remove any existing routing control
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }

    // Create new routing control
    const routingControl = (L as any).Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(destination[0], destination[1]),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false, // We'll handle fit via onRouteFound
      show: false,
      createMarker: () => null,
      lineOptions: {
        styles: [{ color: "deepskyblue", opacity: 0.8, weight: 5 }],
      },
    }).addTo(map);

    routingControlRef.current = routingControl;

    // Listen for route found to get bounds and fit map
    routingControl.on("routesfound", function (e: any) {
      if (onRouteFound && e && e.routes && e.routes[0] && e.routes[0].bounds) {
        onRouteFound(e.routes[0].bounds);
      }
      if (e && e.routes && e.routes[0] && e.routes[0].bounds && map) {
        map.fitBounds(e.routes[0].bounds, { padding: [50, 50] });
      }
    });

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
    };
  }, [map, userLocation, destination, onRouteFound]);

  return null;
};

export default RoutingMachine;
