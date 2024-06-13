"use client";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import type { NextPage } from "next";
import { useMemo, useState, useEffect } from "react";
import Loading from "../custom/loading";
import { useCallback, useRef } from "react";

interface FilterData {
  province_city: string;
  district_khan_krong: string;
  commune: string;
  village: string;
}
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
  console.log(+pointer.lat, "pointer");
  const libraries = useMemo(() => ["places"], []);
  const [zoom, setZoom] = useState(14);
  const mapRef = useRef<google.maps.Map | null>(null);
  const mapCenter = useMemo(
    () => ({ lat: +pointer.lat, lng: +pointer.lng }),
    // () => ({ lat: 11.556608470019766, lng: 104.92802533397543 }),
    // () => ({ lat: 27.672932021393862, lng: 85.31184012689732 }),

    [pointer]
  );
  const [layers, setLayers] = useState({
    traffic: false,
    transit: false,
    bicycle: false,
    terrain: false,
    satellite: false,
  });

  const trafficLayerRef = useRef<google.maps.TrafficLayer | null>(null);
  const transitLayerRef = useRef<google.maps.TransitLayer | null>(null);
  const bicycleLayerRef = useRef<google.maps.BicyclingLayer | null>(null);

  const toggleLayer = (layer: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
    console.log(layers, "layers");
  };

  const addLayers = (map: google.maps.Map) => {
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    const transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);

    const bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);

    // Add more layers if needed
  };
  console.log(mapCenter, "mapcenter");
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
    // googleMapsApiKey: "AIzaSyBuuXdwiiUumdY5eGtC4fXs8cxHqHGp-cg",
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
    <div className="w-full relative">
      <GoogleMap
        options={{
          disableDefaultUI: false,
          clickableIcons: true,
          scrollwheel: true,
          zoomControl: true,
          mapTypeControl: true,
        }}
        zoom={14}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{
          width: "100%",
          height: "auto",
          minHeight: "55vh",
          maxHeight: "55vh",
          borderRadius: "5px",
        }}
        onLoad={(map) => {
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

      {/* <div>
        <div className="max-w-screen-lg mx-auto p-6">
          <div className="bg-gray-100 p-4 rounded-md">
            <textarea
              className="w-full h-32 p-2 bg-gray-200 rounded-md resize-none"
              value={iframeCode}
              readOnly
            ></textarea>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MapAPIs;
