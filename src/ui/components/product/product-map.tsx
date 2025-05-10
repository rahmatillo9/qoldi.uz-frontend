
'use client'

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin, Maximize2 } from "lucide-react";
import { ProductMapProps } from "./type";
import { Button } from "@heroui/react";

// Leaflet ikonkasini sozlash (default ikonka muammosini hal qilish uchun)
// Removed invalid property deletion as it is not required
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Modal ochilganda xaritani yangilash uchun hook
function MapUpdater() {
  const map = useMap();
  useEffect(() => {
    // Modal ochilganda xarita o'lchamlarini yangilash
    map.invalidateSize();
  }, [map]);
  return null;
}

export default function ProductMap({ latitude, longitude, title }: ProductMapProps) {
  const t = useTranslations("ProductDetail");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="mt-6 bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 shadow-lg">
        <div className="flex flex-col md:flex-row">
          {/* Right side info (avval chapda edi) */}
          <div className="p-4 md:p-5 md:w-1/3 md:order-2">
            <div className="flex items-center mb-3">
              <MapPin className="h-5 w-5 text-emerald-500 mr-2" />
              <h2 className="text-lg font-bold text-gray-100">{t("locationOnMap")}</h2>
            </div>
            <p className="text-gray-300 mb-4 text-sm">{title}</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Maximize2 className="h-4 w-4 mr-1" />
              <span>{t("expandMap")}</span>
            </button>
          </div>

          {/* Left side map (avval o'ngda edi) */}
          {!isModalOpen && (
            <div
              className="md:w-2/3 h-[180px] relative group md:order-1"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                <span className="text-white text-sm font-medium px-3 py-1 bg-gray-900/80 rounded-full">
                  {t("clickToExpand")}
                </span>
              </div>
              <MapContainer
                center={[latitude, longitude]}
                zoom={14}
                style={{ height: "100%", width: "100%", position: "relative", zIndex: 0 }}
                scrollWheelZoom={true}
                dragging={true}
              >

                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                  position={[latitude, longitude]}
                  icon={
                    new L.Icon({
                      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                    })
                  }
                >
                  <Popup>{title}</Popup>
                </Marker>
                <MapUpdater />
              </MapContainer>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-xl p-5 w-11/12 md:w-3/4 lg:w-2/3 max-h-[90vh] relative border border-gray-700 shadow-2xl">
          <Button
  onClick={() => setIsModalOpen(false)}
  className="absolute top-3 right-3 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-colors z-10"
  aria-label="Close"
>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Left side map (modal ichida ham o'zgartiramiz) */}
              <div className="w-full md:w-2/3 h-[500px] rounded-lg overflow-hidden border border-gray-700 md:order-1">
                <MapContainer
                  center={[latitude, longitude]}
                  zoom={14}
                  style={{ height: "100%", width: "100%",  position: "relative", zIndex: 0 }}
                  scrollWheelZoom={true}
                  dragging={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker
                    position={[latitude, longitude]}
                    icon={
                      new L.Icon({
                        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                      })
                    }
                  >
                    <Popup>{title}</Popup>
                  </Marker>
                  <MapUpdater />
                </MapContainer>
              </div>
              {/* Right side info (modal ichida ham o'zgartiramiz) */}
              <div className="md:w-1/3 md:order-2">
                <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 text-emerald-500 mr-2" />
                  {t("locationOnMap")}
                </h2>
                <div className="text-gray-300 text-sm">
                  <p>{title}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {t("coordinates")}: {latitude.toFixed(6)}, {longitude.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
