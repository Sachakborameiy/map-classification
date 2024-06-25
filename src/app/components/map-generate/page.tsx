"use client";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import type { NextPage } from "next";
import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import Loading from "../custom/loading";
import { Maximize, Minimize } from "lucide-react";

interface Pointer {
  lng: number;
  lat: number;
}

interface MapAPIProps {
  pointer: Pointer;
}

const MapAPIs: NextPage<MapAPIProps> = (props) => {
  const [loading, setLoading] = useState("");
  const [iframeCode, setIframeCode] = useState("");
  const pointer = props.pointer;
  const libraries = useMemo(() => ["places"], []);
  const [zoom, setZoom] = useState(14);
  const mapRef = useRef<google.maps.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapCenter = useMemo(
    () => ({ lat: +pointer.lat, lng: +pointer.lng }),
    [pointer]
  );
  const [layers, setLayers] = useState({
    traffic: false,
    transit: false,
    bicycle: false,
    terrain: false,
    satellite: false,
  });

  const toggleLayer = (layer: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
    console.log(layers, "layers");
  };

  const [isToggleFullScreenView, setIsToggleFullScreenView] = useState(true);

  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      mapContainerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }

    setIsToggleFullScreenView(!isToggleFullScreenView);
  };

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: true,
      zoomControl: true,
      mapTypeControl: true,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries as any,
  });

  useEffect(() => {
    const handleRightClick = (event: MouseEvent) => {
      if (event.button === 2) {
        generateIframeCode();
        copyToClipboard();
      }
    };

    document.addEventListener("contextmenu", handleRightClick);

    return () => {
      document.removeEventListener("contextmenu", handleRightClick);
    };
  }, [pointer]);

  const generateIframeCode = () => {
    const latitude = pointer.lat;
    const longitude = pointer.lng;

    const code = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.286504980551!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1631947602489!5m2!1sen!2sfr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;

    setIframeCode(code);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(iframeCode).then(() => {
      console.log("Iframe code copied to clipboard");
    });
  };

  if (!isLoaded) {
    return (
      <div className="absolute top-1/2 left-1/2">{loading && <Loading />}</div>
    );
  }

  return (
    <div className="w-full relative" ref={mapContainerRef}>
      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{
          width: "100%",
          height: isFullScreen ? "100vh" : "67vh",
          borderRadius: "5px",
        }}
        onLoad={(map) => {
          mapRef.current = map;
          console.log("Map Loaded");
        }}
        onZoomChanged={() => {
          console.log("zoom");
        }}
      >
        <MarkerF
          position={mapCenter}
          onLoad={() => console.log("Marker Loaded")}
        />
      </GoogleMap>

      <button
        onClick={toggleFullScreen}
        className="absolute top-2.5 right-2.5 bg-white text-white p-2.5 rounded"
      >
        {isToggleFullScreenView ? (
          <div className="flex">
            <span>
              <Maximize className="w-5 h-5 text-black" />
            </span>
          </div>
        ) : (
          <div className="flex">
            <span>
              <Minimize className="w-5 h-5 text-black" />
            </span>
          </div>
        )}
      </button>
    </div>
  );
};

export default MapAPIs;
