"use client";
import { ChevronDown, Download, Minus, MinusIcon, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import { setDriver } from "mongoose";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { fetchData } from "../../../util";
import MapAPIs from "@/app/components/map-generate/page";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import LegendTable from "@/app/components/map-generate/LegendTable";
import exportToExcel from "@/app/components/map-generate/exportToexcel";
interface ProvinceCity {
  name: string;
}

interface Districts {
  name: string;
}

interface FilterData {
  province_city: string;
  district_khan_krong: string;
  commune: string;
  village: string;
}


export default function MapClassification() {
  const [provinces, setProvinces] = useState<ProvinceCity[]>([]);
  const [districts, setDistricts] = useState<Districts[]>([]);
  const [communes, setCommunes] = useState<Districts[]>([]);
  const [villages, setVillages] = useState<Districts[]>([]);
  const [mapdata, setMapData] = useState<FilterData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedCommune, setSelectedCommune] = useState<string>("");
  const [selectedVillage, setSelectedVillage] = useState<string>("");
  const [shouldRunEffect, setShouldRunEffect] = useState(false);
  const [pointer,setPointer] = useState({lng: 104.92802533397543 ,lat:11.556608470019766});
  
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
      if (selectedDistrict != "") {
        setDistricts([]);
        setCommunes([]);
        setVillages([]);
      }

      const data = new URLSearchParams();
      data.append("district_khan_krong", selectedProvince);
      let url = "http://localhost:8100/district_khan_krong_name/";
      fetchData(
        url,
        data,
        { method: "POST", resName: "districts" },
        setDistricts
        // setSelectedDistrict
      );
    } else {
      // setShouldRunEffect(false);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (shouldRunEffect) {
      if (selectedCommune != "") {
        // setDistricts([]);
        setCommunes([]);
        setVillages([]);
      }
      const data = new URLSearchParams();
      data.append("province_city", selectedProvince);
      data.append("district_khan_krong", selectedDistrict);
      let url = "http://localhost:8100/commune/";
      fetchData(
        url,
        data,
        { method: "POST", resName: "commune_sangket" },
        setCommunes
        // setSelectedCommune
      );
    } else {
      // setShouldRunEffect(false)
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (shouldRunEffect) {
      if (selectedVillage != "") {
        // setDistricts([]);
        // setCommunes([]);
        setVillages([]);
      }
      const data = new URLSearchParams();
      data.append("province_city", selectedProvince);
      data.append("district_khan_krong", selectedDistrict);
      data.append("commune_sangket", selectedCommune);
      let url = "http://localhost:8100/village_name/";
      fetchData(
        url,
        data,
        { method: "POST", resName: "villages" },
        setVillages
        // setSelectedVillage
      );
    } else {
      // setShouldRunEffect(false)
    }
  }, [selectedCommune]);

  useEffect(() => {
    if (shouldRunEffect) {
      const data = new URLSearchParams();
      data.append("province_city", selectedProvince);
      data.append("district_khan_krong", selectedDistrict);
      data.append("commune_sangket", selectedCommune);
      data.append("village", selectedVillage);
      let url = "http://localhost:8100/price_land_book/";
      fetchData(url, data, { method: "POST", resName: null }, setMapData);
    } else {
      setShouldRunEffect(false);
    }
  }, [selectedVillage]);

  useEffect(() => { 
    if (shouldRunEffect) {
      const data = new URLSearchParams();
      data.append("province_city", selectedProvince);
      data.append("district_khan_krong", selectedDistrict);
      data.append("commune", selectedCommune);
      data.append("village", selectedVillage);
      let url = "http://localhost:8100/value_lat_long/";
      fetchData(url, data, { method: "POST", resName: null }, setPointer);
    } else {
      setShouldRunEffect(false);
    }
  }, [selectedVillage]);

  const filterData: FilterData = {
    province_city: "Phnom Penh",
    district_khan_krong: "Chamkar Mon",
    commune: "Toul Tum Poung 1",
    village: "Village 1",
  };

  const handleExport = () => {
    let table = document.getElementsByClassName("table-custom ");
    exportToExcel(table[0],'land_classification_book');
  };

  const [formData, setFormData] = useState({
    province_city: '',
    district_khan_krong: '',
    commune: '',
    village: ''
  });    

  // const [mapData, setMapData] = useState({ lat: 0, lng: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const [tableData, setTableData] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(true);

  const resetData 
  = () => {
    setSelectedProvince('សូមជ្រើសរើស ខេត្ត/រាជធានី');
    setSelectedDistrict('');
    setSelectedCommune('');
    setSelectedVillage('');
    setMapData([]);
    // setProvinces([]);
    setDistricts([]);
    setCommunes([]);
    setVillages([]);
    setShouldRunEffect(false);
    setTableData([]);
    setIsTableVisible(false);
    
  };

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  return (
    <main className="flex p-[10px] flex-col m-auto fixed w-full">
      <div
        className="flex-1 bg-white rounded-md w-full sh m-auto p-4 pl-5"
      >
        <span className="text-[#3399FF] font-thin">
          Land Classification Book
        </span>
      </div>

      <div
        className="flex-1 bg-white rounded-md mt-2 w-full m-auto"
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
                      value={selectedProvince}
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
                <div
                  className="w-[75%] relative"
                  style={{ marginTop: "-0.5em" }}
                >
                  <div>
                    <select
                      onChange={(event) => {
                        setSelectedDistrict(event.target.value);
                        setShouldRunEffect(true);
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
                <div
                  className="w-[75%] relative"
                  style={{ marginTop: "-0.5em" }}
                >
                  <div>
                    <select
                      onChange={(event) => {
                        setSelectedCommune(event.target.value);
                        setShouldRunEffect(true);
                      }}
                      className="w-full p-2 mb-4 outline-none cursor-pointer sm:text-sm border shadow-sm border-[#64d1ff] rounded-md appearance-none"
                    >
                      <option value="" className="text-gray-400" selected>
                        សូមជ្រើសរើស ឃុំ/សង្កាត់
                      </option>
                      {communes.length > 0 ? (
                        communes.map((province_city, index) => (
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
                <div
                  className="w-[75%] relative"
                  style={{ marginTop: "-0.5em" }}
                >
                  <div>
                    <select
                      onChange={(event) => {
                        setSelectedVillage(event.target.value);
                        setShouldRunEffect(true);
                      }}
                      className="w-full p-2 mb-2 outline-none cursor-pointer sm:text-sm border shadow-sm border-[#64d1ff] rounded-md appearance-none"
                    >
                      <option value="" className="text-gray-400" selected>
                        សូមជ្រើសរើស ភូមិ
                      </option>
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
                  <div className="absolute top-3 right-2">
                    <ChevronDown className="text-sky-[#1B3351] size-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end z-index">
        <div className="relative p-2 pr-0">
          <div className="">             
            
            <button
              // disabled={loading}
              className="pt-1/2 p-2  cursor-pointer font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-150 mr-2 text-white text-sm  bg-red-500 hover:bg-#771a1a uppercase"
              // type="button"
              onClick={resetData}
              
            >
              <div className="flex">
                <span>
                  <Trash2 className="size-4" />
                </span>
              </div>
            </button>

            <button
              // disabled={loading}
              className="pt-1/2 p-2 cursor-pointer font-semibold rounded-lg shadow-md hover:bg-#284870 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-150 mr-2 text-white text-sm  bg-[#1B3351] uppercase"
              // type="submit"
              onClick={handleExport}
            >
              <div className="flex">
                <span>
                  <Download className="size-4" />
                </span>
              </div>
            </button>

            <button
                onClick={toggleTableVisibility}
                className={`pt-1/2 p-2 cursor-pointer font-semibold rounded-lg transition ease-in-out duration-150 text-black text-sm ml-auto shadow-lg shadow-indigo-500/40 bg-white uppercase`}
              >
                {isTableVisible ? 
                 <div className="flex">
                 <span>
                   <MinusIcon className="size-4"/>
                 </span>
               </div>
                : 
                <div className="flex">
                <span>
                  <SquareArrowOutUpRight className="size-4"/>
                </span>
              </div>
                }
              </button>
            
          </div>
        </div>
      </div>
      <div className="flex-1 h-screen m-auto w-full" >
        <div
          className="bg-white rounded-md h-full relative shadow-sm"
          style={{
            height: "",
          }}
        >
          <div>              
            <div className="flex items-center justify-center m-auto ">
              {/* <LegendTable legendData={mapdata}></LegendTable> */}
              {isTableVisible && <LegendTable legendData={mapdata} />}
            </div>


            <div className="w-full mb-2 flex flex-col">
              <MapAPIs pointer={pointer} />
            </div>
          </div>
        </div>
      </div>

      {/* Testing Map Submit */}
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label>Province/City:</label>
          <input
            type="text"
            name="province_city"
            value={formData.province_city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>District/Khan/Krong:</label>
          <input
            type="text"
            name="district_khan_krong"
            value={formData.district_khan_krong}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Commune:</label>
          <input
            type="text"
            name="commune"
            value={formData.commune}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Village:</label>
          <input
            type="text"
            name="village"
            value={formData.village}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form> */}

      {/* <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapData.lat && mapData.lng ? mapData : center}
          zoom={10}
        >
          {mapData.lat && mapData.lng && <Marker position={mapData} />}
        </GoogleMap>
      </LoadScript> */}
      {/* End Sample Testng  */}
      
    </main>
  );
}
