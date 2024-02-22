import React, { useRef, useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import { auth } from '../../Config/firebase/DB';

export default function MyMap() {
  const [user, setUser] = useState();
  const [location, setLocation] = useState()
  const [Viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: '24.8827022',
    longitude: '67.0669543',
    zoom: 16,
  });
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    navigator.geolocation.getCurrentPosition((location) => {
      const { latitude, longitude } = location.coords
      setLocation({ latitude, longitude })
    })

    return () => {
      unsubscribe();
    };
  }, []);

console.log(location)
  return (
    <div className="map-wrap">

      {location && <Map
        mapboxAccessToken="pk.eyJ1IjoiYmVuZWhta2UiLCJhIjoiY2plYTl6b3c2MHg5ODJxbGV4aXR4Z3p6YSJ9.d3jSAbsqSmpJwyVcp9iXbw"
        initialViewState={{
          longitude: location.longitude,
          latitude: location.latitude,
          zoom: 16
        }}
        style={{ width: 300, height: 300, overflow: 'hidden' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          draggable={true}
          onDragEnd={e => console.log(e)}
          offsetLeft={-20}
          offsetTop={-10}
          longitude={location.longitude} latitude={location.latitude} anchor="center" >
          <p
            role="img"
            className="cursor-pointer text-2xl animate-bounce"
            aria-label="pin"
          >
            📍
          </p>
        </Marker>
      </Map>}

    </div>
  );
}
