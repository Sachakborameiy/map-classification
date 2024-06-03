"use client";
import { ChevronDown } from "lucide-react";
import { setDriver } from "mongoose";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchData } from "../../util";
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
            <div className=" rounded-lg  p-1 pl-4">
              <div className="flex">
                <div className="mt-2 w-[25%]">
                  <label className="block text-sm font-medium  text-gray-700">
                    ខេត្ត/រាជធានី
                  </label>
                </div>
                <div className="w-[75%] relative">
                  <div>
                    <select
                      className="w-full p-2 mb-4 outline-none sm:text-sm border shadow-sm
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
                <div className="mt-2 w-[25%]">
                  <label className="block text-sm font-medium text-gray-700 pb-2">
                    ស្រុក/ក្រុង/ខណ្ខ
                  </label>
                </div>
                <div className="w-[75%] relative">
                  <div>
                    <select
                      onChange={(event) => {
                        setselectedDistrict(event.target.value);
                      }}
                      className="w-full p-2 mb-4 outline-none sm:text-sm border shadow-sm border-[#64d1ff] rounded-md appearance-none"
                    >
                      <option
                        value=""
                        className="text-gray-400"
                        disabled
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
                <div className="mt-2 w-[25%]">
                  <label className="block text-sm font-medium text-gray-700 pb-2">
                    ឃុំ/សង្កាត់
                  </label>
                </div>
                <div className="w-[75%] relative">
                  <div>
                    <select
                      onChange={(event) => {
                        setselecteCommue(event.target.value);
                        setShouldRunEffect(true);
                      }}
                      className="w-full p-2 mb-4 outline-none sm:text-sm border shadow-sm border-[#64d1ff] rounded-md appearance-none"
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
                <div className="mt-2 w-[25%]">
                  <label className="block text-sm font-medium text-gray-700 pb-2">
                    ភូមិ
                  </label>
                </div>
                <div className="w-[75%] relative">
                  <div>
                    <select
                      onChange={(event) => {
                        setselecteVillage(event.target.value);
                        setShouldRunEffect(true);
                      }}
                      className="w-full p-2 mb-4 outline-none sm:text-sm border shadow-sm border-[#64d1ff] rounded-md appearance-none"
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
            <div className="flex" style={{ width: "100%" }}>
              <div className="w-2 h-2 bg-red-500 mt-2"></div>
              <div className="ml-2">
                <label className="block text-md font-extrabold text-gray-700">
                  ទីតាំង​ដែលបានជ្រើសរើស
                </label>
              </div>
            </div>
          </div>
          <div
           
          >
            <div className="absolute top-24 w-1/2 left-1/4 bg-white opacity-90 z-50" style={{ flex: "1 1 auto", overflow: "auto" }}>
              <table style={{ width: "100%", tableLayout: "fixed" }}>
                <thead>
                  <tr>
                    <th>ខេត្ត/រាជធានី</th>
                    <th>កូដ ខេត្ត/រាជធានី</th>
                    <th>សាខា</th>
                    <th>កូដ សាខា</th>
                  </tr>
                </thead>
                <tbody>
                  {mapdata &&
                    mapdata.map((item: any, index: number) => (
                      <tr key={index}>
                        <td>{item["ខេត្ត/រាជធានី"]}</td>
                        <td>{item["កូដ ខេត្ត/រាជធានី "]}</td>
                        <td>{item["សាខា"]}</td>
                        <td>{item["កូដ សាខា"]}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div style={{ flex: "1 1 auto", height: "55vh", position: "relative" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1001033.0502020214!2d102.76085120509809!3d11.45931746038002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3105f033a39282f3%3A0x37e95344b24a2873!2sKoh%20Kong%20Province!5e0!3m2!1sen!2skh!4v1716522509201!5m2!1sen!2skh"
                style={{ border: "0", width: "100%", height: "100%" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
