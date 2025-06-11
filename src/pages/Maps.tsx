import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import DestinationSlider from "@/components/Maps/DestinationSlider";
import mapData from "@/maps.json";
import { IoMdLocate } from "react-icons/io";
import ReactDOMServer from "react-dom/server";
import { RiGovernmentFill } from "react-icons/ri";
import { LiaMonumentSolid } from "react-icons/lia";
import { MdTempleBuddhist } from "react-icons/md";
import { GiTombstone } from "react-icons/gi";
import { FaChurch, FaMosque, FaMapMarkerAlt } from "react-icons/fa";
import polyline from "@mapbox/polyline";
import axios from "axios";
import type { IconType } from "react-icons";

const iconColor = "#51432F";

const DefaultIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <FaMapMarkerAlt style={{ color: iconColor }} size={32} />
  ),
  className: "custom-marker-div-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
L.Marker.prototype.options.icon = DefaultIcon;

const userLocationIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <IoMdLocate style={{ color: iconColor }} size={32} />
  ),
  className: "user-location-div-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const iconMap: { [key: string]: IconType } = {
  Church: FaChurch,
  Mosque: FaMosque,
  Stone: GiTombstone,
  Gover: RiGovernmentFill,
  Monuments: LiaMonumentSolid,
  Temple: MdTempleBuddhist,
};

interface Location {
  name: string;
  lat: number;
  long: number;
  image?: string;
  iconKey?: string;
  description?: string;
}

const getValidLatLng = (loc: Location): [number, number] => [loc.lat, loc.long];

