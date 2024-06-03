"use client";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProvinceCity {
  name: string;
}

export default function Home() {
  const [provinces, setProvinces] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8100/province_city/", {
        headers: {
          accept: "application/json",
        },
      });
      const provinceCities: ProvinceCity[] = response.data.province_city;
      const provinceNames = provinceCities.map((province) => province.name);
      setProvinces(provinceNames);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedProvince = event.target.value;
    setSelectedProvince(selectedProvince);

    // Filter cities based on the selected province
    const filteredCities = selectedProvince
      ? provinces.find((province) => province.name === selectedProvince)
          ?.cities || []
      : [];
    setCities(filteredCities);
  };

  return (
    <main className="flex flex-col m-auto">
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
            <div className=" rounded-lg  p-4">
              {/* <h2 className="text-xl text-center font-semibold mb-4 flex​ ">
                ស្វែងរកចំណាត់ថ្នាក់ទីតាំង
              </h2> */}

              <div className="flex">
                <div className="mt-2 w-[25%]">
                  <label className="block text-sm font-medium  text-gray-700">
                    ខេត្ត/រាជធានី
                  </label>
                </div>
                <div className="w-[75%] relative">
                  <div>
                    <select className="w-full p-2 mb-4 outline-none sm:text-sm border shadow-sm border-[#64d1ff] rounded-md appearance-none">
                      <option
                        value=""
                        className="text-gray-400"
                        disabled
                        selected
                      >
                        សូមជ្រើសរើស ខេត្ត/រាជធានី
                      </option>
                      <option value="option1">គ្មានទិន្នន័យ</option>
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
                    <select className="w-full p-2 mb-4 outline-none sm:text-sm border shadow-sm border-[#64d1ff] rounded-md appearance-none">
                      <option
                        value=""
                        className="text-gray-400"
                        disabled
                        selected
                      >
                        សូមជ្រើសរើស ស្រុក/ក្រុង/ខណ្ខ
                      </option>
                      <option value="option1">គ្មានទិន្នន័យ</option>
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
                    <select className="w-full p-2 mb-4 outline-none sm:text-sm border shadow-sm border-[#64d1ff] rounded-md appearance-none">
                      <option
                        value=""
                        className="text-gray-400"
                        disabled
                        selected
                      >
                        សូមជ្រើសរើស ឃុំ/សង្កាត់
                      </option>
                      <option value="option1">គ្មានទិន្នន័យ</option>
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
                    <select className="w-full p-2 mb-4 outline-none sm:text-sm border shadow-sm border-[#64d1ff] rounded-md appearance-none">
                      <option
                        value=""
                        className="text-gray-400"
                        disabled
                        selected
                      >
                        សូមជ្រើសរើស ភូមិ
                      </option>
                      <option value="option1">គ្មានទិន្នន័យ</option>
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

      <div className="flex-1 m-auto " style={{ width: "99%" }}>
        <div className="bg-white mt-1 rounded-md">
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
          <div style={{ width: "100%" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1001033.0502020214!2d102.76085120509809!3d11.45931746038002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3105f033a39282f3%3A0x37e95344b24a2873!2sKoh%20Kong%20Province!5e0!3m2!1sen!2skh!4v1716522509201!5m2!1sen!2skh"
              width=""
              height="515"
              style={{ border: "0", width: "100%" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}