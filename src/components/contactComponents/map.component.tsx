"use client";

// @ts-ignore
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// @ts-ignore
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function MapSection() {
  // Default coordinates
  const markers = [
    { position: [37.7749, -122.4194], label: "123 Premium Street, Commerce City, CC 12345" },
    // Add more markers if needed
    // { position: [37.7849, -122.4094], label: "Branch Office" }
  ];

  return (
    <div className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Find Us
        </h2>

        <div className="rounded-lg overflow-hidden w-full h-[500px] sm:h-[600px] md:h-[700px]">
          <MapContainer
            center={markers[0].position}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-full"
            aria-label="Company Location Map"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {markers.map((marker, index) => (
              <Marker key={index} position={marker.position}>
                <Popup>{marker.label}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
