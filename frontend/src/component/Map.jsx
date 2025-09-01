import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Map() {
  const token =
    "pk.eyJ1IjoibXVuZWViMTIxMiIsImEiOiJjbWYwc3puejAwNWJvMmlzYTJweTR6cm82In0.3vEToFFBnpqNJw4s5lLSnw";
  mapboxgl.accessToken = token;
  const mapRef = useRef(null);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current,

      center: [73.0362, 33.6996],
      zoom: 9,
    });
    const el = document.createElement("div");
    el.className = "custom-marker";
    el.style.backgroundImage =
      "url('https://i.postimg.cc/90p4DPC7/emoji-png.png')";
    el.style.width = "50px";
    el.style.height = "50px";
    el.style.backgroundSize = "cover";
    el.style.borderRadius = "50%";
    map.on("load", () => {
      new mapboxgl.Marker(el).setLngLat([73.0362, 33.6996]).addTo(map);
    });
    return () => map.remove();
  });
  return <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>;
}

export default Map;
