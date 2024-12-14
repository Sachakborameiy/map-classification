import React from 'react';

const ViewPage = () => {
    // Sample data for the rows (replace with your actual data)
    const sampleData = [
        {
            "province_city": "Phnom Penh", "province_city_code": "PP", "branch": "Branch 1", "branch_code": "B1",
            "district_khan_krong": "Khan 1", "district_khan_krong_code": "K1", "commune_sangket": "Commune 1", "commune_sangket_code": "C1",
            "village": "Village 1", "village_code": "V1", "phone_commune_sangket": "012345678", "phone_village_chief": "098765432", 
            "num_family": "100", "L_Map_percentage": "20%", "class": "Class 1", "level_location": "Level 1", "C1": "50", "C2": "30",
            "C3": "20", "R1": "10", "R2": "15", "R3": "25", "I1": "5", "I2": "8", "I3": "12", "A1": "50", "A2": "60", "A3": "70"
        },
        {
            "province_city": "Siem Reap", "province_city_code": "SR", "branch": "Branch 2", "branch_code": "B2",
            "district_khan_krong": "Khan 2", "district_khan_krong_code": "K2", "commune_sangket": "Commune 2", "commune_sangket_code": "C2",
            "village": "Village 2", "village_code": "V2", "phone_commune_sangket": "023456789", "phone_village_chief": "097654321", 
            "num_family": "200", "L_Map_percentage": "30%", "class": "Class 2", "level_location": "Level 2", "C1": "60", "C2": "40",
            "C3": "30", "R1": "15", "R2": "20", "R3": "35", "I1": "10", "I2": "12", "I3": "18", "A1": "55", "A2": "65", "A3": "75"
        },
        {
            "province_city": "Battambang", "province_city_code": "BB", "branch": "Branch 3", "branch_code": "B3",
            "district_khan_krong": "Khan 3", "district_khan_krong_code": "K3", "commune_sangket": "Commune 3", "commune_sangket_code": "C3",
            "village": "Village 3", "village_code": "V3", "phone_commune_sangket": "024567890", "phone_village_chief": "096543210", 
            "num_family": "300", "L_Map_percentage": "40%", "class": "Class 3", "level_location": "Level 3", "C1": "70", "C2": "50",
            "C3": "40", "R1": "20", "R2": "25", "R3": "45", "I1": "15", "I2": "18", "I3": "22", "A1": "60", "A2": "70", "A3": "80"
        }
    ];

    const columnHeaders = [
        "ខេត្ត/រាជធានី", "កូដ ខេត្ត/រាជធានី", "សាខា", "កូដ សាខា", 
        "ស្រុក/ខណ្ឌ/ក្រុង", "កូដ ស្រុក/ខណ្ឌ/ក្រុង", "ឃុំ/សង្កាត់", "កូដ ឃុំ/សង្កាត់",
        "ភូមិ", "កូដ ភូមិ", "លេខទូរស័ព្ទ ឃុំ/សង្កាត់", "លេខទូរស័ព្ទ មេភូមិ", 
        "ចំនួន គ្រួសារ", "L-Map (ភាគរយ)", "ចំណាត់ថ្នាក់", "កម្រិតទីតាំង", 
        "ដីពាណិជ្ជកម្ម C1", "ដីពាណិជ្ជកម្ម C2", "ដីពាណិជ្ជកម្ម C3", "ដីលំនៅឋាន R1", 
        "ដីលំនៅឋាន R2", "ដីលំនៅឋាន R3", "ដីឧស្សាហកម្ម I1", "ដីឧស្សាហកម្ម I2"
    ];

    return (
        <div className="space-y-4 rounded-md bg-gray-100 p-6 py-2">
            {/* Table Section */}
            <div className="overflow-x-auto overflow-y-auto h-[220px] mt-6">
                <table className="min-w-full border-separate border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-200">
                        <tr>
                            {/* Column headers using Khmer text */}
                            {columnHeaders.map((header, index) => (
                                <th key={index} className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Display the data for 3 entries */}
                        {sampleData.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50">
                                {columnHeaders.map((header, colIndex) => (
                                    <td key={colIndex} className="px-4 py-3 border-b border-gray-200 text-sm text-gray-600">
                                        {/* Display the corresponding data */}
                                        <span>{row[header.replace(/ /g, '_')] || 'N/A'}</span>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewPage;
