'use client'

import Map, { Marker, FullscreenControl, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { LONGITUDE, LATITUDE, ZOOM } from 'library/fix-values'

export default function EmbedMap() {
  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiaGFkaWttYW4iLCJhIjoiY2twc2MybWt5MTF6czJxczR1ZGNqd3N6NSJ9.UA1qAc3pGYraATf9kGt5DQ"
      initialViewState={{
        longitude: LONGITUDE,
        latitude: LATITUDE,
        zoom: ZOOM,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <FullscreenControl />
      <NavigationControl />
      <Marker longitude={LONGITUDE} latitude={LATITUDE} color="red" />
    </Map>
  )
}
