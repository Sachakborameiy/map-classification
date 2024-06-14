// utils/exportToExcel.js
import * as XLSX from 'xlsx';

const exportToExcel = (tableData:any, filename = 'data') => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(tableData);
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

export default exportToExcel;
