"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ViewPage from "../table-preview/page";
import ShowModal from "../table-verify/page";
import { sampleData } from "../constant/data";

// Helper function to fetch location data from Google API
const fetchLocationData = async (query: string) => {
	const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=YOUR_GOOGLE_API_KEY`);
	const data = await response.json();
	return data.predictions.map((prediction: any) => prediction.description);
};

export default function FormPage() {

	const columnHeaders = [
		"ខេត្ត/រាជធានី", "កូដ ខេត្ត/រាជធានី", "សាខា", "កូដ សាខា",
		"ស្រុក/ខណ្ឌ/ក្រុង", "កូដ ស្រុក/ខណ្ឌ/ក្រុង", "ឃុំ/សង្កាត់", "កូដ ឃុំ/សង្កាត់",
		"ភូមិ", "កូដ ភូមិ", "លេខទូរស័ព្ទ ឃុំ/សង្កាត់", "លេខទូរស័ព្ទ មេភូមិ",
		"ចំនួន គ្រួសារ", "L-Map (ភាគរយ)", "ចំណាត់ថ្នាក់", "កម្រិតទីតាំង",
		"ដីពាណិជ្ជកម្ម C1", "ដីពាណិជ្ជកម្ម C2", "ដីពាណិជ្ជកម្ម C3", "ដីលំនៅឋាន R1",
		"ដីលំនៅឋាន R2", "ដីលំនៅឋាន R3", "ដីឧស្សាហកម្ម I1", "ដីឧស្សាហកម្ម I2"
	];

	const router = useRouter();
	const path = usePathname();
	const initialFormState = {
		province_city: "",
		province_city_code: "",
		branch: "",
		branch_code: "",
		district_khan_krong: "",
		district_khan_krong_code: "",
		commune_sangket: "",
		commune_sangket_code: "",
		village: "",
		village_code: "",
		phone_commune_sangket: "",
		phone_village_chief: "",
		num_family: "",
		L_Map_percentage: "",
		class: "",
		level_location: "",
		C1: "",
		C2: "",
		C3: "",
		R1: "",
		R2: "",
		R3: "",
		I1: "",
		I2: "",
		I3: "",
		A1: "",
		A2: "",
		A3: "",
	};

	const [form, setForm] = useState(initialFormState);
	const [locationOptions, setLocationOptions] = useState({
		province_city: [],
		district_khan_krong: [],
		commune_sangket: [],
		village: [],
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
		const { name, value } = e.target;
		setForm((prevForm) => ({
			...prevForm,
			[name]: value,
		}));
	};

	const handleLocationChange = async (field: string, value: string) => {
		setForm((prevForm) => ({
			...prevForm,
			[field]: value,
		}));

		// Fetch data for the next location field
		if (field === "province_city") {
			const districtData = await fetchLocationData(value);
			setLocationOptions((prevOptions) => ({
				...prevOptions,
				district_khan_krong: districtData,
			}));
		} else if (field === "district_khan_krong") {
			const communeData = await fetchLocationData(value);
			setLocationOptions((prevOptions) => ({
				...prevOptions,
				commune_sangket: communeData,
			}));
		} else if (field === "commune_sangket") {
			const villageData = await fetchLocationData(value);
			setLocationOptions((prevOptions) => ({
				...prevOptions,
				village: villageData,
			}));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form Data:", form);
	};

	useEffect(() => {
		// Initial fetch for province/city
		fetchLocationData("city").then((data) => {
			setLocationOptions((prevOptions) => ({
				...prevOptions,
				province_city: data,
			}));
		});
	}, []);

	const [showModal, setShowModal] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	// Open the modal and set the message
	const handlePreviewClick = () => {
		setMessage("A reset link has been sent to your email. Please check your inbox.");
		setShowModal(true);
	};

	// Close the modal
	const closeModal = () => {
		setShowModal(false);
	};

	const handleBack = () => {
		router.push("/land-classification-book");
	}

	return (
		<div className="w-screen h-screen bg-gray-50 flex justify-center items-center">
			<div className="bg-white shadow-md px-2 py-0 w-full h-full overflow-auto">
				<div
					className="flex-1 bg-[#f5f5f5] w-full sh m-auto p-2 my-2 pl-5"
					style={{ marginTop: "0.5em", boxShadow: "0px 0px 4px rgba(0,0,0,0.3)" }}
				>
					<span className="text-[#428BCA] font-normal text-[20px]">
						Land Classification Book
					</span>
				</div>

				<div className="bg-white border-l-2 border-r-2 border-t-2 shadow-md rounded-sm p-2 w-full overflow-auto">
					<form onSubmit={handleSubmit} className="space-y-4 py-2 pt-0">
						<div className="flex justify-between">
							<div className="flex">
								<button
									type="reset"
									onClick={handleBack}
									className="bg-gray-500 py-1 hover:bg-gray-700 text-white px-2 my-1 rounded-sm shadow-md hover:shadow-lg text-sm"
								>
									<Link href="/land-classification-book">
										<ArrowLeft />
									</Link>
								</button>
							</div>

							<div className="flex justify-end">
								<button
									type="submit"
									className="bg-[#0f81c3] text-white py-1 mx-1 px-2 my-1 rounded-sm shadow-md hover:shadow-lg hover:bg-[#101332] text-sm"
								>
									ដាក់បន្ថែម
								</button>
								<button
									type="submit"
									onClick={handlePreviewClick}
									className="bg-[#1B3351] text-white px-2 mx-1 my-1 rounded-sm shadow-md hover:shadow-lg hover:bg-[#152942] text-sm"
								>
									មើលបញ្ជាក់
								</button>
								<button
									type="reset"
									className="bg-[#FF5733] text-white py-1 px-2 my-1 rounded-sm shadow-md hover:shadow-lg hover:bg-[#E04E2E] text-sm"
								>
									លុប
								</button>
							</div>

							<ShowModal
								showModal={showModal}
								message="User Data"
								closeModal={closeModal}
								sampleData={sampleData}
								columnHeaders={columnHeaders}
							/>

						</div>

						{/* Group 1: Location Information */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{/* Left side: Location Information */}
							<div className="col-span-1">
								<fieldset className="border border-gray-300 rounded-lg pt-2 px-4 pb-4">
									<legend className="text-lg font-semibold text-[#1B3351] px-2">
										ទីតាំង
									</legend>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
										{[
											{ field: "province_city", label: "ខេត្ត/រាជធានី" },
											{ field: "district_khan_krong", label: "ស្រុក/ក្រុង/ខណ្ឌ" },
											{ field: "commune_sangket", label: "ឃុំ/សង្កាត់" },
											{ field: "village", label: "ភូមិ" },
										].map(({ field, label }) => (
											<div key={field} className="flex flex-col">
												<label htmlFor={field} className="text-sm font-medium text-[#1B3351]">
													{label.toUpperCase()}
												</label>
												<select
													id={field}
													name={field}
													value={form[field]}
													onChange={(e) => handleLocationChange(field, e.target.value)}
													className="w-full p-2 outline-none cursor-pointer sm:text-sm border shadow-sm rounded-md"
												>
													<option value="">ជ្រើសរើសតារាង</option>
													{locationOptions[field]?.map((option, index) => (
														<option key={index} value={option}>
															{option}
														</option>
													))}
												</select>
											</div>
										))}
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
										{/* Custom label names for phone fields */}
										<div className="flex flex-col">
											<label htmlFor="phone_commune_sangket" className="text-sm font-medium text-[#1B3351]">
												លេខទូរស័ព្ទមេឃុំ/សង្កាត់
											</label>
											<input
												type="text"
												id="phone_commune_sangket"
												name="phone_commune_sangket"
												value={form.phone_commune_sangket}
												onChange={handleInputChange}
												placeholder="បញ្ចូលលេខទូរស័ព្ទមេឃុំ/សង្កាត់"
												className="bg-[#FFFFFF] w-full text-sm border shadow-gray-400 text-md shadow-inner border-t-gray-50 p-2 outline-none focus:ring-1 focus:ring-[#1B3351]"
											/>
										</div>

										<div className="flex flex-col">
											<label htmlFor="phone_village_chief" className="text-sm font-medium text-[#1B3351]">
												លេខទូរស័ព្ទមេភូមិ
											</label>
											<input
												type="text"
												id="phone_village_chief"
												name="phone_village_chief"
												value={form.phone_village_chief}
												onChange={handleInputChange}
												placeholder="បញ្ចូលលេខទូរស័ព្ទមេភូមិ"
												className="bg-[#FFFFFF] w-full text-sm border shadow-gray-400 text-md shadow-inner border-t-gray-50 p-2 outline-none focus:ring-1 focus:ring-[#1B3351]"
											/>
										</div>
									</div>

								</fieldset>
							</div>

							{/* Group 2: Family Information & Classification */}
							<div className="col-span-1">
								<fieldset className="border border-gray-300 rounded-lg pt-2 px-4 pb-4">
									<legend className="text-lg font-semibold text-[#1B3351] px-2">
										ព័ត៌មានគ្រួសារ
									</legend>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
										{[
											{ field: "num_family", label: "ចំនួន គ្រួសារ", placeholder: "បញ្ចូលចំនួនគ្រួសារ" },
											{ field: "L_Map_percentage", label: "L-Map (ភាគរយ)", placeholder: "បញ្ចូល L-MAP (ភាគរយ)" },
										].map(({ field, label, placeholder }) => (
											<div key={field} className="flex flex-col">
												<label htmlFor={field} className="text-sm font-medium text-[#1B3351]">
													{label.toUpperCase()}
												</label>
												<input
													type="text"
													id={field}
													name={field}
													value={form[field]}
													onChange={handleInputChange}
													placeholder={placeholder}
													className="bg-[#FFFFFF] w-full text-sm border shadow-gray-400 text-md shadow-inner border-t-gray-50 p-2 outline-none focus:ring-1 focus:ring-[#1B3351]"
												/>
											</div>
										))}
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
										{[
											{ field: "class", label: "ចំណាត់ថ្នាក់", placeholder: "បញ្ចូលចំណាត់ថ្នាក់" },
											{ field: "level_location", label: "កម្រិតទីតាំង", placeholder: "បញ្ចូលកម្រិតទីតាំង" },
										].map(({ field, label, placeholder }) => (
											<div key={field} className="flex flex-col">
												<label htmlFor={field} className="text-sm font-medium text-[#1B3351]">
													{label.toUpperCase()}
												</label>
												<input
													type="text"
													id={field}
													name={field}
													value={form[field]}
													onChange={handleInputChange}
													placeholder={placeholder}
													className="bg-[#FFFFFF] w-full text-sm border shadow-gray-400 text-md shadow-inner border-t-gray-50 p-2 outline-none focus:ring-1 focus:ring-[#1B3351]"
												/>
											</div>
										))}
									</div>
								</fieldset>
							</div>

						</div>

						<fieldset className="border border-gray-300 rounded-lg p-6">
							<legend className="text-lg font-semibold text-[#1B3351] px-2">ប្រភេទដី</legend>
							<div className="grid grid-cols-4 gap-6">
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
										<label htmlFor={field} className="text-sm font-medium text-[#1B3351]">
											{label}
										</label>
										<textarea
											id={field}
											name={field}
											value={form[field as keyof typeof form]}
											onChange={handleInputChange}
											placeholder={placeholder}
											className="bg-[#FFFFFF] w-full text-sm border shadow-gray-400 text-md shadow-inner border-t-gray-50 p-2 outline-none focus:ring-1 focus:ring-[#1B3351]"
										/>
									</div>
								))}
							</div>
						</fieldset>
					</form>

					<div>
						<ViewPage />
						{/* <VerifyPage/> */}
					</div>
				</div>
			</div>
		</div>
	);
}


