import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMedicine = () => {
  const [medicine, setMedicine] = useState({
    name: "",
    batchNumber: "",
    expiryDate: "",
    stock: "",
    image: null,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine({ ...medicine, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setMedicine({ ...medicine, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    setLoading(true);

    // Prepare form data
    const formData = new FormData();
    formData.append("name", medicine.name);
    formData.append("batchNumber", medicine.batchNumber);
    formData.append("expiryDate", medicine.expiryDate);
    formData.append("stock", medicine.stock);
    formData.append("image", medicine.image);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5010/api/medicines",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Medicine added successfully:", response.data);
      navigate("/inventory"); // Redirect after success
    } catch (error) {
      console.error("Error adding medicine:", error);
      alert("Error adding medicine. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto font-sans bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-xl text-center text-indigo-600 font-bold mb-4 flex items-center justify-center">
        <svg
          className="w-6 h-6 text-indigo-500 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Add New Medicine
      </h2>
      <hr className="mb-4 bg-gray-300" />
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Medicine Name */}
        <div>
          <label className="block text-gray-700 mb-1 flex items-center">
            <svg
              className="w-5 h-5 text-indigo-500 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4.93 4.93a10 10 0 010 14.14M19.07 19.07a10 10 0 010-14.14" />
            </svg>
            Medicine Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter medicine name"
            value={medicine.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Batch Number */}
        <div>
          <label className="block text-gray-700 mb-1 flex items-center">
            <svg
              className="w-5 h-5 text-indigo-500 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M3 15h18" />
            </svg>
            Batch Number
          </label>
          <input
            type="text"
            name="batchNumber"
            placeholder="Enter batch number"
            value={medicine.batchNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-gray-700 mb-1 flex items-center">
            <svg
              className="w-5 h-5 text-indigo-500 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            Expiry Date
          </label>
          <input
            type="date"
            name="expiryDate"
            value={medicine.expiryDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Stock Quantity */}
        <div>
          <label className="block text-gray-700 mb-1 flex items-center">
            <svg
              className="w-5 h-5 text-indigo-500 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 10h18M5 22h14M4 6h16M10 14v6m4-6v6" />
            </svg>
            Stock Quantity
          </label>
          <input
            type="number"
            name="stock"
            placeholder="Enter stock quantity"
            value={medicine.stock}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 mb-1 flex items-center">
            <svg
              className="w-5 h-5 text-indigo-500 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3v18h18" />
              <path d="M16 16l-3-3-2 2-4-4" />
            </svg>
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition duration-200 ease-in-out"
          disabled={loading}
        >
          <svg
            className="w-5 h-5 text-white mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Medicine
          {loading && (
            <div className="ml-2 border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></div>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddMedicine;
