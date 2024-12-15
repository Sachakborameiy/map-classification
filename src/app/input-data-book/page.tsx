"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ViewPage from "../table-preview/page";
import ShowModal from "../table-verify/page";
import { sampleData, columnHeaders } from "../constant/data";

// Helper function to fetch location data from Google API
const fetchLocationData = async (query: string) => {
	try {
		const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=YOUR_GOOGLE_API_KEY`);
		if (!response.ok) throw new Error("Failed to fetch location data");
		const { predictions } = await response.json();
		return predictions?.map((prediction: any) => prediction.description) || [];
	} catch (error) {
		console.error("Error fetching location data:", error);
		return [];
	}
};

export default function FormPage() {
	const router = useRouter();
	const [form, setForm] = useState(
		Object.fromEntries([
			"province_city", "district_khan_krong", "commune_sangket", "village",
			"phone_commune_sangket", "phone_village_chief", "num_family", "L_Map_percentage",
			"class", "level_location"
		].map(key => [key, ""]))
	);
	const [locationOptions, setLocationOptions] = useState({
		province_city: [], district_khan_krong: [], commune_sangket: [], village: []
	});
	const [showModal, setShowModal] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		fetchLocationData("city").then(data => setLocationOptions(prev => ({ ...prev, province_city: data })));
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setForm(prevForm => ({ ...prevForm, [name]: value }));
	};

	const handleLocationChange = async (field: string, value: string) => {
		setForm(prev => ({ ...prev, [field]: value }));
		const nextFieldMap = {
			province_city: "district_khan_krong",
			district_khan_krong: "commune_sangket",
			commune_sangket: "village"
		};
		if (nextFieldMap[field]) {
			const nextData = await fetchLocationData(value);
			setLocationOptions(prev => ({ ...prev, [nextFieldMap[field]]: nextData }));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form Data:", form);
	};

	const handlePreviewClick = () => {
		setMessage("A reset link has been sent to your email. Please check your inbox.");
		setShowModal(true);
	};

	const closeModal = () => setShowModal(false);

	const handleBack = () => router.push("/land-classification-book");

	// Mapping form fields to corresponding column headers
	const fieldTitles = {
		province_city: columnHeaders[0], // "ខេត្ត/រាជធានី"
		district_khan_krong: columnHeaders[4], // "ស្រុក/ខណ្ឌ/ក្រុង"
		commune_sangket: columnHeaders[7], // "ឃុំ/សង្កាត់"
		village: columnHeaders[9], // "ភូមិ"
		phone_commune_sangket: columnHeaders[10], // "លេខទូរស័ព្ទ ឃុំ/សង្កាត់"
		phone_village_chief: columnHeaders[11], // "លេខទូរស័ព្ទ មេភូមិ"
		num_family: columnHeaders[12], // "ចំនួន គ្រួសារ"
		L_Map_percentage: columnHeaders[13], // "L-Map (ភាគរយ)"
		class: columnHeaders[14], // "ចំណាត់ថ្នាក់"
		level_location: columnHeaders[15], // "កម្រិតទីតាំង"
	};

	return (
		<div className="w-screen h-screen bg-gray-50 flex justify-center items-center">
			<div className="bg-white shadow-md px-2 py-0 w-full h-full overflow-auto">
				<div className="bg-[#f5f5f5] w-full shadow-md p-2 my-2 pl-5" style={{ boxShadow: "0px 0px 4px rgba(0,0,0,0.3)" }}>
					<span className="text-[#428BCA] font-normal text-[20px]">Land Classification Book</span>
				</div>

				<div className="bg-white border-l-2 border-r-2 border-t-2 shadow-md rounded-sm p-2 w-full overflow-auto">
					<form onSubmit={handleSubmit} className="space-y-4 py-2 pt-0">
						<div className="flex justify-between">
							<button type="reset" onClick={handleBack} className="bg-gray-500 py-1 hover:bg-gray-700 text-white px-2 my-1 rounded-sm shadow-md text-sm">
								<ArrowLeft />
							</button>
							<div className="flex justify-end">
								<button type="submit" className="bg-[#0f81c3] text-white py-1 mx-1 px-2 my-1 rounded-sm shadow-md hover:bg-[#3578b6] text-sm">បន្ថែម</button>
								<button type="submit" onClick={handlePreviewClick} className="bg-[#1B3351] text-white px-2 mx-1 my-1 rounded-sm shadow-md hover:bg-[#152942] text-sm">មើលបញ្ជាក់</button>
								<button type="reset" className="bg-[#FF5733] text-white py-1 px-2 my-1 rounded-sm shadow-md hover:bg-[#E04E2E] text-sm">លុប</button>
							</div>
							<ShowModal showModal={showModal} message={message} closeModal={closeModal} sampleData={sampleData} columnHeaders={columnHeaders} />
						</div>

						{/* Location Information */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{/* Left side: Location Information */}
							<div>
								<fieldset className="border border-gray-300 rounded-lg pt-2 px-4 pb-4">
									<legend className="text-lg font-semibold text-[#1B3351] px-2">ទីតាំង</legend>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
										{["province_city", "district_khan_krong", "commune_sangket", "village"].map(field => (
											<div key={field} className="flex flex-col">
												<label htmlFor={field} className="text-sm font-medium text-[#1B3351]">{fieldTitles[field]}</label>
												<select id={field} name={field} value={form[field]} onChange={(e) => handleLocationChange(field, e.target.value)} className="w-full p-2 border shadow-sm rounded-md">
													<option value="">ជ្រើសរើសតារាង</option>
													{locationOptions[field]?.map((option, index) => <option key={index} value={option}>{option}</option>)}
												</select>
											</div>
										))}
									</div>

									{/* Phone Inputs */}
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
										{["phone_commune_sangket", "phone_village_chief"].map(field => (
											<div key={field} className="flex flex-col">
												<label htmlFor={field} className="text-sm font-medium text-[#1B3351]">{fieldTitles[field]}</label>
												<input type="text" id={field} name={field} value={form[field]} onChange={handleInputChange} placeholder={`បញ្ចូល${fieldTitles[field]}`} className="w-full p-2 border shadow-inner" />
											</div>
										))}
									</div>
								</fieldset>
							</div>

							{/* Family Information */}
							<div>
								<fieldset className="border border-gray-300 rounded-lg pt-2 px-4 pb-4">
									<legend className="text-lg font-semibold text-[#1B3351] px-2">ព័ត៌មានគ្រួសារ</legend>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
										{["num_family", "L_Map_percentage"].map(field => (
											<div key={field} className="flex flex-col">
												<label htmlFor={field} className="text-sm font-medium text-[#1B3351]">{fieldTitles[field]}</label>
												<input type="text" id={field} name={field} value={form[field]} onChange={handleInputChange} placeholder={`បញ្ចូល${fieldTitles[field]}`} className="w-full p-2 border shadow-inner" />
											</div>
										))}
									</div>

									{/* Classification Information */}
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
										{["class", "level_location"].map(field => (
											<div key={field} className="flex flex-col">
												<label htmlFor={field} className="text-sm font-medium text-[#1B3351]">{fieldTitles[field]}</label>
												<input type="text" id={field} name={field} value={form[field]} onChange={handleInputChange} placeholder={`បញ្ចូល${fieldTitles[field]}`} className="w-full p-2 border shadow-inner" />
											</div>
										))}
									</div>
								</fieldset>
							</div>

						</div>
						
						{/* Type Land */}
						<div>
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
						</div>
					</form>
					<ViewPage />
				</div>
			</div>
		</div>
	);
}
