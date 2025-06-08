import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useParams } from "react-router-dom";

import DestinationSlider from "@/components/Maps/DestinationSlider";
import mapData from "@/maps.json";
import RoutingMachine from "@/components/Maps/Routing";

// Impor ikon kustom
import { IoMdLocate } from "react-icons/io";
import ReactDOMServer from "react-dom/server";
import { RiGovernmentFill } from "react-icons/ri";
import { LiaMonumentSolid } from "react-icons/lia";
import { MdTempleBuddhist } from "react-icons/md";
import { GiTombstone } from "react-icons/gi";
import { FaChurch, FaMosque, FaMapMarkerAlt } from "react-icons/fa"; // DIUBAH: Tambahkan FaMapMarkerAlt

// Fix & Setup Ikon Marker
import L from "leaflet";
import type { Map as LeafletMap } from "leaflet";
// Kita tidak lagi butuh iconUrl dan iconShadowUrl untuk DefaultIcon
// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";

// --- PERUBAHAN 1: Ikon Default sekarang menggunakan React Icons ---
const DefaultIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <FaMapMarkerAlt className="text-[#2F1915]" size={32} />
  ),
  className: "user-location-div-icon", // Pakai kelas yang sama untuk styling konsisten
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Ikon kustom untuk lokasi pengguna menggunakan React Icons (warna sudah sesuai)
const userLocationIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <IoMdLocate className="text-[#2F1915]" size={32} />
  ),
  className: "user-location-div-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Tipe data untuk setiap lokasi agar lebih aman dan jelas
interface Location {
  name: string;
  lat: number;
  long: number;
  image?: string;
  iconKey?: string;
  description?: string;
}

// Kamus untuk memetakan 'iconKey' dari JSON ke komponen React Icon
const iconMap = {
  Church: FaChurch,
  Mosque: FaMosque,
  Stone: GiTombstone,
  Gover: RiGovernmentFill,
  Monuments: LiaMonumentSolid,
  Temple: MdTempleBuddhist,
};

// Komponen helper untuk mengubah pusat peta secara dinamis
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

// Fungsi kalkulasi jarak (tidak berubah)
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

  const handleCloseSlider = () => {
    setSelectedLocation(null);
    mapRef.current?.closePopup();
  };

  // ... (semua useEffect Anda tetap sama, tidak perlu diubah)
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

  return (
    <div className="w-full flex flex-col md:flex-row">
      <section
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

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

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
                    // --- PERUBAHAN 2: Ganti warna di sini ---
                    <IconComponent className="text-[#51432F]" size={28} />
                  ),
                  className: "user-location-div-icon",
                  iconSize: [28, 28],
                  iconAnchor: [14, 28],
                  popupAnchor: [0, -28],
                })
              : DefaultIcon; // Fallback ke ikon default baru kita

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
