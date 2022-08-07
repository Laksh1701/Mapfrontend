import { useState, useRef, useEffect, forwardRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { MAP_ACCESS_TOKEN } from "./constant";
import "mapbox-gl/dist/mapbox-gl.css";
import "./style/MapBox.css";

mapboxgl.accessToken = MAP_ACCESS_TOKEN;

const MapRoute = forwardRef(() => {
  const [mapBasics, setMapBasics] = useState({
    lng: 5,
    lat: 34,
    zoom: 2,
  });

  const [currentSiteView, setCurrentSiteView] = useState(
    "mapbox://styles/mapbox/light-v10"
  );
  const mapRoutes = useRef("");

  const getMap = () => {
    return (mapRoutes.current = new mapboxgl.Map({
      container: "map_routes",
      style: currentSiteView,
      center: [mapBasics.lng, mapBasics.lat],
      zoom: mapBasics.zoom,
    }));
  };

  const directions = new MapboxDirections({
    accessToken: MAP_ACCESS_TOKEN,
    unit: "metric",
    profile: "mapbox/driving",
  });

  const getUserLocation = new mapboxgl.GeolocateControl({
    trackUserLocation: true,
    showUserLocation: true,
  });

  useEffect(() => {
    const getmapRoute = getMap();

    getmapRoute.addControl(directions, "top-left");
    getmapRoute.addControl(getUserLocation, "top-right");
    return () => {
      getmapRoute.remove();
    };
  }, [currentSiteView]);

  return (
    <>
      <section className="direction_map">
        <div
          ref={mapRoutes}
          id="map_routes"
          style={{ margin: "auto", height: "80vh", position: "relative" }}
        ></div>
        <div style={{ marginBlock: "15px" }}>
          <button
            style={{ marginInline: "5px" }}
            onClick={() =>
              setCurrentSiteView("mapbox://styles/mapbox/streets-v11")
            }
          >
            Street view
          </button>

          <button
            style={{ marginInline: "5px" }}
            onClick={() =>
              setCurrentSiteView("mapbox://styles/mapbox/satellite-streets-v11")
            }
          >
            Sattelite view map
          </button>

          <button
            style={{ marginInline: "5px" }}
            onClick={() =>
              setCurrentSiteView("mapbox://styles/mapbox/light-v10")
            }
          >
            Light Mode
          </button>

          <button
            style={{ marginInline: "5px" }}
            onClick={() =>
              setCurrentSiteView("mapbox://styles/mapbox/dark-v10")
            }
          >
            Dark Mode
          </button>
        </div>
      </section>
    </>
  );
});
export default MapRoute;
