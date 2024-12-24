"use client";
import {
  ChevronDown,
  Download,
  Eye,
  EyeOff,
  MinusIcon,
  Paintbrush,
  SquareArrowOutUpRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchData } from "../../../util";
import MapAPIs from "@/app/components/map-generate/page";
import LegendTable from "@/app/components/map-generate/LegendTable";
import exportToExcel from "@/app/components/map-generate/exportToexcel";
import { useRouter } from "next/navigation";
import Title from "../components/custom/header-title";
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
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedCommune, setSelectedCommune] = useState<string>("");
  const [selectedVillage, setSelectedVillage] = useState<string>("");
  const [shouldRunEffect, setShouldRunEffect] = useState(false);
  const [pointer, setPointer] = useState({
    lng: 104.92802533397543,
    lat: 11.556608470019766,
  });
  
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const baseProtocol = process.env.NEXT_PUBLIC_PROTOCOL;

  const [districtEnabledDropdown, setDistrictEnabledDropdown] =
    useState<boolean>(false);
  const [communeEnableDropdown, setCommuneEnableDropdown] =
    useState<boolean>(false);
  const [villageEnabledDropdown, setVillageEnabledDropdown] =
    useState<boolean>(false);

  const [activeSelectProvince, setActiveSelectProvince] = useState(true);
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

      setShowButton(true);
    } else {
      setShowButton(false);
      setShouldRunEffect(false);
    }
  }, [selectedVillage]);

  const [showButton, setShowButton] = useState(false);

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
    exportToExcel(table[0], "land_classification_book");
  };

  const [tableData, setTableData] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(true);

  const toggleFullScreen = () => {
    setIsTableVisible(!isTableVisible);
  };

  const resetData = () => {
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedCommune("");
    setSelectedVillage("");
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
    setActiveSelectProvince(true);
    setActiveSelectDistrict(false);
    setActiveSelectCommune(false);
    setActiveSelectVillage(false);
  };

  const handleSelectClickA = (event:any) => {
    const value = event.target.value;

    if (value) {
      setSelectedProvince(value);
      setActiveSelectProvince(true);
      setActiveSelectDistrict(true);
      setActiveSelectCommune(false);
      setActiveSelectVillage(false);
      
      setSelectedDistrict('');
      setSelectedCommune('');
      setSelectedVillage('');
      
    } else {
      setActiveSelectDistrict(false); 
      
      setSelectedDistrict('');
      setSelectedCommune('');
      setSelectedVillage('');
    }
  };

  const handleSelectClickB = (event:any) => {
    const value = event.target.value;

    if (value) {
      setSelectedDistrict(value); 
      setActiveSelectCommune(true);
      setActiveSelectProvince(true);
      setActiveSelectDistrict(true);
      setActiveSelectVillage(false);

      setSelectedCommune('');
      setSelectedVillage('');
      
    } else {
      setActiveSelectCommune(false); 

      setSelectedCommune('');
      setSelectedVillage('');
      
    }
  };

  const handleSelectClickC = (event:any) => {
    const value = event.target.value;

    if (value) {
      setSelectedCommune(value); 
      setActiveSelectVillage(true);
      setActiveSelectCommune(true);
      setActiveSelectProvince(true);
      setActiveSelectDistrict(true);

      setSelectedVillage('');
      
    } else {
      setActiveSelectVillage(false); 
      setSelectedVillage('');
      
    }
  };

  const handleSelectClickD = (event:any) => {
    const value = event.target.value;

    if (value) {
      setSelectedVillage(value); 
      setActiveSelectVillage(true);
      setActiveSelectCommune(true);
      setActiveSelectProvince(true);
      setActiveSelectDistrict(true);
      
    } else {
      setActiveSelectVillage(false);       
    }
  };

  const handleImportData = () => {
		router.push("/input-data-book");
	}



  return (
    <main className="bg-white flex flex-col m-auto fixed w-full">
  
      <Title/>

      <div
        className="flex-1 rounded-md  mt-2 h-[19vh] w-full m-auto"
        style={{
          border: "1px solid #eee",
          boxShadow: "0px 0px 2px rgba(0,0,0,0.3)",
        }}
      >
        <div className="flex justify-between ">
          <div
            className="ml-2 w-[18%]"
            style={{ fontFamily: "MyFont, sans-serif" }}
          >
            <div className="my-2">
              <div className=" rounded-lg p-0.5 pl-4">
                <div className="flex">
                  <div className="mt-3 w-[28%]">
                    <label className="block font-semibold text-sm">ខេត្ត/រាជធានី</label>
                  </div>
                  <div className="w-[72%] relative">
                    <div>
                      <select
                        className={`w-full p-2 mb-4 outline-none cursor-pointer sm:text-sm border shadow-sm rounded-md appearance-none`}
                        id="province_city"
                        name="province_city"
                        value={selectedProvince}
                        onChange={(event) => {
                          setSelectedProvince(event.target.value);
                          setShouldRunEffect(true);
                          setActiveSelectDistrict(event.target.value !== '');
                        }}
                        onClick={handleSelectClickA}
                        style={{
                          border: activeSelectProvince
                            ? "1px solid #64d1ff"
                            : "1px solid #CCC",
                        }}
                      >
                        <option 
                          disabled value="" 
                          className="text-sm font-extralight text-[#7f7f7f]">
                          ជ្រើសរើសពីតារាង
                        </option>
                        {provinces.map((province_city, index) => (
                          <option key={index} value={province_city.name.split("*")[0]}>
                            {province_city.name.split("*")[0]}
                          </option>
                        ))}
                      </select>
                      <div className="absolute z-50 top-3 right-3 pointer-events-none">
                        <ChevronDown className="text-[#1B3351]" size={20} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="mt-1 w-[28%]">
                    <label className="block font-semibold text-sm pb-2">ស្រុក/ក្រុង/ខណ្ខ</label>
                  </div>
                  <div
                    className="w-[72%] relative"
                    style={{ marginTop: "-0.5em" }}
                  >
                    <div>
                      <select
                        value={selectedDistrict}
                        onChange={(event) => {
                          setSelectedDistrict(event.target.value);
                          setShouldRunEffect(true);
                        }}
                        onClick={handleSelectClickB}
                        disabled={!districtEnabledDropdown}
                        className="w-full p-2 mb-4 outline-none cursor-pointer sm:text-sm border shadow-sm rounded-md appearance-none"
                        style={{
                          border: activeSelectDistrict
                            ? "1px solid #64d1ff"
                            : "1px solid #CCC",
                        }}
                      >
                        <option
                          disabled value=""
                          className="text-sm text-[#7f7f7f]"
                        >
                          ជ្រើសរើសពីតារាង
                        </option>
                        {districts.length > 0
                          ? districts.map((province_city, index) => (
                              <option
                                key={index}
                                value={province_city.name.split("*")[0]}
                              >
                                {province_city.name.split("*")[0]}
                              </option>
                            ))
                          : null}
                      </select>
                    </div>
                    <div className="absolute z-50 top-3 right-3 pointer-events-none">
                      <ChevronDown className="text-sky-[#1B3351] size-5" />
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="mt-1 w-[28%]">
                    <label className="block font-semibold text-sm pb-2">ឃុំ/សង្កាត់</label>
                  </div>
                  <div
                    className="w-[72%] relative"
                    style={{ marginTop: "-0.5em" }}
                  >
                    <div>
                      <select
                        value={selectedCommune}
                        onChange={(event) => {
                          setSelectedCommune(event.target.value);
                          setShouldRunEffect(true);
                        }}
                        onClick={handleSelectClickC}
                        disabled={!communeEnableDropdown}
                        className="w-full p-2 mb-4 outline-none cursor-pointer sm:text-sm border shadow-sm rounded-md appearance-none"
                        style={{
                          border: activeSelectCommune
                            ? "1px solid #64d1ff"
                            : "1px solid #CCC",
                        }}
                      >
                        <option
                          disabled
                          value=""
                          className={`text-sm text-[#7f7f7f]`}
                        >
                          ជ្រើសរើសពីតារាង
                        </option>
                        {communes.length > 0
                          ? communes.map((province_city, index) => (
                              <option
                                key={index}
                                value={province_city.name.split("*")[0]}
                              >
                                {province_city.name.split("*")[0]}

                              </option>
                            ))
                          : null}
                      </select>
                    </div>
                    <div className="absolute  top-3 right-3 pointer-events-none">
                      <ChevronDown className="text-sky-[#1B3351] size-5" />
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="mt-1 w-[28%]">
                    <label className="block font-semibold text-sm pb-2">ភូមិ</label>
                  </div>
                  <div
                    className="w-[72%] relative"
                    style={{ marginTop: "-0.5em" }}
                  >
                    <div>
                      <select
                        value={selectedVillage}
                        onChange={(event) => {
                          setSelectedVillage(event.target.value);
                          setShouldRunEffect(true);
                        }}
                        onClick={handleSelectClickD}
                        disabled={!villageEnabledDropdown}
                        className="w-full p-2 mb-4 outline-none cursor-pointer sm:text-sm border shadow-sm rounded-md appearance-none"
                        style={{
                          border: activeSelectVillage
                            ? "1px solid #64d1ff"
                            : "1px solid #CCC",
                        }}
                      >
                        <option
                          disabled
                          value=""
                          className="text-sm text-[#7f7f7f]"
                        >
                          ជ្រើសរើសពីតារាង
                        </option>
                        {villages.length > 0
                          ? villages.map((province_city, index) => (
                              <option
                                key={index}
                                value={province_city.name.split("*")[0]}
                              >
                                {province_city.name.split("*")[0]}
                              </option>
                            ))
                          : null}
                      </select>
                    </div>
                    <div className="absolute z-50 top-3 right-3 pointer-events-none">
                      <ChevronDown className="text-sky-[#1B3351] size-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div>
            <button
              type="submit"
              onClick={handleImportData}
              className="bg-[#1B3351] p-2 rounded-md text-white px-2 mx-2 my-2 shadow-md hover:shadow-lg hover:bg-[#152942] text-sm"
            >
              បញ្ចូលទិន្នន័យថ្មី
            </button>
          </div>
        </div>
      </div>

      <div
        className="flex-1 h-screen m-auto w-full"
        style={{ marginTop: "0.5em", boxShadow: "0px 0px 2px rgba(0,0,0,0.3)" }}
      >
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

            <div className="min-h-screen">
              <footer className="h-[67vh]">
                <div className="absolute top-[0.6em] z-50 right-2.5">
                  {showButton && (
                    <div className="flex flex-col space-y-2.5">
                      <button
                        onClick={toggleFullScreen}
                        className={`p-2.5 cursor-pointer font-semibold rounded-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-150 text-black text-sm  bg-[#79B971] uppercase`}
                      >
                        {isTableVisible ? (
                          <div className="flex">
                            <span>
                              <Eye className="w-5 h-5 text-white" />
                            </span>
                          </div>
                        ) : (
                          <div className="flex">
                            <span>
                              <EyeOff className="w-5 h-5 text-white" />
                            </span>
                          </div>
                        )}
                      </button>
                      <button
                        className="p-2.5 cursor-pointer font-semibold rounded-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-150 text-white text-sm  bg-orange-500 hover:bg-#771a1a uppercase"
                        onClick={resetData}
                      >
                        <div className="flex">
                          <span>
                            <Paintbrush className="size-5" />
                          </span>
                        </div>
                      </button>
                      <button
                        className="p-2.5 cursor-pointer font-semibold rounded-sm shadow-md hover:bg-#284870 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-150 text-white text-sm  bg-[#1B3351] uppercase"
                        onClick={handleExport}
                      >
                        <div className="flex">
                          <span>
                            <Download className="size-5" />
                          </span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
                <div className="w-full mb-2 flex flex-col">
                  <MapAPIs pointer={pointer} />
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>

      
    </main>
  );
}
