"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ViewPage from "../table-preview/page";
import ShowModal from "../table-verify/page";
import { sampleData, columnHeaders } from "../constant/data";
import Title from "../components/custom/header-title";
import { provinceCity, districtKhanKrong, communeSangkat, villages, branch } from "../constant/data";

export default function FormPage() {
	const router = useRouter();

	// Modal 
	const [showModal, setShowModal] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	const [inputs, setInputs] = useState({
		branches: "",
		branch_code: "",
		province_city: "",
		district_khan_krong: "",
		commune_sangket: "",
		village: "",
		phone_commune_sangket: "",
		phone_village_chief: "",
		num_family: "",
		L_Map_percentage: "",
		class: "",
		level_location: "",
	});

	// Start Dropdown
	const [locationOptions, setLocationOptions] = useState<{
		province_city: string[];
		district_khan_krong: string[];
		commune_sangket: string[]; // explicitly set as string[]
		village: string[]; // explicitly set as string[]
	}>({
		province_city: Object.keys(provinceCity), // initialize with keys
		district_khan_krong: [], // initialize with empty array
		commune_sangket: [], // initialize with empty array
		village: [], // initialize with empty array
	});

	// Change this useEffect
	useEffect(() => {
		// Set the initial options for districts if province is selected
		if (inputs.province_city) {
			setLocationOptions(prev => ({
				...prev,
				district_khan_krong: Object.keys(districtKhanKrong[inputs.province_city as keyof typeof districtKhanKrong]?.communes || {}),
				commune_sangket: [],
				village: [],
			}));
		}
	}, [inputs.province_city]);


	useEffect(() => {
		// Set the initial options for districts if province is selected
		if (inputs.province_city) {
			setLocationOptions(prev => ({
				...prev,
				district_khan_krong: Object.keys(districtKhanKrong[inputs.province_city as keyof typeof districtKhanKrong]?.communes || {}),
				commune_sangket: [],
				village: [],
			}));
		}
	}, [inputs.province_city]);

	useEffect(() => {
		if (inputs.province_city) {
			setLocationOptions(prev => ({
				...prev,
				district_khan_krong: Object.keys(districtKhanKrong[inputs.province_city as keyof typeof districtKhanKrong]?.communes || {}),
				commune_sangket: [],
				village: [],
			}));
		}
	}, [inputs.province_city]);

	const handleLocationChange = (field: string, value: string) => {
		setData(prev => ({ ...prev, [field]: value }));
	};

	// End Dropdown


	const handlePreviewClick = () => {
		setMessage("A reset link has been sent to your email. Please check your inbox.");
		setShowModal(true);
	};

	const closeModal = () => setShowModal(false);
	const handleBack = () => router.push("/land-classification-book");

	// Mapping form fields to corresponding column headers
	const fieldTitles = {
		branch: columnHeaders[0],
		branch_code: columnHeaders[1],
		province_city: columnHeaders[2],
		province_code: columnHeaders[3], // "ខេត្ត/រាជធានី"
		district_khan_krong: columnHeaders[4], // "ស្រុក/ខណ្ឌ/ក្រុង"
		district_khan_krong_code: columnHeaders[5],
		commune_sangket: columnHeaders[6], // "ឃុំ/សង្កាត់"
		commune_sangket_code: columnHeaders[7],
		phone_commune_sangket: columnHeaders[8], // "លេខទូរស័ព្ទ ឃុំ/សង្កាត់"
		village: columnHeaders[9], // "ភូមិ"
		village_code: columnHeaders[10],
		phone_village_chief: columnHeaders[11], // "លេខទូរស័ព្ទ មេភូមិ"
		num_family: columnHeaders[12], // "ចំនួន គ្រួសារ"
		L_Map_percentage: columnHeaders[13], // "L-Map (ភាគរយ)"
		class: columnHeaders[14], // "ចំណាត់ថ្នាក់"
		level_location: columnHeaders[15], // "កម្រិតទីតាំង"

	};

	const validateForm = () => {
		let formErrors: any = {};
		// Validation Rules
		// if (!inputs.province_city) formErrors.province_city = "Province is required";
		// if (!inputs.district_khan_krong) formErrors.district_khan_krong = "District is required";
		// if (!inputs.commune_sangket) formErrors.commune_sangket = "Commune is required";
		// if (!inputs.village) formErrors.village = "Village is required";
		// if (!inputs.phone_commune_sangket || !/^\d+$/.test(form.phone_commune_sangket)) formErrors.phone_commune_sangket = "Valid phone number is required for Commune";
		// if (!inputs.phone_village_chief || !/^\d+$/.test(form.phone_village_chief)) formErrors.phone_village_chief = "Valid phone number is required for Village Chief";
		// if (!inputs.num_family || isNaN(Number(inputs.num_family))) formErrors.num_family = "Number of family must be a valid number";
		// if (!inputs.L_Map_percentage || isNaN(Number(inputs.L_Map_percentage))) formErrors.L_Map_percentage = "L-Map percentage must be a valid number";
		// if (!inputs.class) formErrors.class = "Class is required";
		// if (!inputs.level_location) formErrors.level_location = "Location level is required";

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
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		const updatedData = [...data, inputs];
		setData(updatedData);

		localStorage.setItem('dataList', JSON.stringify(updatedData));

		setInputs({
			branch: "",
			branch_code: "",
			province_city: "",
			district_khan_krong: "",
			commune_sangket: "",
			village: "",
			phone_commune_sangket: "",
			phone_village_chief: "",
			num_family: "",
			L_Map_percentage: "",
			class: "",
			level_location: "",
		});
		setErrors({});
	};

	// Check if all inputs are filled
	const isFormValid = Object.values(inputs).every((input) => input.trim() !== '');

	const handleDelete = (index: number) => {
		// Create a new array without the item at the specified index
		const updatedData = data.filter((_, i) => i !== index);
		setData(updatedData);

		// Update localStorage
		localStorage.setItem("dataList", JSON.stringify(updatedData));
	};

	return (
		<div className="g-white flex flex-col m-auto fixed w-full">
			<Title />
			<div className="bg-white shadow-md py-0 w-full h-full overflow-auto">
				<div className="bg-white border-l-2 border-r-2 border-t-2 shadow-md rounded-sm p-2 w-full overflow-auto">
					<form onSubmit={handleSubmit} className="space-y-2 py-2 pt-0">
						<div className="flex justify-between items-center">
							<button
								type="reset"
								onClick={handleBack}
								className="bg-gray-500 py-2 px-4 rounded-md shadow-lg text-white hover:bg-gray-700 hover:shadow-xl transition-all text-sm"
							>
								<ArrowLeft className="h-5 w-5" />
							</button>

							<div className="flex justify-end space-x-3">
								<button
									type="submit"
									className="bg-[#0f81c3] text-white py-2 px-4 rounded-md shadow-lg hover:bg-[#3578b6] hover:shadow-xl transition-all text-sm"
								>
									បន្ថែម
								</button>

								<button
									type="submit"
									onClick={handlePreviewClick}
									className="bg-[#1B3351] text-white py-2 px-4 rounded-md shadow-lg hover:bg-[#152942] hover:shadow-xl transition-all text-sm"
								>
									មើលបញ្ជាក់
								</button>

								<button
									type="reset"
									className="bg-[#FF5733] text-white py-2 px-4 rounded-md shadow-lg hover:bg-[#E04E2E] hover:shadow-xl transition-all text-sm"
								>
									លុប
								</button>
							</div>

							<ShowModal showModal={showModal} message={message} closeModal={closeModal} sampleData={sampleData} columnHeaders={columnHeaders} />
						</div>


						{/* Location Information */}
						<div className="grid grid-cols-12 gap-4">

							<div className="col-span-6 flex flex-col">
								<fieldset className="border border-gray-300 rounded-lg px-1 py-2 pt-0 md:px-4 bg-white shadow-sm">
									<legend className="text-base font-semibold text-[#1B3351] px-4">ទីតាំង</legend>
									<div className="grid grid-cols-1 md:grid-cols-12 rounded-md gap-6 p-1">
										{/* Left Section */}
										<div className="col-span-1 md:col-span-6 grid grid-cols-1 md:grid-cols-6 gap-2">
											{/* Row 1 */}
											<div className="flex flex-col md:flex-row items-start md:items-center col-span-1 md:col-span-6 gap-4">
												<div className="w-full md:flex-1">
													<label htmlFor="province_city" className="text-sm font-medium text-[#1B3351]">
														{fieldTitles.province_city}
													</label>
													<select
														id="province_city"
														name="province_city"
														value={inputs.province_city}
														onChange={(e) => handleLocationChange("province_city", e.target.value)}
														className="w-full text-sm p-2 border shadow-sm rounded-md focus:outline-none focus:ring-1 focus:ring-[#1B3351]"
													>
														<option value="">ជ្រើសរើសតារាង</option>
														{locationOptions.province_city?.map((option, index) => (
															<option key={index} value={option}>{option}</option>
														))}
													</select>
													{errors.province_city && <span className="text-red-500 text-xs">{errors.province_city}</span>}
												</div>
												<div className="w-full md:w-1/3">
													<label htmlFor="province_code" className="text-sm font-medium text-[#1B3351]">
														លេខកូដខេត្ត/រាជធានី
													</label>
													<input
														type="text"
														id="province_code"
														name="province_code"
														value={inputs.province_code}
														onChange={handleInputChange}
														className="input-global"
														disabled
													/>
												</div>
											</div>

											{/* Row 2 */}
											<div className="flex flex-col md:flex-row items-start md:items-center col-span-1 md:col-span-6 gap-2">
												<div className="w-full md:flex-1">
													<label htmlFor="district_khan_krong" className="text-sm font-medium text-[#1B3351]">
														{fieldTitles.district_khan_krong}
													</label>
													<select
														id="district_khan_krong"
														name="district_khan_krong"
														value={inputs.district_khan_krong}
														onChange={(e) => handleLocationChange("district_khan_krong", e.target.value)}
														className="w-full text-sm p-2 border shadow-sm rounded-md focus:outline-none focus:ring-1 focus:ring-[#1B3351]"
													>
														<option value="">ជ្រើសរើសតារាង</option>
														{locationOptions.district_khan_krong?.map((option, index) => (
															<option key={index} value={option}>{option}</option>
														))}
													</select>
													{errors.district_khan_krong && <span className="text-red-500 text-xs">{errors.district_khan_krong}</span>}
												</div>
												<div className="w-full md:w-1/3">
													<label htmlFor="district_code" className="text-sm font-medium text-[#1B3351]">
														លេខកូដស្រុក
													</label>
													<input
														type="text"
														id="district_code"
														name="district_code"
														value={inputs.district_code}
														onChange={handleInputChange}
														className="input-global"
														disabled
													/>
												</div>
											</div>

											{/* Row 3 */}
											<div className="flex flex-col md:flex-row items-start md:items-center col-span-1 md:col-span-6 gap-2">
												<div className="w-full md:flex-1">
													<label htmlFor="commune_sangket" className="text-sm font-medium text-[#1B3351]">
														{fieldTitles.commune_sangket}
													</label>
													<select
														id="commune_sangket"
														name="commune_sangket"
														value={inputs.commune_sangket}
														onChange={(e) => handleLocationChange("commune_sangket", e.target.value)}
														className="dropdown-global"
													>
														<option value="">ជ្រើសរើសតារាង</option>
														{locationOptions.commune_sangket?.map((option, index) => (
															<option key={index} value={option}>{option}</option>
														))}
													</select>
													{errors.commune_sangket && <span className="text-red-500 text-xs">{errors.commune_sangket}</span>}
												</div>
												<div className="w-full md:w-1/3">
													<label htmlFor="commune_code" className="text-sm font-medium text-[#1B3351]">
														លេខកូដឃំុ/សង្កាត់
													</label>
													<input
														type="text"
														id="commune_code"
														name="commune_code"
														value={inputs.commune_code}
														onChange={handleInputChange}
														className="input-global"
														disabled
													/>
												</div>
											</div>

											{/* Row 4 */}
											<div className="flex flex-col md:flex-row items-start md:items-center col-span-1 md:col-span-6 gap-2">
												<div className="w-full md:flex-1">
													<label htmlFor="village" className="text-sm font-medium text-[#1B3351]">
														{fieldTitles.village}
													</label>
													<select
														id="village"
														name="village"
														value={inputs.village}
														onChange={(e) => handleLocationChange("village", e.target.value)}
														className="dropdown-global"
													>
														<option value="">ជ្រើសរើសតារាង</option>
														{locationOptions.village?.map((option, index) => (
															<option key={index} value={option}>{option}</option>
														))}
													</select>
													{errors.village && <span className="text-red-500 text-xs">{errors.village}</span>}
												</div>
												<div className="w-full md:w-1/3">
													<label htmlFor="village_code" className="text-sm font-medium text-[#1B3351]">
														លេខកូដភូមិ
													</label>
													<input
														type="text"
														id="village_code"
														name="village_code"
														value={inputs.village_code}
														onChange={handleInputChange}
														className="input-global"
														disabled
													/>
												</div>
											</div>
										</div>

										{/* Right Section */}
										<div className="col-span-1 md:col-span-6 grid grid-cols-1 md:grid-cols-6 gap-4">
											{/* Branch Selection */}
											<div className="flex flex-col md:flex-row items-start md:items-center col-span-1 md:col-span-6 gap-6 mt-4 md:mt-16">
												<div className="w-full md:flex-1">
													<label htmlFor="province_city" className="text-sm font-medium text-[#1B3351]">
														{fieldTitles.branch}
													</label>
													<select
														id="branch"
														name="branch"
														value={inputs.branch}
														className="dropdown-global"
													>
														<option value="">ជ្រើសរើសតារាង</option>
														{locationOptions.branch?.map((option, index) => (
															<option key={index} value={option}>{option}</option>
														))}
													</select>
													{errors.branch && <span className="text-red-500 text-xs">{errors.branch}</span>}
												</div>
												<div className="w-full md:w-1/3">
													<label htmlFor="branch_code" className="text-sm font-medium text-[#1B3351]">
														លេខកូដសាខា
													</label>
													<input
														type="text"
														id="branch_code"
														name="branch_code"
														value={inputs.branch_code}
														onChange={handleInputChange}
														className="input-global"
														disabled
													/>
												</div>
											</div>
											
											{/* Phone Inputs */}
											<div className="col-span-1 md:col-span-6">
												<div className="flex flex-col md:flex-row items-start md:items-center col-span-1 md:col-span-6 gap-6 mt-4 md:mt-2">
													<div>
														<label htmlFor="phone_commune_sangket" className="text-sm font-medium text-[#1B3351]">
															{fieldTitles.phone_commune_sangket}
														</label>
														<input
															type="text"
															id="phone_commune_sangket"
															name="phone_commune_sangket"
															value={inputs.phone_commune_sangket}
															onChange={handleInputChange}
															placeholder={`បញ្ចូល ${fieldTitles.phone_commune_sangket}`}
															className="input-global"
														/>
														{errors.phone_commune_sangket && <span className="text-red-500 text-xs">{errors.phone_commune_sangket}</span>}
													</div>
													<div>
														<label htmlFor="phone_commune_sangket" className="text-sm font-medium text-[#1B3351]">
															ឈ្មោះ មេឃុំ/សង្កាត់
														</label>
														<input
															type="text"
															id="phone_village_chief"
															name="phone_village_chief"
															value={inputs.phone_village_chief}
															onChange={handleInputChange}
															placeholder={`បញ្ចូល ${fieldTitles.phone_village_chief}`}
															className="input-global"
														/>
														{errors.phone_village_chief && <span className="text-red-500 text-xs">{errors.phone_village_chief}</span>}
													</div>
												</div>
												
												<div className="flex flex-col md:flex-row items-start md:items-center col-span-1 md:col-span-6 gap-6 mt-4 md:mt-2">
													<div>
														<label htmlFor="phone_village_chief" className="text-sm font-medium text-[#1B3351]">
															{fieldTitles.phone_village_chief}
														</label>
														<input
															type="text"
															id="phone_village_chief"
															name="phone_village_chief"
															value={inputs.phone_village_chief}
															onChange={handleInputChange}
															placeholder={`បញ្ចូល ${fieldTitles.phone_village_chief}`}
															className="input-global"
														/>
														{errors.phone_village_chief && <span className="text-red-500 text-xs">{errors.phone_village_chief}</span>}
													</div>
													<div>
														<label htmlFor="phone_commune_sangket" className="text-sm font-medium text-[#1B3351]">
															ឈ្មោះ មេភូមិ
														</label>
														<input
															type="text"
															id="phone_village_chief"
															name="phone_village_chief"
															value={inputs.phone_village_chief}
															onChange={handleInputChange}
															placeholder={`បញ្ចូល ${fieldTitles.phone_village_chief}`}
															className="input-global"
														/>
														{errors.phone_village_chief && <span className="text-red-500 text-xs">{errors.phone_village_chief}</span>}
													</div>
												</div>
											</div>

										</div>
									</div>
								</fieldset>
							</div>

							{/* Family Information */}
							<div className="col-span-6 flex flex-col">
								<fieldset className="border border-gray-300 rounded-lg pt-2 px-4 pb-4">
									<legend className="text-sm font-semibold text-[#1B3351] px-2">ព័ត៌មានគ្រួសារ</legend>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

										{/* num_family Input */}
										<div className="flex flex-col">
											<label htmlFor="num_family" className="text-sm font-medium text-[#1B3351]">{fieldTitles["num_family"]}</label>
											<input
												type="text"
												id="num_family"
												name="num_family"
												value={inputs.num_family}
												onChange={handleInputChange}
												placeholder={`បញ្ចូល${fieldTitles["num_family"]}`}
												className="input-global"
											/>
											{errors.num_family && <span className="text-red-500 text-xs">{errors.num_family}</span>}
										</div>

										{/* L_Map_percentage Input */}
										<div className="flex flex-col">
											<label htmlFor="L_Map_percentage" className="text-sm font-medium text-[#1B3351]">{fieldTitles["L_Map_percentage"]}</label>
											<input
												type="text"
												id="L_Map_percentage"
												name="L_Map_percentage"
												value={inputs.L_Map_percentage}
												onChange={handleInputChange}
												placeholder={`បញ្ចូល${fieldTitles["L_Map_percentage"]}`}
												className="input-global"
											/>
											{errors.L_Map_percentage && <span className="text-red-500 text-xs">{errors.L_Map_percentage}</span>}
										</div>

										{/* class Input */}
										<div className="flex flex-col">
											<label htmlFor="class" className="text-sm font-medium text-[#1B3351]">{fieldTitles["class"]}</label>
											<input
												type="text"
												id="class"
												name="class"
												value={inputs.class}
												onChange={handleInputChange}
												placeholder={`បញ្ចូល${fieldTitles["class"]}`}
												className="input-global"
											/>
											{errors.class && <span className="text-red-500 text-xs">{errors.class}</span>}
										</div>

										{/* level_location Input */}
										<div className="flex flex-col">
											<label htmlFor="level_location" className="text-sm font-medium text-[#1B3351]">{fieldTitles["level_location"]}</label>
											<input
												type="text"
												id="level_location"
												name="level_location"
												value={inputs.level_location}
												onChange={handleInputChange}
												placeholder={`បញ្ចូល${fieldTitles["level_location"]}`}
												className="input-global"
											/>
											{errors.level_location && <span className="text-red-500 text-xs">{errors.level_location}</span>}
										</div>
									</div>
								</fieldset>


							</div>

							{/* Type Land */}
						</div>
						<div>
							<fieldset className="w-full border border-gray-300 rounded-lg pt-2 px-4 pb-4">
								<legend className="text-sm font-semibold text-[#1B3351] px-2">ប្រភេទដី</legend>
								<div className="grid grid-cols-4 gap-3">
									{[
										{ field: "C1", label: "ដីពាណិជ្ជកម្ម C1", placeholder: "បញ្ចូលដីពាណិជ្ជកម្ម C1" },
										{ field: "R1", label: "ដីលំនៅឋាន R1", placeholder: "បញ្ចូលដីលំនៅឋាន R1" },
										{ field: "I1", label: "ដីឧស្សាហកម្ម I1", placeholder: "បញ្ចូលដីឧស្សាហកម្ម I1" },
										{ field: "A1", label: "ដីកសិកម្ម A1", placeholder: "បញ្ចូលដីកសិកម្ម A1" },
										{ field: "C2", label: "ដីពាណិជ្ជកម្ម C2", placeholder: "បញ្ចូលដីពាណិជ្ជកម្ម C2" },
										{ field: "R2", label: "ដីលំនៅឋាន R2", placeholder: "បញ្ចូលដីលំនៅឋាន R2" },
										{ field: "I2", label: "ដីឧស្សាហកម្ម I2", placeholder: "បញ្ចូលដីឧស្សាហកម្ម I2" },
										{ field: "A2", label: "ដីកសិកម្ម A2", placeholder: "បញ្ចូលដីកសិកម្ម A2" },
										{ field: "C3", label: "ដីពាណិជ្ជកម្ម C3", placeholder: "បញ្ចូលដីពាណិជ្ជកម្ម C3" },
										{ field: "R3", label: "ដីលំនៅឋាន R3", placeholder: "បញ្ចូលដីលំនៅឋាន R3" },
										{ field: "I3", label: "ដីឧស្សាហកម្ម I3", placeholder: "បញ្ចូលដីឧស្សាហកម្ម I3" },
										{ field: "A3", label: "ដីកសិកម្ម A3", placeholder: "បញ្ចូលដីកសិកម្ម A3" },
									].map(({ field, label, placeholder }) => (
										<div key={field} className="flex flex-col">
											<label htmlFor={field} className="text-sm font-medium text-[#1B3351]">{label}</label>
											<textarea
												id={field}
												name={field}
												value={inputs[field as keyof typeof inputs]}
												onChange={handleInputChange}
												placeholder={placeholder}
												className="bg-[#FFFFFF] h-10 input-global"
											/>
										</div>
									))}
								</div>
							</fieldset>
						</div>
					</form>
				</div>
				<ViewPage data={data} onDelete={handleDelete} />
			</div>
		</div>
	);
}
