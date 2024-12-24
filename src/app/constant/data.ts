export const sampleData = [
  {
    "provinceCity": "Phnom Penh",
    "provinceCode": "PP",
    "district": "Khan 1",
    "districtCode": "K1",
    "commune": "Commune 1",
    "communeCode": "C1",
    "village": "Village 1",
    "villageCode": "V1",
    "branch": "Branch 1",
    "branchCode": "B1", 

    "phone_commune_sangket": "012345678",
    "cheif_name_sangket": "boramei",
    "phone_village_chief": "098765432",
    "cheif_name_village": "beramo",

    "num_family": "100",
    "L_Map_percentage": "20%",
    "class": "Class 1",
    "level_location": "Level 1",

    "C1": "50",
    "C2": "30",
    "C3": "20",
    "R1": "10",
    "R2": "15",
    "R3": "25",
    "I1": "5",
    "I2": "8",
    "I3": "12",
    "A1": "50",
    "A2": "60",
    "A3": "70"
  },
];

export const columnHeaders = [
  "ខេត្ត/រាជធានី",
  "កូដ ខេត្ត/រាជធានី",
  "ស្រុក/ខណ្ឌ/ក្រុង",
  "កូដ ស្រុក/ខណ្ឌ/ក្រុង",
  "ឃុំ/សង្កាត់",
  "កូដ ឃុំ/សង្កាត់",
  "ភូមិ",
  "កូដ ភូមិ",
  "សាខា",
  "កូដ សាខា",

  "លេខទូរស័ព្ទ ឃុំ/សង្កាត់",
  "ឈ្មោះមេឃុំ",
  "លេខទូរស័ព្ទ មេភូមិ",
  "ឈ្មោះមេភូមិ",

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
  "ដីឧស្សាហកម្ម I3",
  "ដីកសិកម្ម A1",
  "ដីកសិកម្ម A2",
  "ដីកសិកម្ម A3",
];

// Location Sample Data

// data.ts

export const provinceCity = {
  "Phnom Penh": {
    districts: [
      {
        name: "Chamkarmon",
        communes: ["Boeng Keng Kang", "Toul Kork"]
      },
      { name: "Daun Penh", communes: ["Phsar Thmei", "Chey Chumneas"] },
      { name: "Sangkat Ou Ruessei", communes: ["Toul Svay Prey", "Sangkat Ou Ruessei"] },
    ],
  },
  "Siem Reap": {
    districts: [
      { name: "Siem Reap", communes: ["Sangkat Svay Dangkum", "Sangkat Russei", "Sangkat Sala Kamraeuk"] },
      { name: "Puok", communes: ["Sangkat Chreav", "Sangkat Kouk Roka"] },
    ],
  },
  "Battambang": {
    districts: [
      { name: "Battambang", communes: ["Sangkat Phnom Sampov"] },
      { name: "Moung Ruessei", communes: ["Sangkat Phsar", "Sangkat Krang"] },
    ],
  },
};

export const districtKhanKrong = {
  "Chamkarmon": {
    communes: ["Boeng Keng Kang", "Toul Kork"],
  },
  "Daun Penh": {
    communes: ["Phsar Thmei", "Chey Chumneas"],
  },
  "Siem Reap": {
    communes: ["Sangkat Svay Dangkum", "Sangkat Russei", "Sangkat Sala Kamraeuk"],
  },
  "Battambang": {
    communes: ["Sangkat Phnom Sampov", "Sangkat Rattanak"],
  },
};

export const communeSangkat = {
  "Boeng Keng Kang": {
    villages: ["Village 1", "Village 2", "Village 3"],
  },
  "Toul Kork": {
    villages: ["Village 4", "Village 5", "Village 6"],
  },
  "Sangkat Svay Dangkum": {
    villages: ["Village 7", "Village 8", "Village 9"],
  },
  "Sangkat Phnom Sampov": {
    villages: ["Village 10", "Village 11", "Village 12"],
  },
};

export const villages = {
  "Village 1": {
    details: "Details for Village 1",
  },
  "Village 2": {
    details: "Details for Village 2",
  },
  "Village 3": {
    details: "Details for Village 3",
  },
  "Village 4": {
    details: "Details for Village 4",
  },
  "Village 5": {
    details: "Details for Village 5",
  },
  "Village 6": {
    details: "Details for Village 6",
  },
  "Village 7": {
    details: "Details for Village 7",
  },
  "Village 8": {
    details: "Details for Village 8",
  },
  "Village 9": {
    details: "Details for Village 9",
  },
  "Village 10": {
    details: "Details for Village 10",
  },
  "Village 11": {
    details: "Details for Village 11",
  },
  "Village 12": {
    details: "Details for Village 12",
  },
};

export const branch = {
  "Branch I": {
    details: "Details for branch I",
  },
  "Branch II": {
    details: "Details for branch II",
  },
};

export const provinceCityCode = {
  "Phnom Penh": "001",
  "Siem Reap": "002",
  "Battambang": "003",
};

export const districtCode = {
  "Chamkarmon": "001A",
  "Daun Penh": "001B",
  "Siem Reap": "002A",
  "Battambang": "003A",
};

export const communeCode = {
  "Boeng Keng Kang": "001A1",
  "Toul Kork": "001A2",
  "Sangkat Svay Dangkum": "002A1",
  "Sangkat Phnom Sampov": "003A1",
};

export const villageCode = {
  "Village 1": "001A1V1",
  "Village 2": "001A1V2",
  "Village 3": "001A1V3",
  "Village 4": "001A2V1",
  "Village 5": "001A2V2",
  "Village 6": "001A2V3",
  "Village 7": "002A1V1",
  "Village 8": "002A1V2",
  "Village 9": "002A1V3",
  "Village 10": "003A1V1",
  "Village 11": "003A1V2",
  "Village 12": "003A1V3",
};

export const branchCode = {
  "Branch I": "B001",
  "Branch II": "B002",
};
