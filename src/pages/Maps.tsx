import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DestinationSlider from "@/components/Maps/DestinationSlider";
import mapData from "@/maps.json";

// Fix for default marker icons in React Leaflet
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Custom icon for user location
const UserIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: 'user-location-marker'
});

L.Marker.prototype.options.icon = DefaultIcon;

// Function to calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

export default function Maps() {
  const [selectedLocation, setSelectedLocation] = useState<(typeof mapData)[0] | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [distances, setDistances] = useState<Record<string, number>>({});

  // Get user's location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  // Calculate distances when user location is available
  useEffect(() => {
    if (userLocation) {
      const newDistances: Record<string, number> = {};
      mapData.forEach((location) => {
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
      <section className={`w-full h-[300px] md:h-screen order-1 transition-all duration-300 ${selectedLocation ? 'md:w-2/3' : 'md:w-full'}`}>
        <MapContainer
          center={[-7.977131826999937, 112.63418492300002]}
          zoom={13}
          className="w-full h-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* User location marker */}
          {userLocation && (
            <Marker
              position={userLocation}
              icon={UserIcon}
            >
              <Popup>
                <div>
                  <h3 className="font-semibold">Your Location</h3>
                </div>
              </Popup>
            </Marker>
          )}
          {mapData.map((location) => (
            <Marker
              key={location.name}
              position={[location.lat, location.long]}
              eventHandlers={{
                click: () => {
                  setSelectedLocation(location);
                },
              }}
            >
              <Popup>
                <div>
                  <h3 className="font-semibold">{location.name}</h3>
                  {userLocation && (
                    <p className="text-sm text-gray-600 mt-1">
                      Distance: {distances[location.name]?.toFixed(1)} km
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </section>
      {selectedLocation && (
        <section className="w-full md:w-1/3 order-2 animate-fade-in">
          <DestinationSlider selectedLocation={selectedLocation} />
        </section>
      )}
    </div>
  );
}
