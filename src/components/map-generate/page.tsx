// pages/index.tsx
"use client";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import type { NextPage } from "next";
import { useMemo, useState } from "react";
import Loading from "../custom/loading";

interface FilterData {
  province_city: string;
  district_khan_krong: string;
  commune: string;
  village: string;
}
interface Pointer {
  lng: number,
  lat : number
}

interface MapAPIProps {
  filterData: FilterData;
  pointer: Pointer
}

const MapAPIs: NextPage<MapAPIProps> = (props) => {
  const pointer = props.pointer;
  console.log(+pointer.lat,'pointer')
  const libraries = useMemo(() => ["places"], []);
  const mapCenter = useMemo(
    () => ({ lat: +pointer.lat, lng: +pointer.lng }),
    // () => ({ lat: 11.556608470019766, lng: 104.92802533397543 }),
    // () => ({ lat: 27.672932021393862, lng: 85.31184012689732 }),
    // 11.556608470019766, 104.92802533397543

    // {
    //   "lat": "11.896710772643601",
    //   "lng": "105.16260255453558"
    // }
     
    [pointer]
  );

  console.log(mapCenter,'mapcenter');

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  const [loading, setLoading] = useState("");

  if (!isLoaded) {
    return (
      <div className="absolute top-1/2 left-1/2">{loading && <Loading />}</div>
    );
  }

  return (
    <div className="w-full">

      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '100%', height: '55vh', borderRadius: "5px" }}
        onLoad={(map) => console.log("Map Loaded")}
      >
        <MarkerF
          position={mapCenter}
          onLoad={() => console.log("Marker Loaded")}
        />
      </GoogleMap>
    </div>
  );
};

export default MapAPIs;
