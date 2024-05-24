import { ChevronDown } from "lucide-react";
import Image from "next/image";


export default function Home() {
  return (
    <main className="relative">
      <div className="items-center" style={{width: "30%"}}>
        <div
          className="ml-4"
          style={{ fontFamily: "MyFont, sans-serif" }}
        >
          <div className="mt-2">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-xl text-center font-semibold mb-4 flex​ ">
                ស្វែងរកចំណាត់ថ្នាក់ទីតាំង
              </h2>

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
                  <label className="block text-sm font-medium text-gray-700​​​ pb-2">
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

      <div className="mt-4 m-auto" style={{width: "98%"}}>
        <div className="bg-white mt-4 rounded-md">
          <div className="mt-2 p-4">
            <div className="flex" style={{width: "50%"}}>
              <div className="w-2 h-2 bg-red-500 mt-2"></div>
              <div className="ml-2">
                <label className="block text-md font-extrabold text-gray-700">
                  ទីតាំង​(កំណត់សម្គាល់)
                </label>
              </div>
            </div>
          </div>              
        <div style={{width: "100%"}}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1954.3245757230375!2d104.9160948385161!3d11.57698999715619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109515d33eb7869%3A0xec395ec217dc95be!2s62-68%20AH11%2C%20Phnom%20Penh!5e0!3m2!1sen!2skh!4v1715315682430!5m2!1sen!2skh"
            className="w-full h-auto"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
        </div>
      </div>
    </main>
  );
}
