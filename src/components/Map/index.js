import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [location, setLocation] = useState({
    latitude: '24.8827022',
    longitude: '67.0669543',
  });
  const [zoom] = useState(20);
  maptilersdk.config.apiKey = 'uO6DKSsmxkUn0IFUhXpU';

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((currentLocation) => {
      const { latitude, longitude } = currentLocation.coords;
      setLocation({ latitude, longitude });
      console.log(currentLocation)
    }, (error) => {
      console.error("Error getting geolocation:", error);
    });
  }, []);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [location.longitude, location.latitude],
      zoom: zoom
    });
    console.log(map.current);

  }, [mapContainer, map, location.longitude, location.latitude, zoom]);
  console.log(map.current);

  return (
    <div className="map-wrap">
      <iframe width="400" height="300" src={`https://api.maptiler.com/maps/basic-v2/?key=uO6DKSsmxkUn0IFUhXpU#1.0/${location.latitude}/${location.longitude}`}></iframe>
    </div>
  );
}
