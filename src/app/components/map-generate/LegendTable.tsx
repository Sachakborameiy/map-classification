import React, { useEffect, useRef } from "react";

interface LegendTableProps {
  legendData: any;
}

const LegendTable: React.FC<LegendTableProps> = ({ legendData }) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const columnHeaders = [
    "ខេត្ត/រាជធានី",
    "កូដ ខេត្ត/រាជធានី",
    "សាខា",
    "កូដ សាខា",
    "ស្រុក/ខណ្ឌ/ក្រុង",
    "កូដ ស្រុក/ខណ្ឌ/ក្រុង",
    "ឃុំ/សង្កាត់",
    "កូដ ឃុំ/សង្កាត់",
    "ភូមិ",
    "កូដ ភូមិ",
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

    if (tableRef.current) {
      tableRef.current.querySelectorAll(".resize-bar").forEach((bar) => {
        bar.addEventListener("mousedown", (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          startX = e.pageX;
          currentTh = target.parentElement as HTMLElement;
          startWidth = currentTh.offsetWidth;
          document.addEventListener("mousemove", resizeColumn);
          document.addEventListener("mouseup", stopResize);
          target.classList.add("resizing");
          return null;
        });
      });
    }
  }, [legendData]);

  return (
    legendData.length > 0 && (
      <div
        className="shadow-md rounded-lg absolute overflow-scroll top-7 opacity-90 z-50 transition-all duration-500"
        style={{ width: "85%" }}
      >
        <div>
          <table
            ref={tableRef}
            className="table-custom rounded-sm table-auto overflow-y-scroll  scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-red-100"
            style={{ width: "100%", height: "18em", tableLayout: "fixed" }}
          >
            <thead className="bg-[#1B3351] text-white">
              <tr className="">
                {columnHeaders.map((header, index) => (
                  <th
                    key={index}
                    className={`relative group font-normal border px-4 py-2 text-sm ${index === 15? 'w-96': 'w-40' }`}
                  >
                    <span>{header}</span>
                    <div className="resize-bar absolute right-0 top-0 h-full w-2 cursor-col-resize bg-white opacity-0 group-hover:opacity-100"></div>
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
                      className={`relative group border border-gray-300 px-4 py-2 text-sm ${idx === 15? 'custom-width': 'w-40' }`}
                    >
                      <span className="break-hyphen">{item[header]}</span>
                      <div className="resize-bar absolute right-0 top-0 h-full w-1.5 cursor-col-resize bg-white opacity-0 group-hover:opacity-100"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default LegendTable;
