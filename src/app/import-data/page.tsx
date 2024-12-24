"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ViewPage from "../preview-data/page";
import { columnHeaders, sampleData, } from "../constant/data";
import Title from "../components/custom/header-title";
import { provinceCity, communeSangkat, branch, villages, provinceCityCode, districtCode, communeCode, villageCode, branchCode } from "../constant/data";
import LocationInformation from "../components/locationInfo/page";
import FamilyInformation from "../components/familyInfo/page";
import LandType from "../components/landInfo/page";
import ButtonGroup from "../components/custom/ImportDataButton";

// dropdown list

type ProvinceCityType = {
	[key: string]: {
		districts: {
			name: string;
			communes: string[];
		}[];
	};
};

type CommuneSangkatType = {
	[key: string]: {
		villages: string[];
	};
};

interface SelectedType {
	province: string;
	provinceCode: string;
	districtCode: string;
	district: string;
	commune: string;
	communeCode: string;
	village: string;
	villageCode: string;
	branch: string;
	branchCode: string;
}

// end dropdown list

export default function FormPage() {
	const router = useRouter();

	// Modal 
	const [showModal, setShowModal] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	// #1 LandType 

	const [inputs, setInputs] = useState({
		branches: "",
		branch_code: "",
		province_city: "",
		province_city_code: "",
		district_khan_krong: "",
		district_khan_krong_code: "",
		commune_sangket: "",
		commune_sangket_code: "",
		village: "",
		village_code: "",
		phone_commune_sangket: "",
		phone_village_chief: "",
		cheif_name_sangket: "",
		cheif_name_village: "",
		num_family: "",
		L_Map_percentage: "",
		class: "",
		level_location: "",
		A1: "",
		A2: "",
		A3: "",
		C1: "",
		C2: "",
		C3: "",
		R1: "",
		R2: "",
		R3: "",
		I1: "",
		I2: "",
		I3: "",
	});

	// End LandType

	// #2 Dropdown Selection 

	const [selected, setSelected] = useState<SelectedType>({
		province: "",
		district: "", commune: "", village: "", branch: "", provinceCode: "", districtCode: "", communeCode: "", villageCode: "", branchCode: "",
	});

	// Handle changes for each selector independently
	const handleChange =
		(field: keyof SelectedType) => (event: React.ChangeEvent<HTMLSelectElement>) => {
			const value = event.target.value;
			setSelected((prev) => {
				const updatedSelection: SelectedType = {
					...prev,
					[field]: value,
				};

				// When province is changed, reset dependent fields
				if (field === "province") {
					updatedSelection.district = "";
					updatedSelection.commune = "";
					updatedSelection.village = "";
					updatedSelection.branch = "";
					updatedSelection.districtCode = "";
					updatedSelection.communeCode = "";
					updatedSelection.villageCode = "";
					updatedSelection.branchCode = "";
					updatedSelection.provinceCode =
						provinceCityCode[value as keyof typeof provinceCityCode] || "";
				}

				// When district is changed, reset dependent fields
				if (field === "district") {
					updatedSelection.commune = "";
					updatedSelection.village = "";
					updatedSelection.branch = "";
					updatedSelection.communeCode = "";
					updatedSelection.villageCode = "";
					updatedSelection.branchCode = "";
					updatedSelection.districtCode =
						districtCode[value as keyof typeof districtCode] || "";
				}

				// When commune is changed, reset dependent fields
				if (field === "commune") {
					updatedSelection.village = "";
					updatedSelection.branch = "";
					updatedSelection.villageCode = "";
					updatedSelection.branchCode = "";
					updatedSelection.communeCode =
						communeCode[value as keyof typeof communeCode] || "";
				}

				// When village is changed, reset branch
				if (field === "village") {
					updatedSelection.branch = "";
					updatedSelection.branchCode = "";
					updatedSelection.villageCode =
						villageCode[value as keyof typeof villageCode] || "";
				}

				// When branch is changed, reset branchCode
				if (field === "branch") {
					updatedSelection.branchCode = branchCode[value as keyof typeof branchCode] || "";
				}

				return updatedSelection;
			});
		};

	// Get options for each dropdown
	const getOptions = (field: keyof SelectedType): string[] => {
		switch (field) {
			case "district":
				return selected.province
					? (provinceCity as ProvinceCityType)[selected.province]?.districts.map((d) => d.name) || []
					: [];
			case "commune":
				return selected.district
					? (provinceCity as ProvinceCityType)[selected.province]?.districts
						.find((d) => d.name === selected.district)
						?.communes || []
					: [];
			case "village":
				return selected.commune
					? (communeSangkat as CommuneSangkatType)[selected.commune]?.villages || []
					: Object.keys(villages);
			case "branch":
				return Object.keys(branch);
			default:
				return Object.keys(provinceCity as ProvinceCityType);
		}
	};

	// End Dropdown Selection 

	const closeModal = () => setShowModal(false);
	const handleBack = () => router.push("/land-classification-book");
	const handlePreview = () => router.push("/preview-data");

	// Mapping form fields to corresponding column headers
	const fieldTitles = {
		province_city: columnHeaders[0],
		province_code: columnHeaders[1],
		district_khan_krong: columnHeaders[2],
		district_khan_krong_code: columnHeaders[3],
		commune_sangket: columnHeaders[4],
		commune_sangket_code: columnHeaders[5],
		village: columnHeaders[6],
		village_code: columnHeaders[7],
		branches: columnHeaders[8],
		branch_code: columnHeaders[9],

		phone_commune_sangket: columnHeaders[10],
		cheif_name_sangket: columnHeaders[11],
		phone_village_chief: columnHeaders[12],
		cheif_name_village: columnHeaders[13],

		num_family: columnHeaders[15],
		L_Map_percentage: columnHeaders[16],
		class: columnHeaders[17],
		level_location: columnHeaders[18],

		C1: columnHeaders[19],
		C2: columnHeaders[20],
		C3: columnHeaders[21],
		R1: columnHeaders[22],
		R2: columnHeaders[23],
		R3: columnHeaders[24],
		I1: columnHeaders[25],
		I2: columnHeaders[26],
		I3: columnHeaders[27],
		A1: columnHeaders[28],
		A2: columnHeaders[29],
		A3: columnHeaders[30],
	};

	const validateForm = () => {
		let formErrors: any = {};

		if (!inputs.num_family) formErrors.field1 = "Field 1 is required";
		if (!inputs.L_Map_percentage) formErrors.field2 = "Field 2 is required";
		if (!inputs.class) formErrors.field3 = "Field 3 is required";
		if (!inputs.level_location) formErrors.field4 = "Field 4 is required";

		setErrors(formErrors);
		return Object.keys(formErrors).length === 0;
	};

	const [data, setData] = useState<any[]>([]); // State for holding the list of data
	const [errors, setErrors] = useState<any>({}); // State for validation errors

	useEffect(() => {
		// Load existing data from localStorage on page load
		const storedData = JSON.parse(localStorage.getItem('dataList') || '[]');
		setData(storedData);
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputs((prev) => ({
			...prev,
			[name]: value
		}));

		setSelected((prev) => ({
			...prev,
			[name]: value
		}))
	};

	const handleInputChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setInputs((prevInputs) => ({
			...prevInputs,
			[name]: value,
		}));

		setSelected((prevInputs) => ({
			...prevInputs,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Validate the form
		if (!validateForm()) {
			console.log("Validation failed", errors);
			return;
		}

		// Merge data from inputs and selected
		const updatedData = [...data, { ...inputs, ...selected }];

		// Log the updated data for debugging
		console.log("Updated Data:", updatedData);

		// Update state and local storage
		setData(updatedData);
		localStorage.setItem('dataList', JSON.stringify(updatedData));

		// Clear errors
		setErrors({});
	};


	// Check if all inputs are filled
	const isFormValid = Object.values(inputs).every((input) => input.trim() !== '');

	const handleClear = () => {
		setInputs({
			province_city: "", province_city_code: "", district_khan_krong: "", district_khan_krong_code: "", commune_sangket: "", commune_sangket_code: "", village: "", village_code: "", branches: "", branch_code: "", phone_commune_sangket: "", phone_village_chief: "", cheif_name_sangket: "", cheif_name_village: "", num_family: "", L_Map_percentage: "", class: "", level_location: "", A1: "", A2: "", A3: "", C1: "", C2: "", C3: "", R1: "", R2: "", R3: "", I1: "", I2: "", I3: "",
		});
	};

	const transformedColumnHeaders = columnHeaders.map(header => ({
		label: header,
		key: header,  // You can adjust this if you need a different key for each column
	}));

	return (
		<div className="flex flex-col m-auto fixed w-full">
			<Title />
			<div className="py-0 w-full h-full overflow-auto">
				<div className="border-l-2 border-r-2 border-t-2 shadow-md rounded-sm p-2 w-full overflow-auto">
					<form onSubmit={handleSubmit} className="space-y-2">

						<ButtonGroup
							handleBack={handleBack}
							handlePreview={handlePreview}
							handleClear={handleClear}
							showModal={showModal}
							message={message}
							closeModal={closeModal}
							sampleData={sampleData}
							transformedColumnHeaders={transformedColumnHeaders}
						/>

						<div className="grid grid-cols-12">
							{/* Location Information */}
							<LocationInformation
								selected={selected}
								handleChange={handleChange}
								getOptions={getOptions}
								errors={errors}
								fieldTitles={fieldTitles}
								handleInputChange={handleInputChange}  // Pass handleInputChange
								inputs={inputs}  // Pass inputs
							/>

							{/* Family Information */}
							<FamilyInformation
								inputs={inputs}
								handleInputChange={handleInputChange}
								errors={errors}
								fieldTitles={fieldTitles}
							/>


							{/* Type Land */}
						</div>

						<div className="m-5">
							<LandType
								inputs={inputs}
								handleInputChangeTextArea={handleInputChangeTextArea}
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}