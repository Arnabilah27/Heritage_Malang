import { useState } from "react";
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

L.Marker.prototype.options.icon = DefaultIcon;

export default function Maps() {
  const [selectedLocation, setSelectedLocation] = useState<typeof mapData[0] | null>(null);

  return (
    <div className="w-full flex flex-col md:flex-row">
      <section className="w-full md:w-2/3 h-[300px] md:h-screen order-1">
        <MapContainer
          center={[-7.977131826999937, 112.63418492300002]}
          zoom={13}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
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
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </section>
      <section className="w-full md:w-1/3 order-2">
        <DestinationSlider selectedLocation={selectedLocation} />
      </section>
    </div>
  );
}
