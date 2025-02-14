'use client'

import { useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

interface MapPickerProps {
  id: string
  value: string
  onChange: (location: string) => void
}

const containerStyle = {
  width: '100%',
  height: '400px'
}

const center = {
  lat: 0,
  lng: 0
}

export function MapPicker({ id, value, onChange }: MapPickerProps) {
  const [marker, setMarker] = useState(null)

  const handleMapClick = (event) => {
    const lat = event.latLng.lat()
    const lng = event.latLng.lng()
    setMarker({ lat, lng })
    onChange(`${lat},${lng}`)
  }

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
        onClick={handleMapClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </LoadScript>
  )
}

