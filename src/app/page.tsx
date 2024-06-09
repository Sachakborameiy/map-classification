  "use client";
  import { ChevronDown, Download, Trash2 } from "lucide-react";
  import { setDriver } from "mongoose";
  import Image from "next/image";
  import { useEffect, useState, useMemo } from "react";
  import { fetchData } from "../../util";
  import MapAPIs from "@/components/map-generate/page";
  import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
  import axios from "axios";

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

  const mapContainerStyle = {
    height: "400px",
    width: "800px"
  };
  const center = {
    lat: -3.745,
    lng: -38.523
  };

  export default function MapClassification() {
    const [provinces, setProvinces] = useState<ProvinceCity[]>([]);
    const [districts, setDistricts] = useState<Districts[]>([]);
    const [communes, setCommunes] = useState<Districts[]>([]);
    const [villages, setVillages] = useState<Districts[]>([]);
    const [mapdata, setMapData] = useState<Districts[]>([]);
    // const [mapData, setMapData] = useState({ lat: 0, lng: 0 });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProvince, setSelectedProvince] = useState<string>('សូមជ្រើសរើស ខេត្ត/រាជធានី');
    // const [selectedProvince, setSelectedProvince] = useState<string>("");
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

    useEffect(() => {
      let startX: number, startWidth: number, currentTh: HTMLElement | null;

      const resizeColumn = (e: MouseEvent) => {
        if (currentTh) {
          const newWidth = startWidth + (e.pageX - startX);
          currentTh.style.width = `${newWidth}px`;
        }
      };

      const stopResize = () => {
        document.removeEventListener("mousemove", resizeColumn);
        document.removeEventListener("mouseup", stopResize);
        document
          .querySelectorAll(".resize-bar")
          .forEach((bar) => bar.classList.remove("resizing"));
      };

      document.querySelectorAll(".resize-bar").forEach((bar) => {
        bar.addEventListener("mousedown", (e: any) => {
          const target = e.target as HTMLElement;
          startX = e.pageX;
          currentTh = target.parentElement as HTMLElement;
          startWidth = currentTh.offsetWidth;
          document.addEventListener("mousemove", resizeColumn);
          document.addEventListener("mouseup", stopResize);
          target.classList.add("resizing");
        });
      });
    }, []);

    const columnHeaders = [
      "ខេត្ត/រាជធានី",
      "កូដ ខេត្ត/រាជធានី",
      "សាខា",
      "កូដ សាខា",
      "ស្រុក/ខណ្ឌ/ក្រុង",
      "កូដ ស្រុក/ខណ្ឌ/ក្រុង",
      "ឃុំ/សង្កាត់",
      "កូដ ឃុំ/សង្កាត់",
      "លេខទូរស័ព្ទ ឃុំ/សង្កាត់",
      "លេខទូរស័ព្ទ មេភូមិ",
      "ចំនួន គ្រួសារ",
      "L-Map (ភាគរយ)",
      "ចំណាត់ថ្នាក់",
      "កម្រិតទីតាំង",
      "ដីពាណិជ្ជកម្ម C1",
      "ដីពាណិជ្ជកម្ម C2",
      "ដីពាណិជ្ជកម្ម C3",
      "ដីលំនៅឋាន R1",
      "ដីលំនៅឋាន R2",
      "ដីលំនៅឋាន R3",
      "ដីឧស្សាហកម្ម I1",
      "ដីឧស្សាហកម្ម I2",
    ];

    const filterData: FilterData = {
      province_city: "Phnom Penh",
      district_khan_krong: "Chamkar Mon",
      commune: "Toul Tum Poung 1",
      village: "Village 1",
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

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   try {
    //     const response = await axios.post('http://localhost:8100/value_lat_long/', formData, {
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'accept': 'application/json'
    //       }
    //     });
    //     const data = response.data;
    //     setMapData({ lat: data.lat, lng: data.lng });
    //   } catch (error) {
    //     console.error('Error fetching map data:', error);
    //   }
    // };
    
    const [tableData, setTableData] = useState([]);
    const [isTableVisible, setIsTableVisible] = useState(true);

    const resetData 
    = () => {
      setSelectedProvince('សូមជ្រើសរើស ខេត្ត/រាជធានី');
      setSelectedDistrict('');
      setSelectedCommune('');
      setSelectedVillage('');
      setMapData([]);
      setDistricts([]);
      setCommunes([]);
      setVillages([]);
      setShouldRunEffect(false);
      setTableData([]);
      setIsTableVisible(false);
      
      console.log("Data has been cleared");
    };

    return (
      <main className="flex flex-col m-auto fixed w-full">
        <div
          className="flex-1 bg-white rounded-md w-full sh m-auto p-4 pl-5 mt-2 "
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
          <div className="relative p-2">
            <div className="">
              <button
                // disabled={loading}
                className="pt-1/2 p-2 cursor-pointer font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-150 ml-auto text-white text-sm  bg-red-500 hover:bg-#771a1a uppercase"
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
                className="pt-1/2 p-2 cursor-pointer font-semibold rounded-lg shadow-md hover:bg-#284870 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-150 ml-2 text-white text-sm  bg-[#1B3351] uppercase"
                // type="submit"
                // onClick={downloadDataToExcel}
              >
                <div className="flex">
                  <span>
                    <Download className="size-4" />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 m-auto" style={{ width: "99%" }}>
          <div
            className="bg-white rounded-md relative shadow-sm"
            style={{
              height: "100vh",
            }}
          >
            <div>
              <div className="flex items-center justify-center m-auto ">
                {/* <div
                  className="shadow-md rounded-lg overflow-scroll absolute top-7 opacity-90 z-50"
                  // className="shadow-sm rounded-lg absolute top-7 opacity-90 z-50 shadow-gray-400 "
                  style={{ width: "85%" }}
                >
                  {
                    isTableVisible && (
                      <table className="table-custom rounded-sm table-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-red-100" style={{ width: "100%", tableLayout: "fixed" }}>
                          <thead className="bg-[#1B3351] text-white">
                            <tr className="">
                              {columnHeaders.map((header, index) => (
                                <th key={index} className="relative group font-normal border px-4 py-2 text-sm w-40">
                                  <span>{header}</span>
                                  <div className="resize-bar absolute right-0 top-0 h-full w-2 cursor-col-resize bg-white opacity-0 group-hover:opacity-100"></div>
                                </th>
                              ))}
                            </tr>
                          </thead>                    

                          <tbody>
                            {mapdata.map((item: Districts, index) => (
                              <tr key={index} className="border-b hover:bg-[#284870] hover:text-white bg-gray-100 cursor-pointer">
                                {columnHeaders.map((header, idx) => (
                                  <td key={idx} className="​​relative group border border-gray-300 px-4 py-2 text-sm">
                                    <span>{item[header]}</span>
                                    <div className="resize-bar absolute right-0 top-0 h-full w-2 cursor-col-resize bg-white opacity-0 group-hover:opacity-100"></div>
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>

                      </table>
                    )
                  }

                </div> */}
              </div>

              <div className="w-full h-screen flex flex-col">
                <MapAPIs filterData={filterData} pointer={pointer} />
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
