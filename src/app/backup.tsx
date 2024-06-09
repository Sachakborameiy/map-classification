"use client";
import { ChevronDown } from "lucide-react";
import { setDriver } from "mongoose";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { fetchData } from "../../util";
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';

interface ProvinceCity {
  name: string;
}

interface Districts {
  name: string;
}

export default function MapClassification() {
  const [provinces, setProvinces] = useState<ProvinceCity[]>([]);
  const [districts, setDistricts] = useState<Districts[]>([]);
  const [commues, setCommues] = useState<Districts[]>([]);
  const [villages, setvillages] = useState<Districts[]>([]);
  const [mapdata, setMapData] = useState<Districts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setselectedDistrict] = useState<string>("");
  const [selecteCommue, setselecteCommue] = useState<string>("");
  const [selecteVillage, setselecteVillage] = useState<string>("");
  const [shouldRunEffect, setShouldRunEffect] = useState(false);
  
  interface config {
    method: string;
    resName: string;
    headers?: {
      headers: {
        accept: "application/json";
        "Content-Type": "application/x-www-form-urlencoded";
      };
    };
  }

  useEffect(() => {
    let url = "http://localhost:8100/province_city";
    fetchData(
      url,
      null,
      { method: "GET", resName: "province_city" },
      setProvinces
    );
  }, []);

  useEffect(() => {
    if (shouldRunEffect) {
      const data = new URLSearchParams();
      data.append("district_khan_krong", selectedProvince);
      let url = "http://localhost:8100/district_khan_krong_name/";
      fetchData(
        url,
        data,
        { method: "POST", resName: "districts" },
        setDistricts,
        setselectedDistrict
      );
    } else {
      // setShouldRunEffect(false);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (shouldRunEffect) {
      const data = new URLSearchParams();
      data.append("province_city", selectedProvince);
      data.append("district_khan_krong", selectedDistrict);
      let url = "http://localhost:8100/commune/";
      fetchData(
        url,
        data,
        { method: "POST", resName: "commune_sangket" },
        setCommues,
        setselecteCommue
      );
    } else {
      // setShouldRunEffect(false)
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (shouldRunEffect) {
      const data = new URLSearchParams();
      data.append("province_city", selectedProvince);
      data.append("district_khan_krong", selectedDistrict);
      data.append("commune_sangket", selecteCommue);
      let url = "http://localhost:8100/village_name/";
      fetchData(
        url,
        data,
        { method: "POST", resName: "villages" },
        setvillages,
        setselecteVillage
      );
    } else {
      // setShouldRunEffect(false)
    }
  }, [selecteCommue]);

  useEffect(() => {
    if (shouldRunEffect) {
      const data = new URLSearchParams();
      data.append("province_city", selectedProvince);
      data.append("district_khan_krong", selectedDistrict);
      data.append("commune_sangket", selecteCommue);
      data.append("village", selecteVillage);
      let url = "http://localhost:8100/price_land_book/";
      fetchData(url, data, { method: "POST", resName: null }, setMapData);
    } else {
      setShouldRunEffect(false);
    }
  }, [selecteVillage]);
  
  useEffect(() => {
    if (shouldRunEffect) {
      const data = new URLSearchParams();
      data.append("province_city", selectedProvince);
      data.append("district_khan_krong", selectedDistrict);
      data.append("commune_sangket", selecteCommue);
      data.append("village", selecteVillage);
      let url = "http://localhost:8100/price_land_book/";
      fetchData(url, data, { method: "POST", resName: null }, setMapData);
    } else {
      setShouldRunEffect(false);
    }
  }, [selecteVillage]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Add your API key here
  });

  const center = useMemo(() => ({ lat: 40.7128, lng: -74.0060 }), []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <main className="flex flex-col m-auto fixed w-full">
      <div
        className="flex-1 bg-[#F5F5F5] rounded-md w-full sh m-auto p-4 pl-5 mt-2 "
        style={{ width: "99%" }}
      >
        <span className="text-[#3399FF] font-thin">
          Land Classification Book
        </span>
      </div>

      <div
        className="flex-1 bg-white rounded-md mt-2 w-full m-auto"
        style={{ width: "99%" }}
      >
        <div
          className="ml-2"
          style={{ fontFamily: "MyFont, sans-serif", maxWidth: "30rem" }}
        >
          <div className="mt-2">
            <div className=" rounded-lg p-0.5 pl-4">
              <div className="flex">
                <div className="mt-2 w-[25%]">
                  <label className="block text-sm font-medium  text-gray-700">
                    ខេត្ត/រាជធានី
                  </label>
                </div>
                <div className="w-[75%] relative">
                  <div>
                    <select
                      className="w-full p-2 mb-4 outline-none cursor-pointer sm:text-sm border shadow-sm
                        border-[#64d1ff] rounded-md appearance-none"
                      id="province_city"
                      name="province_city"
                      // value={selectedProvince}
                      onChange={(event) => {
                        setSelectedProvince(event.target.value);
                        setShouldRunEffect(true);
                      }}
                      // onChange={handleSelectChange}
                    >
                      <option className="text-gray-400">
                        សូមជ្រើសរើស ខេត្ត/រាជធានី
                      </option>
                      {/* <option value="option1">គ្មានទិន្នន័យ</option> */}
                      {provinces &&
                        provinces.map((province_city, index) => (
                          <option
                            key={index}
                            value={province_city.name.split("*")[0]}
                          >
                            {province_city.name.split("*")[0]}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="absolute  top-3 right-2">
                    <ChevronDown className="text-sky-[#1B3351] size-5" />
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className="mt-1.5 w-[25%]">
                  <label className="block text-sm font-medium text-gray-700 pb-2">
                    ស្រុក/ក្រុង/ខណ្ខ
                  </label>
                </div>
                <div className="w-[75%] relative" style={{marginTop: "-0.5em"}}>
                  <div>
                    <select
                      onChange={(event) => {
                        setselectedDistrict(event.target.value);
                        setShouldRunEffect(false);
                      }}
                      className="w-full p-2 mb-4 outline-none cursor-pointer sm:text-sm border shadow-sm border-[#64d1ff] rounded-md appearance-none"
                    >
                      <option
                        value=""
                        className="text-gray-400"
                        // disabled
                        selected
                      >
                        សូមជ្រើសរើស ស្រុក/ក្រុង/ខណ្ខ
                      </option>
                      {districts.length > 0 ? (
                        districts.map((province_city, index) => (
                          <option
                            key={index}
                            value={province_city.name.split("*")[0]}
                          >
                            {province_city.name.split("*")[0]}
                          </option>
                        ))
                      ) : (
                        <option
                          value=""
                          className="text-gray-400"
                          disabled
                          selected
                        >
                          សូមជ្រើសរើស ស្រុក/ក្រុង/ខណ្ខ
                        </option>
                      )}
                    </select>
                  </div>
                  <div className="absolute  top-3 right-2">
                    <ChevronDown className="text-sky-[#1B3351] size-5" />
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className="mt-1.5 w-[25%]">
                  <label className="block text-sm font-medium text-gray-700 pb-2">
                    ឃុំ/សង្កាត់
                  </label>
                </div>
                <div className="w-[75%] relative" style={{marginTop: "-0.5em"}}>
                  <div>
                    <select
                      onChange={(event) => {
                        setselecteCommue(event.target.value);
                        setShouldRunEffect(false);
                      }}
                      className="w-full p-2 mb-4 outline-none cursor-pointer sm:text-sm border shadow-sm border-[#64d1ff] rounded-md appearance-none"
                    >
                      {commues.length > 0 ? (
                        commues.map((province_city, index) => (
                          <option
                            key={index}
                            value={province_city.name.split("*")[0]}
                          >
                            {province_city.name.split("*")[0]}
                          </option>
                        ))
                      ) : (
                        <option
                          value=""
                          className="text-gray-400"
                          disabled
                          selected
                        >
                          សូមជ្រើសរើស ឃុំ/សង្កាត់
                        </option>
                      )}
                    </select>
                  </div>
                  <div className="absolute  top-3 right-2">
                    <ChevronDown className="text-sky-[#1B3351] size-5" />
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className="mt-1.5 w-[25%]">
                  <label className="block text-sm font-medium text-gray-700 pb-2">
                    ភូមិ
                  </label>
                </div>
                <div className="w-[75%] relative" style={{marginTop: "-0.5em"}}>
                  <div>
                    <select
                      onChange={(event) => {
                        setselecteVillage(event.target.value);
                        setShouldRunEffect(false);
                      }}
                      className="w-full p-2 mb-4 outline-none cursor-pointer sm:text-sm border shadow-sm border-[#64d1ff] rounded-md appearance-none"
                    >
                      {villages.length > 0 ? (
                        villages.map((province_city, index) => (
                          <option
                            key={index}
                            value={province_city.name.split("*")[0]}
                          >
                            {province_city.name.split("*")[0]}
                          </option>
                        ))
                      ) : (
                        <option
                          value=""
                          className="text-gray-400"
                          disabled
                          selected
                        >
                          សូមជ្រើសរើស ភូមិ
                        </option>
                      )}
                    </select>
                  </div>
                  <div className="absolute  top-3 right-2">
                    <ChevronDown className="text-sky-[#1B3351] size-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div 
          className="flex-1 m-auto " 
          style={{ width: "99%" }}
          
        >
        <div 
          className="bg-white mt-1 rounded-md relative shadow-sm"
          style={{
            height: "100vh",
          }}
        >
          <div className="mt-2 p-4">
            {/* <div className="flex" style={{ width: "100%" }}>
              <div className="w-2 h-2 mt-2"></div>
              <div className="ml-2">
                <label className="block text-md font-extrabold text-gray-700">
                  ទីតាំង​ដែលបានជ្រើសរើស
                </label>
              </div>
            </div> */}
          </div>
          <div>
            <div className="flex items-center justify-center m-auto ">
              {/* test */}
              <div className="shadow-md rounded-lg overflow-scroll absolute top-7 bg-white opacity-90 z-50 border shadow-gray-400 " style={{ width: "85%" }}>
                <table className="table-custom table-auto overflow-y-auto scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-red-100" style={{ width: "100%", tableLayout: "fixed" }}>
                  <thead className="bg-[#1B3351] text-white">
                    <tr className="">
                      <th className="font-normal border px-4 py-2 text-sm w-40">ខេត្ត/រាជធានី</th>
                      <th className="font-normal border px-4 py-2 text-sm w-40">កូដ ខេត្ត/រាជធានី</th>
                      <th className="font-normal border px-4 py-2 text-sm" style={{width: "7.5em"}}>សាខា</th>
                      <th className="font-normal border px-4 py-2 text-sm" style={{width: "7.5em"}}>កូដ សាខា</th>
                      <th className="font-normal border px-4 py-2 text-sm w-40">ស្រុក/ខណ្ឌ/ក្រុង</th>
                      <th className="font-normal border px-4 py-2 text-sm w-40">កូដ ស្រុក/ខណ្ឌ/ក្រុង</th>
                      <th className="font-normal border px-4 py-2 text-sm w-40">ឃុំ/សង្កាត់</th>
                      <th className="font-normal border px-4 py-2 text-sm w-40">កូដ ឃុំ/សង្កាត់</th>
                      <th className="font-normal border px-4 py-2 text-sm w-40">លេខទូរស័ព្ទ ឃុំ/សង្កាត់</th>
                      <th className="font-normal border px-4 py-2 text-sm w-40">លេខទូរស័ព្ទ មេភូមិ</th>
                      <th className="font-normal border px-4 py-2 text-sm w-40" style={{width: "8.5em"}}>ចំនួន គ្រួសារ</th>
                      <th className="font-normal border px-4 py-2 text-sm w-40">L-Map (ភាគរយ)</th>
                      <th className="font-normal border px-4 py-2 text-sm w-40" style={{width: "7em"}}>ចំណាត់ថ្នាក់</th>
                      <th className="font-normal border px-4 py-2 text-sm w-40" style={{width: "95em"}}>កម្រិតទីតាំង</th>
                      <th className="font-normal border px-4 py-2 text-sm w-40">ដីពាណិជ្ជកម្ម C1</th>
                      <th className="font-normal border px-4 py-2 text-sm w-40">ដីពាណិជ្ជកម្ម C2</th>
                      <th className="font-normal border px-4 py-2 text-sm w-40">ដីពាណិជ្ជកម្ម C3</th>
                      <th className="font-normal border px-4 py-2 text-sm w-40">ដីលំនៅឋាន R1</th>
                      <th className="font-normal border px-4 py-2 text-sm w-40">ដីលំនៅឋាន R2</th>
                      <th className="font-normal border px-4 py-2 text-sm w-40">ដីលំនៅឋាន R3</th>
                      <th className="font-normal border px-4 py-2 text-sm w-40">ដីឧស្សាហកម្ម I1</th>
                      <th className="font-normal border px-4 py-2 text-sm w-40">ដីឧស្សាហកម្ម I3</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mapdata &&
                      mapdata.map((item: any, index: number) => (
                        <tr key={index} className="border-b hover:bg-[#284870] hover:text-white bg-gray-100 cursor-pointer">
                          <td className="border px-4 py-2 text-sm">{item["ខេត្ត/រាជធានី"]}</td>
                          <td className="border px-4 py-2 text-sm">{item["កូដ ខេត្ត/រាជធានី "]}</td>
                          <td className="border px-4 py-2 text-sm">{item["សាខា"]}</td>
                          <td className="border px-4 py-2 text-sm">{item["កូដ សាខា"]}</td>
                          <td className="border px-4 py-2 text-sm">{item["ស្រុក/ខណ្ឌ/ក្រុង"]}</td>
                          <td className="border px-4 py-2 text-sm">{item["កូដ ស្រុក/ខណ្ឌ/ក្រុង"]}</td>
                          <td className="border px-4 py-2 text-sm">{item["ឃុំ/សង្កាត់"]}</td>
                          <td className="border px-4 py-2 text-sm">{item["កូដ ឃុំ/សង្កាត់"]}</td>
                          <td className="border px-4 py-2 text-sm">{item["លេខទូរស័ព្ទ ឃុំ/សង្កាត់"]}</td>
                          <td className="border px-4 py-2 text-sm">{item["លេខទូរស័ព្ទ មេភូមិ"]}</td>
                          <td className="border px-4 py-2 text-sm">{item["ចំនួន គ្រួសារ"]}</td>
                          <td className="border px-4 py-2 text-sm">{item["L-Map (ភាគរយ)"]}</td>
                          <td className="border px-4 py-2 text-sm">{item["ចំណាត់ថ្នាក់"]}</td>
                          <td className="border px-4 py-2 text-sm line-clamp-3">{item["កម្រិតទីតាំង"]}</td>
                          <td className="border px-4 py-2 text-sm">{item["ចំណាត់ថ្នាក់"]}</td>
                          <td className="border px-4 py-2 text-sm">{item["ដីពាណិជ្ជកម្ម C1"]}</td>
                          <td className="border px-4 py-2 text-sm">{item["ដីពាណិជ្ជកម្ម C2 "]}</td>
                          <td className="border px-4 py-2 text-sm">{item["ដីពាណិជ្ជកម្ម C3"]}</td>
                          <td className="border px-4 py-2 text-sm">{item["ដីលំនៅឋាន R1"]}</td>
                          <td className="border px-4 py-2 text-sm">{item["ដីលំនៅឋាន R2"]}</td>
                          <td className="border px-4 py-2 text-sm">{item["ដីលំនៅឋាន R3"]}</td>
                          <td className="border px-4 py-2 text-sm">{item["ដីឧស្សាហកម្ម I1"]}</td>
                          <td className="border px-4 py-2 text-sm">{item["ដីឧស្សាហកម្ម I2"]}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* <div className="w-full h-screen flex flex-col">
              <div className="flex-1 h-[40vh] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d3908.7812834525052!2d104.8896271748692!3d11.567531138633484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m3!3m2!1d11.5675227!2d104.89225789999999!4m3!3m2!1d11.567407!2d104.89189309999999!5e0!3m2!1sen!2skh!4v1717375442940!5m2!1sen!2skh"
                  className="border-0 w-full h-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                >
                </iframe>              
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div>
        <h1>Google Map</h1>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '500px' }}
          center={center}
          zoom={10}
        >
          <Marker position={center} />
        </GoogleMap>
      </div>
    </main>
  );
}
