"use client";
import { ChevronDown, Download, MinusIcon, Paintbrush, SquareArrowOutUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchData } from "../../../util";
import MapAPIs from "@/app/components/map-generate/page";
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
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState(false);
  const [selectedCommune, setSelectedCommune] = useState<string>("");
  const [selectedVillage, setSelectedVillage] = useState<string>("");
  const [shouldRunEffect, setShouldRunEffect] = useState(false);
  const [pointer,setPointer] = useState({lng: 104.92802533397543 ,lat:11.556608470019766});
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const baseProtocol = process.env.NEXT_PUBLIC_PROTOCOL;

  const [districtEnabledDropdown, setDistrictEnabledDropdown] = useState<boolean>(false);
  const [communeEnableDropdown, setCommuneEnableDropdown] = useState<boolean>(false);
  const [villageEnabledDropdown, setVillageEnabledDropdown] = useState<boolean>(false);

  const [activeSelectProvince, setActiveSelectProvince] = useState(false);
  const [activeSelectDistrict, setActiveSelectDistrict] = useState(false);
  const [activeSelectCommune, setActiveSelectCommune] = useState(false);
  const [activeSelectVillage, setActiveSelectVillage] = useState(false);
  
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
    let url = `${baseProtocol}://${baseUrl}/province_city`;
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
      let url = `${baseProtocol}://${baseUrl}/district_khan_krong_name/`;
      fetchData(
        url,
        data,
        { method: "POST", resName: "districts" },
        setDistricts
        // setSelectedDistrict
      );
      setDistrictEnabledDropdown(true);
      setCommuneEnableDropdown(false);
      setVillageEnabledDropdown(false);
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
      let url = `${baseProtocol}://${baseUrl}/commune/`;
      fetchData(
        url,
        data,
        { method: "POST", resName: "commune_sangket" },
        setCommunes
        // setSelectedCommune
      );
      setCommuneEnableDropdown(true);
      setVillageEnabledDropdown(false);
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
      let url = `${baseProtocol}://${baseUrl}/village_name/`;
      fetchData(
        url,
        data,
        { method: "POST", resName: "villages" },
        setVillages
        // setSelectedVillage
      );
      setVillageEnabledDropdown(true);
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
      let url = `${baseProtocol}://${baseUrl}/price_land_book/`;
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
      let url = `http://${baseUrl}/value_lat_long/`;
      fetchData(url, data, { method: "POST", resName: null }, setPointer);
    } else {
      setShouldRunEffect(false);
    }
  }, [selectedVillage]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const [tableData, setTableData] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(true);

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

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
    // setIsTableVisible(false);
    setDistrictEnabledDropdown(false);
    setCommuneEnableDropdown(false);
    setVillageEnabledDropdown(false);
    setActiveSelectProvince(false);
    setActiveSelectDistrict(false);
    setActiveSelectCommune(false);
    setActiveSelectVillage(false);
    
  };

  const handleSelectClickA = () => {
    setActiveSelectProvince(true);
    setActiveSelectDistrict(false);
    setActiveSelectCommune(false);
    setActiveSelectVillage(false);
  };
  
  const handleSelectClickB = () => {
    setActiveSelectProvince(true);
    setActiveSelectDistrict(true);
    setActiveSelectCommune(false);
    setActiveSelectVillage(false);
  };
  
  const handleSelectClickC = () => {
    setActiveSelectProvince(true);
    setActiveSelectDistrict(true);
    setActiveSelectCommune(true);
    setActiveSelectVillage(false);
  };

  const handleSelectClickD = () => {
    setActiveSelectVillage(true);
  };

  return (
    <main className="bg-white flex flex-col m-auto fixed w-full">
      <div
        className="flex-1 bg-[#f5f5f5] rounded-md w-full sh m-auto p-2 pl-5"
        style={{marginTop: "0.5em", boxShadow: "0px 0px 4px rgba(0,0,0,0.3)"}}
      >
        <span className="text-[#428BCA] font-normal text-[20px]"
        >
          Land Classification Book
        </span>
      </div>

      <div
        className="flex-1 rounded-md mt-2 w-full m-auto"
        style={{border: "1px solid #eee"}}
      >
        <div
          className="ml-2"
          style={{ fontFamily: "MyFont, sans-serif", maxWidth: "30rem" }}
        >
          <div className="mt-2">
            <div className=" rounded-lg p-0.5 pl-4">
              <div className="flex">
                <div className="mt-2 w-[25%]">
                  <label className="block text-sm">
                    ខេត្ត/រាជធានី
                  </label>
                </div>
                <div className="w-[75%] relative">
                  <div>
                    <select
                      className={`w-full p-2 mb-4 outline-none cursor-pointer sm:text-sm border shadow-sm
                        rounded-md appearance-none`}
                      id="province_city"
                      name="province_city"
                      value={selectedProvince}
                      onChange={(event) => {
                        setSelectedProvince(event.target.value);
                        setShouldRunEffect(true);
                      }}
                      onClick={handleSelectClickA}

                      style={{
                        border: activeSelectProvince ? '1px solid #64d1ff' : '1px solid #CCC',
                      }}
                    >
                      <option className="text-sm text-[#CCC]">
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
                  <label className="block text-sm pb-2">
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
                      onClick={handleSelectClickB}
                      disabled={!districtEnabledDropdown}
                      className="w-full p-2 mb-4 outline-none cursor-pointer sm:text-sm border shadow-sm rounded-md appearance-none"
                      style={{
                        border: activeSelectDistrict ? '1px solid #64d1ff' : '1px solid #CCC',
                      }}
                    >
                      <option
                        value=""
                        className="text-sm text-[#CCC]"
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
                      ): null
                      }
                    </select>
                  </div>
                  <div className="absolute  top-3 right-2">
                    <ChevronDown className="text-sky-[#1B3351] size-5" />
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className="mt-1.5 w-[25%]">
                  <label className="block text-sm pb-2">
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
                      onClick={handleSelectClickC}
                      disabled={!communeEnableDropdown}
                      className="w-full p-2 mb-4 outline-none cursor-pointer sm:text-sm border shadow-sm rounded-md appearance-none"
                      style={{
                        border: activeSelectCommune ? '1px solid #64d1ff' : '1px solid gray',
                      }}
                    >
                      <option value="" className="text-sm text-[#CCC]" selected>
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
                      ) : null
                      }
                    </select>
                  </div>
                  <div className="absolute  top-3 right-2">
                    <ChevronDown className="text-sky-[#1B3351] size-5" />
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className="mt-1.5 w-[25%]">
                  <label className="block text-sm pb-2">
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
                      onClick={handleSelectClickD}
                      disabled={!villageEnabledDropdown}
                      className="w-full p-2 mb-2 outline-none cursor-pointer sm:text-sm border shadow-sm rounded-md appearance-none"
                      style={{
                        border: activeSelectVillage ? '1px solid #64d1ff' : '1px solid gray',
                      }}
                    >
                      <option value="" className="text-sm text-[#CCC]" selected>
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
                      ) : null
                      }
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
              className="pt-1/2 p-2  cursor-pointer font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-150 mr-2 text-white text-sm  bg-orange-500 hover:bg-#771a1a uppercase"
              onClick={resetData}
            >
              <div className="flex">
                <span>
                  <Paintbrush className="size-4" />
                </span>
              </div>
            </button>

            <button
              className="pt-1/2 p-2 cursor-pointer font-semibold rounded-lg shadow-md hover:bg-#284870 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-150 mr-2 text-white text-sm  bg-[#1B3351] uppercase"
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
                className={`pt-1/2 p-2 cursor-pointer font-semibold rounded-lg transition ease-in-out duration-150 text-black text-sm ml-auto shadow-lg shadow-indigo-500/40 border border-[#1B3351] bg-white uppercase`}
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
              {isTableVisible && <LegendTable legendData={mapdata} />}
            </div>
            <div className="w-full mb-2 flex flex-col">
              <MapAPIs pointer={pointer} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