const calculateDistance = (
  userLoc: [number, number],
  destLoc: Location
): number => {
  const [lat1, lon1] = userLoc;
  const lat2 = destLoc.lat;
  const lon2 = destLoc.long;
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// --- Helper: Validate LatLng (not null, not 0, not NaN, and in Indonesia) ---
// FIX: Remove Indonesia-only filter for userLocation, but keep for destination
const isValidLatLng = (latlng: [number, number] | null | undefined) =>
  Array.isArray(latlng) &&
  typeof latlng[0] === "number" &&
  typeof latlng[1] === "number" &&
  !isNaN(latlng[0]) &&
  !isNaN(latlng[1]) &&
  Math.abs(latlng[0]) > 0.01 &&
  Math.abs(latlng[1]) > 0.01;

const isValidDestination = (loc: Location | null | undefined) =>
  !!loc &&
  typeof loc.lat === "number" &&
  typeof loc.long === "number" &&
  !isNaN(loc.lat) &&
  !isNaN(loc.long) &&
  loc.lat < 7 &&
  loc.lat > -11 &&
  loc.long < 142 &&
  loc.long > 94;

// --- Helper: Check if API key is present and valid (not empty, not undefined) ---
const isApiKeyValid = (key: string | undefined) =>
  typeof key === "string" &&
  key.trim().length > 0 &&
  !key.includes("isi_api_key_anda_disini");

// --- Fix: Only show route when both userLocation and selectedLocation are valid ---
export default function Maps() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [distances, setDistances] = useState<Record<string, number>>({});
  const [openPopupKey, setOpenPopupKey] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLocation([-7.9771318, 112.6341849]);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        // Always use the real geolocation result
        setUserLocation([lat, lng]);
      },
      () => setUserLocation([-7.9771318, 112.6341849]),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      const result: Record<string, number> = {};
      mapData.forEach((loc) => {
        result[loc.name] = calculateDistance(userLocation, loc);
      });
      setDistances(result);
    }
  }, [userLocation]);

  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location);
    setOpenPopupKey(location.name);
  };

  const handleCloseSlider = () => {
    setSelectedLocation(null);
    setOpenPopupKey(null);
  };

  const stadiaMapsApiKey = import.meta.env.VITE_STADIA_API_KEY;
  if (!isApiKeyValid(stadiaMapsApiKey))
    return <div>Missing or invalid API Key</div>;

  const tileUrl = `https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${stadiaMapsApiKey}`;
  const attribution =
    "&copy; Stadia Maps &copy; OpenMapTiles &copy; OpenStreetMap contributors";

  const validMapData = mapData.filter(isValidDestination);

  // --- FIX: StadiaRoute must send [lng, lat] to API, [lat, lng] to Polyline ---
  const StadiaRoute: React.FC<{
    from: [number, number];
    to: [number, number];
  }> = ({ from, to }) => {
    const map = useMap();
    const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const getRoute = async () => {
        try {
          setError(null);
          setRouteCoords([]);
          // --- FIX: Only request route if both points are valid and NOT the same ---
          if (
            !isValidLatLng(from) ||
            !isValidLatLng(to) ||
            (Math.abs(from[0] - to[0]) < 0.0001 &&
              Math.abs(from[1] - to[1]) < 0.0001)
          ) {
            setError("Lokasi pengguna atau destinasi tidak valid.");
            setRouteCoords([]);
            return;
          }
          // --- FIX: Snap route to nearest marker (destination) if user is close to a marker ---
          // If user is within 10 meters of a marker, use that marker's exact coordinates as 'from'
          let snappedFrom = from;
          for (const loc of mapData) {
            const d = calculateDistance(from, loc);
            if (d < 0.01) {
              // < 10 meter
              snappedFrom = [loc.lat, loc.long];
              break;
            }
          }
          // If destination is close to a marker, snap to marker
          let snappedTo = to;
          for (const loc of mapData) {
            if (
              Math.abs(loc.lat - to[0]) < 0.0001 &&
              Math.abs(loc.long - to[1]) < 0.0001
            ) {
              snappedTo = [loc.lat, loc.long];
              break;
            }
          }

          const response = await axios.post(
            `https://api.stadiamaps.com/route/v1?api_key=${stadiaMapsApiKey}`,
            {
              locations: [
                { lon: snappedFrom[1], lat: snappedFrom[0], type: "break" },
                { lon: snappedTo[1], lat: snappedTo[0], type: "break" },
              ],
              costing: "auto",
              costing_options: { auto: { use_tolls: 1, use_highways: 0 } },
              units: "kilometers",
            },
            { headers: { "Content-Type": "application/json" } }
          );

          if (
            !response.data ||
            !response.data.trip ||
            !response.data.trip.legs ||
            !response.data.trip.legs[0] ||
            !response.data.trip.legs[0].shape
          ) {
            setError("Rute tidak ditemukan.");
            setRouteCoords([]);
            return;
          }

          const shape = response.data.trip.legs[0].shape;
          const coords = polyline.decode(shape);
          const latLngs = coords.map(
            ([lat, lng]) => [lat, lng] as [number, number]
          );
          if (latLngs.length > 1) {
            setRouteCoords(latLngs);
            map.fitBounds(L.latLngBounds(latLngs));
          } else {
            setError("Rute tidak ditemukan.");
            setRouteCoords([]);
          }
        } catch (err: any) {
          setRouteCoords([]);
          setError(
            "Gagal mengambil rute. Pastikan API key routing benar dan lokasi valid."
          );
        }
      };

      if (isValidLatLng(from) && isValidLatLng(to)) {
        getRoute();
      } else {
        setRouteCoords([]);
      }
    }, [from, to, map]);

    return (
      <>
        {routeCoords.length > 0 && (
          <Polyline
            positions={routeCoords}
            pathOptions={{ color: "blue", weight: 4 }}
          />
        )}
        {error && (
          <Popup position={from}>
            <span className="text-red-600">{error}</span>
          </Popup>
        )}
      </>
    );
  };

  return (
    <div className="w-full flex flex-col md:flex-row">
      <section
        className={`w-full h-screen ${
          selectedLocation ? "md:w-2/3" : "md:w-full"
        }`}
      >
        <MapContainer
          center={
            userLocation
              ? (userLocation as [number, number])
              : [-7.9771318, 112.6341849]
          }
          zoom={14}
          className="w-full h-full z-0"
        >
          <TileLayer url={tileUrl} attribution={attribution} />

          {userLocation && (
            <Marker
              position={userLocation as [number, number]}
              icon={userLocationIcon}
            >
              <Popup>Lokasi Anda</Popup>
            </Marker>
          )}

          {validMapData.map((location) => {
            const IconComponent = iconMap[location.iconKey || ""];
            const customIcon = IconComponent
              ? L.divIcon({
                  html: ReactDOMServer.renderToString(
                    <IconComponent style={{ color: iconColor }} size={28} />
                  ),
                  className: "custom-marker-div-icon",
                  iconSize: [28, 28],
                  iconAnchor: [14, 28],
                  popupAnchor: [0, -28],
                })
              : DefaultIcon;

            return (
              <Marker
                key={location.name}
                position={getValidLatLng(location)}
                icon={customIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(location),
                  popupclose: () => setOpenPopupKey(null),
                }}
              >
                <Popup>
                  <h3 className="font-semibold">{location.name}</h3>
                  {distances[location.name] && (
                    <p className="text-sm">
                      Jarak: {distances[location.name].toFixed(1)} km
                    </p>
                  )}
                </Popup>
              </Marker>
            );
          })}

          {userLocation && isValidDestination(selectedLocation) && (
            <StadiaRoute
              from={userLocation as [number, number]}
              to={getValidLatLng(selectedLocation as Location)}
            />
          )}
        </MapContainer>
      </section>

      {selectedLocation && (
        <section className="w-full md:w-1/3 order-2 animate-fade-in">
          <DestinationSlider
            selectedLocation={selectedLocation}
            onClose={handleCloseSlider}
          />
        </section>
      )}
    </div>
  );
}
