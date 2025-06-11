import { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";
import L from "leaflet";
import axios from "axios";

type RoutingPolylineProps = {
  from: [number, number];
  to: [number, number];
  map: L.Map;
};

const RoutingPolyline = ({ from, to, map }: RoutingPolylineProps) => {
  const [routeCoords, setRouteCoords] = useState<L.LatLng[]>([]);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await axios.get(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248cf8b9db90c6a465cadf53de293fa70fe&start=${from[1]},${from[0]}&end=${to[1]},${to[0]}`
        );

        const coords = response.data.features?.[0]?.geometry?.coordinates;

        if (!coords || coords.length === 0) {
          throw new Error("Tidak ada koordinat dari API");
        }

        const latlngs = coords.map(([lng, lat]) => L.latLng(lat, lng));
        console.log("✅ Parsed latlngs count:", latlngs.length);

        setRouteCoords(latlngs);
        map.fitBounds(L.latLngBounds(latlngs));
      } catch (err: any) {
        console.error("❌ Error fetching route:", err);
      }
    };

    if (from && to) {
      fetchRoute();
    }
  }, [from, to, map]);

  return routeCoords.length > 0 ? (
    <Polyline
      positions={routeCoords}
      pathOptions={{ color: "blue", weight: 5 }}
    />
  ) : null;
};

export default RoutingPolyline;
