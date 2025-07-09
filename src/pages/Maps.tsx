import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useParams } from "react-router-dom";

import DestinationSlider from "@/components/Maps/DestinationSlider";
import mapData from "@/maps.json";
import RoutingMachine from "@/components/Maps/Routing";

import { IconType } from "react-icons";
import { IoMdLocate } from "react-icons/io";
import ReactDOMServer from "react-dom/server";
import { RiGovernmentFill } from "react-icons/ri";
import { LiaMonumentSolid } from "react-icons/lia";
import { MdTempleBuddhist } from "react-icons/md";
import { GiTombstone } from "react-icons/gi";
import { FaChurch, FaMosque, FaMapMarkerAlt } from "react-icons/fa";

import L from "leaflet";
import type { Map as LeafletMap } from "leaflet";

// Default marker
const DefaultIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <FaMapMarkerAlt className="text-[#51432F]" size={32} />
  ),
  className: "user-location-div-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

L.Marker.prototype.options.icon = DefaultIcon;

const userLocationIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <IoMdLocate className="text-[#51432F]" size={32} />
  ),
  className: "user-location-div-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface Location {
  code?: string;
  name: string;
  lat: number;
  long: number;
  image?: string;
  description?: string;
  element?: string;
  othername?: string;
  language?: string;
  meaning?: string;
  manager?: string;
  status?: string;
  iconKey?: string;
}

const iconMap: { [key: string]: IconType } = {
  Church: FaChurch,
  Mosque: FaMosque,
  Stone: GiTombstone,
  Gover: RiGovernmentFill,
  Monuments: LiaMonumentSolid,
  Temple: MdTempleBuddhist,
};

const ChangeMapView = ({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

// ✅ LayerChangeHandler dipindah dari <LayersControl>
function LayerChangeHandler({
  onChange,
}: {
  onChange?: (name: string) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const handler = (e: { name: string }) => {
      console.log("Baselayer changed to:", e.name);
      if (onChange) onChange(e.name);
    };

    map.on("baselayerchange", handler);
    return () => {
      map.off("baselayerchange", handler);
    };
  }, [map, onChange]);

  return null;
}

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function Maps() {
  const mapRef = useRef<LeafletMap | null>(null);
  const mapWrapperRef = useRef<HTMLElement | null>(null);
  const { name: destinationNameFromUrl } = useParams();

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [distances, setDistances] = useState<Record<string, number>>({});
  const [isLocating, setIsLocating] = useState<boolean>(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedTile, setSelectedTile] = useState("Default");

  const handleCloseSlider = () => {
    setSelectedLocation(null);
    mapRef.current?.closePopup();
  };

  useEffect(() => {
    if (destinationNameFromUrl) {
      const decodedName = decodeURIComponent(destinationNameFromUrl);
      const locationFromUrl = (mapData as Location[]).find(
        (location) => location.name === decodedName
      );
      if (locationFromUrl) {
        setSelectedLocation(locationFromUrl);
      }
    }
  }, [destinationNameFromUrl]);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocationError("Geolocation tidak didukung di browser Anda.");
      setIsLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setIsLocating(false);
      },
      (error) => {
        setLocationError(`Gagal mendapatkan lokasi: ${error.message}.`);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  useEffect(() => {
    if (userLocation && mapData.length > 0) {
      const newDistances: Record<string, number> = {};
      (mapData as Location[]).forEach((location) => {
        const distance = calculateDistance(
          userLocation[0],
          userLocation[1],
          location.lat,
          location.long
        );
        newDistances[location.name] = distance;
      });
      setDistances(newDistances);
    }
  }, [userLocation]);

  useEffect(() => {
    const map = mapRef.current;
    const mapWrapper = mapWrapperRef.current;

    if (!map || !mapWrapper) return;

    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });

    observer.observe(mapWrapper);

    return () => {
      observer.unobserve(mapWrapper);
    };
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row md:items-start">
      <section
        ref={mapWrapperRef}
        className={`w-full h-screen order-1 transition-all duration-300 relative ${
          selectedLocation ? "md:w-2/3" : "md:w-full"
        }`}
      >
        {isLocating && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[1000] bg-white p-2 rounded shadow-lg">
            Mencari lokasi Anda...
          </div>
        )}
        {locationError && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[1000] bg-red-100 text-red-700 p-2 rounded shadow-lg">
            {locationError}
          </div>
        )}

        <MapContainer
          ref={mapRef}
          center={[-7.97, 112.63]}
          zoom={13}
          className="w-full h-full z-0"
        >
          {userLocation && <ChangeMapView center={userLocation} zoom={14} />}
          {selectedLocation && (
            <ChangeMapView
              center={[selectedLocation.lat, selectedLocation.long]}
              zoom={15}
            />
          )}

          {/* ✅ Handler ubah tile */}
          <LayerChangeHandler onChange={(name) => setSelectedTile(name)} />

          <LayersControl position="bottomright">
            <LayersControl.BaseLayer
              checked={selectedTile === "Default"}
              name="Default"
            >
              <TileLayer
                attribution={`© <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> © <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
                url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${
                  import.meta.env.VITE_STADIA_MAPS_API_KEY
                }`}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer
              checked={selectedTile === "Satellite"}
              name="Satellite"
            >
              <TileLayer
                attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          {userLocation && (
            <Marker position={userLocation} icon={userLocationIcon}>
              <Popup>
                <h3 className="font-semibold">Lokasi Anda</h3>
              </Popup>
            </Marker>
          )}

          {(mapData as Location[]).map((location) => {
            const IconComponent = location.iconKey
              ? iconMap[location.iconKey]
              : null;

            const customIcon = IconComponent
              ? L.divIcon({
                  html: ReactDOMServer.renderToString(
                    <IconComponent className="text-[#51432F]" size={28} />
                  ),
                  className: "user-location-div-icon",
                  iconSize: [28, 28],
                  iconAnchor: [14, 28],
                  popupAnchor: [0, -28],
                })
              : DefaultIcon;

            return (
              <Marker
                key={location.name}
                position={[location.lat, location.long]}
                icon={customIcon}
                eventHandlers={{
                  click: () => {
                    setSelectedLocation(location);
                  },
                }}
              >
                <Popup>
                  <div>
                    <h3 className="font-semibold">{location.name}</h3>
                    {distances[location.name] !== undefined && (
                      <p className="text-sm text-gray-600 mt-1">
                        Jarak: {distances[location.name].toFixed(1)} km
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {userLocation && selectedLocation && (
            <RoutingMachine
              userLocation={userLocation}
              destination={[selectedLocation.lat, selectedLocation.long]}
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
