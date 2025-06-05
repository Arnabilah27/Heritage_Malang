// src/components/Maps/RoutingMachine.tsx
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

// Deklarasi modul untuk memperluas tipe Leaflet dengan namespace Routing
// Ini bisa diletakkan di file deklarasi global (misal: global.d.ts) atau di sini.
declare module "leaflet" {
  namespace Routing {
    // Definisikan tipe-tipe yang lebih spesifik jika diperlukan,
    // untuk sementara kita bisa menggunakan 'any' atau interface dasar.
    interface ControlOptions {
      waypoints?: LatLng[];
      router?: IRouter;
      plan?: Plan;
      geocoder?: any;
      fitSelectedRoutes?: boolean | "smart";
      lineOptions?: LineOptions;
      routeLine?: (route: IRoute, options: LineOptions) => Polyline;
      autoRoute?: boolean;
      routeWhileDragging?: boolean;
      routeDragInterval?: number;
      waypointMode?: "snap" | "straight";
      useZoomParameter?: boolean;
      show?: boolean;
      collapsible?: boolean;
      showAlternatives?: boolean;
      altLineOptions?: LineOptions;
      createMarker?: (
        waypointIndex: number,
        waypoint: Waypoint,
        numberOfWaypoints: number
      ) => Marker | null | undefined;
      formatter?: Formatter;
      summaryTemplate?: (data: any) => string;
      containerClassName?: string;
      language?: string;
      units?: "metric" | "imperial";
      reverseWaypoints?: boolean;
      addWaypoints?: boolean;
      draggableWaypoints?: boolean;
    }

    interface Control extends L.Control {}
    interface Plan extends L.Control {} // L.Routing.Plan juga merupakan control
    interface Waypoint {
      latLng: LatLng;
      name?: string;
      options?: any; // Waypoint options
    }
    interface IRouter {} // Base interface for router
    interface LineOptions {
      styles?: PathOptions[];
      addWaypoints?: boolean;
      extendToWaypoints?: boolean;
      missingRouteStyles?: PathOptions[];
    }
    interface IRoute {} // Base interface for route
    interface Formatter {} // Base interface for formatter

    function control(options: ControlOptions): Control;
    function osrmv1(options?: OSRMv1Options): IRouter; // Jika menggunakan OSRM v1 secara eksplisit
  }

  // Tambahan jika OSRMv1Options diperlukan secara spesifik
  interface OSRMv1Options {
    serviceUrl?: string;
    timeout?: number;
    routingOptions?: any;
    profile?: string;
  }
}

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

    // Pastikan L.Routing dan L.Routing.control ada
    if (!L.Routing || !L.Routing.control) {
      console.error("Leaflet Routing Machine tidak termuat dengan benar.");
      return;
    }

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(destination[0], destination[1]),
      ],
      routeWhileDragging: false, // Jangan kalkulasi ulang rute saat marker di-drag
      addWaypoints: false, // Sembunyikan tombol untuk menambah waypoint
      draggableWaypoints: false, // Waypoint tidak bisa di-drag
      fitSelectedRoutes: true, // Sesuaikan zoom peta dengan rute yang dipilih
      show: false, // Sembunyikan panel instruksi rute (hanya tampilkan garis)
      createMarker: () => null, // Jangan buat marker baru dari routing machine (kita sudah punya marker sendiri)
      lineOptions: {
        styles: [{ color: "deepskyblue", opacity: 0.8, weight: 5 }], // Styling garis rute
      },
    }).addTo(map);

    // Fungsi cleanup untuk menghapus control ketika komponen di-unmount atau dependensi berubah
    return () => {
      if (routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [map, userLocation, destination]); // Efek ini akan dijalankan ulang jika map, userLocation, atau destination berubah

  return null; // Komponen ini tidak me-render elemen DOM secara langsung
};

export default RoutingMachine;
