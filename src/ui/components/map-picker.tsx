"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"

// Dynamically import Leaflet components
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
import { useMapEvents } from "react-leaflet"

// Import Leaflet CSS globally or via CSS module to avoid redundant loading
import "leaflet/dist/leaflet.css"

// Fix Leaflet marker icon issue
const LeafletInitializer = () => {
  useEffect(() => {
    const L = require("leaflet")
    delete L.Icon.Default.prototype._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })
  }, [])
  return null
}

interface MapPickerProps {
  onLocationChange: (lat: number, lng: number) => void
  initialLat?: number
  initialLng?: number
}

function LocationMarker({ onLocationChange }: { onLocationChange: (lat: number, lng: number) => void }) {
  const [position, setPosition] = useState<any | null>(null)

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng)
      onLocationChange(e.latlng.lat, e.latlng.lng)
    },
  })

  useEffect(() => {
    map.locate()
  }, [map])

  useEffect(() => {
    map.on("locationfound", (e) => {
      setPosition(e.latlng)
      onLocationChange(e.latlng.lat, e.latlng.lng)
      map.flyTo(e.latlng, map.getZoom())
    })
  }, [map, onLocationChange])

  return position === null ? null : <Marker position={position} />
}

export default function MapPicker({ onLocationChange, initialLat = 41.3, initialLng = 69.2 }: MapPickerProps) {
  const t = useTranslations("MapPicker")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="h-[300px] w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">{t("loading")}</p>
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full z-0">
      <LeafletInitializer />
      <MapContainer
        center={[initialLat, initialLng]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onLocationChange={onLocationChange} />
      </MapContainer>
    </div>
  )
}