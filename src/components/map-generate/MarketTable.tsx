// MarkerTable.tsx
import React from "react";
import { OverlayView } from "@react-google-maps/api";
import { CircleX } from "lucide-react";

interface MarkerTableProps {
  position: google.maps.LatLngLiteral;
  legendData: any;
  onClose: () => void;
}

const MarkerTable: React.FC<MarkerTableProps> = ({ position, legendData, onClose }) => {
  const markerStyles: React.CSSProperties = {
    background: "white",
    padding: "10px",
    border: "1px solid black",
    borderRadius: "5px",
    maxWidth: "200px", // Set maximum width for the marker
  };

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

  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(width, height) => ({
        x: -width / 2,
        y: -height / 2,
      })}
    >
      <div className="relative shadow-md rounded-lg overflow-scroll top-7 opacity-90 z-50" style={{ width: "85%" }}>
        <button
          className="relative top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose} // Call onClose function when the button is clicked
        >
          <CircleX className="w-6 h-6" />
        </button>
        {legendData.length > 0 && (
          <table
            className="table table-striped table-bordered table-resizable"
            // className="table-custom relative rounded-sm table-auto scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-red-100 table table-striped table-bordered table-resizable"
            style={{ width: "100%", tableLayout: "fixed" }}
          >
            <thead className="bg-[#1B3351] text-white">
              <tr className="">
                {columnHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="relative group font-normal border px-4 py-2 text-sm w-40"
                  >
                    <span>{header}</span>
                    <div className="resize-bar"></div>
                    {/* <div className="resize-bar  absolute right-0 top-0 h-full w-2 cursor-col-resize bg-white opacity-0 group-hover:opacity-100"></div> */}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {legendData.map((item: any, index: any) => (
                <tr
                  key={index}
                  className="border-b hover:bg-[#284870] hover:text-white bg-gray-100 cursor-pointer"
                >
                  {columnHeaders.map((header, idx) => (
                    <td
                      key={idx}
                      className="​​relative group border border-gray-300 px-4 py-2 text-sm"
                    >
                      <span>{item[header]}</span>
                      <div className="resize-bar absolute right-0 top-0 h-full w-2 cursor-col-resize bg-white opacity-0 group-hover:opacity-100"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </OverlayView>
  );
};

export default MarkerTable;
