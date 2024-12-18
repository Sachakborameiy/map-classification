"use client";
import { useState, useEffect } from "react";
import Table from "../map-test/page";

const DataInput = () => {
  const [inputs, setInputs] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
  });

  const [data, setData] = useState<any[]>([]); // State for holding the list of data
  const [errors, setErrors] = useState<any>({}); // State for validation errors

  useEffect(() => {
    // Load existing data from localStorage on page load
    const storedData = JSON.parse(localStorage.getItem("dataList") || "[]");
    setData(storedData);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors: any = {};

    // Validation Rules
    if (!inputs.field1) formErrors.field1 = "Field 1 is required";
    if (!inputs.field2) formErrors.field2 = "Field 2 is required";
    if (!inputs.field3) formErrors.field3 = "Field 3 is required";
    if (!inputs.field4) formErrors.field4 = "Field 4 is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from reloading the page

    // Validate the form before submitting
    if (!validateForm()) return; // Stop submission if form is invalid

    // Add the new input data to the list and store it in localStorage
    const updatedData = [...data, inputs];
    setData(updatedData); // Update the state with the new data

    // Store updated data in localStorage
    localStorage.setItem("dataList", JSON.stringify(updatedData));

    // Reset inputs and errors after adding
    setInputs({ field1: "", field2: "", field3: "", field4: "" });
    setErrors({});
  };

  const handleDelete = (index: number) => {
    // Create a new array without the item at the specified index
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);

    // Update localStorage
    localStorage.setItem("dataList", JSON.stringify(updatedData));
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Input</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="field1"
            value={inputs.field1}
            onChange={handleInputChange}
            placeholder="Field 1"
            className="w-full p-2 border rounded-md"
          />
          {errors.field1 && (
            <p className="text-red-500 text-sm">{errors.field1}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="field2"
            value={inputs.field2}
            onChange={handleInputChange}
            placeholder="Field 2"
            className="w-full p-2 border rounded-md"
          />
          {errors.field2 && (
            <p className="text-red-500 text-sm">{errors.field2}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="field3"
            value={inputs.field3}
            onChange={handleInputChange}
            placeholder="Field 3"
            className="w-full p-2 border rounded-md"
          />
          {errors.field3 && (
            <p className="text-red-500 text-sm">{errors.field3}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="field4"
            value={inputs.field4}
            onChange={handleInputChange}
            placeholder="Field 4"
            className="w-full p-2 border rounded-md"
          />
          {errors.field4 && (
            <p className="text-red-500 text-sm">{errors.field4}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      {/* Render the table with the updated data */}
      <div className="mt-8">
        <Table data={data} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default DataInput;


