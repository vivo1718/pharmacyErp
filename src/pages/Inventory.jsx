import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Inventory = ({ isCollapsed }) => {
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  const [expiringMedicines, setExpiringMedicines] = useState([]);
  const handleSelectMedicine = (medicine) => {
    navigate("/billing", { state: { selectedMedicine: medicine } });
  };


  useEffect(() => {
    axios.get('http://localhost:5010/api/medicines', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is included
      },
    })
    .then((res) => {
      console.log("API Response:", res.data); // Debugging
      setMedicines(res.data);
      setFilteredMedicines(res.data);
    })
    .catch((err) => console.error('Error fetching medicines:', err.response ? err.response.data : err));

    axios.get("http://localhost:5010/api/expiry-alerts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is included
      },
    })
      .then((res) => setExpiringMedicines(res.data))
      .catch((err) => console.error("Error fetching expiry alerts:", err));
  }, []);
  const navigate = useNavigate();

  const addMed = () => {
    navigate("/add-medicine");
  }
 // Handle search functionality
 useEffect(() => {
    const filtered = medicines.filter((medicine) => {
      const name = medicine.name?.toLowerCase() || "";  // Handle undefined
      const batchNumber = medicine.batchNumber?.toLowerCase() || "";  // Handle undefined
  
      return name.includes(searchQuery.toLowerCase()) || batchNumber.includes(searchQuery.toLowerCase());
    });
  
    setFilteredMedicines(filtered);
  }, [searchQuery, medicines]);
  

  return (
    <div className={`${isCollapsed ? "ml-20" : "ml-64"} p-6  min-h-screen font-sans`}>
      {/* Header with SVG Icon */}
      {expiringMedicines.length > 0 && (
        <div className="bg-amber-500 text-white p-4 rounded-lg mb-4 shadow-lg">
          <h2 className="text-lg font-bold"> Expiry Alert</h2>
          <p>Some medicines are expiring soon or have already expired.</p>
        </div>
      )}
      <div className="flex items-center  mb-6">
        <svg className="w-8 h-8 text-indigo-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2v2m8-2v2M3 10h18M5 22h14M4 6h16M10 14v6m4-6v6"></path>
        </svg>
        <h1 className="text-xl font-bold text-indigo-600 tracking-wide">Inventory Management</h1>
      </div>

      {/* Add Medicine & Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Add Medicine Button */}
        <button
          onClick={addMed}
          className="flex items-center justify-center cursor-pointer gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition transform duration-200 w-full md:w-auto"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14m-7-7h14"></path>
          </svg>
          <span className="text-sm font-medium uppercase">Add Medicine</span>
        </button>

        {/* Search Bar */}
        <div className="col-span-2 relative">
          <svg className="absolute left-4 top-3 text-gray-400 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Search by name or batch number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12  p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="flex items-center text-center justify-between space-x-6 mt-6 mb-6">
  <h1 className="font-sans font-bold mb-2">Available Medicines</h1>
  
  <div className="flex items-center space-x-2">
    <div className="bg-red-300 w-10 h-3 rounded"></div>
    <span className="text-red-600 font-medium">Expired</span>
  </div>

  <div className="flex items-center space-x-2">
    <div className="bg-yellow-100 w-10 h-3 rounded"></div>
    <span className="text-yellow-700 font-medium">Nearly Expired</span>
  </div>

  <div className="flex items-center space-x-2">
    <div className="bg-indigo-100 w-10 h-3 rounded"></div>
    <span className="text-indigo-600 font-medium">In Stock</span>
  </div>
</div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full border border-gray-200">
          {/* Table Headings */}
          <thead className="bg-indigo-600 text-white">
            <tr >
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Batch</th>
              <th className="px-6 py-3 text-left">Expiry</th>
              <th className="px-6 py-3 text-left">Stock</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-800 font-bold">
  {filteredMedicines.length > 0 ? (
    filteredMedicines.map((medicine, index) => {
      const expiryDate = medicine.expiryDate ? new Date(medicine.expiryDate) : null;
      const today = new Date();
      const threshold = new Date();
      threshold.setDate(today.getDate() + 30); // 30-day threshold for near expiry

      const isNearExpiry = expiryDate && expiryDate <= threshold && expiryDate >= today;
      const isExpired = expiryDate && expiryDate < today;

      return (
        <tr
          key={medicine.id || index}
          onClick={() => handleSelectMedicine(medicine)}
          className={`text-center text-sm cursor-pointer transition-all duration-200 ${
            isExpired
              ? "bg-red-300 text-red-600" // Expired: Light red with dark red text
              : isNearExpiry
              ? "bg-yellow-100 text-yellow-700" // Near Expiry: Light yellow with dark yellow text
              : index % 2 === 0
              ? "bg-indigo-100 hover:bg-indigo-200"
              : "bg-white hover:bg-gray-200"
          }`}
        >
          <td className="px-6 py-4 text-gray-800">{medicine.name || "N/A"}</td>
          <td className="px-6 py-4 text-gray-800">{medicine.batchNumber || "N/A"}</td>
          <td className="px-6 py-4 text-gray-800">
            {expiryDate ? expiryDate.toLocaleDateString() : "N/A"}
          </td>
          <td className="px-6 py-4 text-gray-800">{medicine.stock || 0}</td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="4" className="py-6 px-6 text-center text-gray-600">
        <svg
          className="w-6 h-6 mx-auto mb-2 text-gray-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 9v2m0 4h.01"></path>
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
        No medicines found.
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>

  );
};

export default Inventory;