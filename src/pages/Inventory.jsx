import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Inventory = ({ isCollapsed }) => {
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  const handleSelectMedicine = (medicine) => {
    navigate("/billing", { state: { selectedMedicine: medicine } });
  };

  useEffect(() => {
    axios.get('http://localhost:5010/api/medicines')
      .then((res) => {
        setMedicines(res.data);
        setFilteredMedicines(res.data); // Initialize filtered medicines with all medicines
      })
      .catch((err) => console.error('Error fetching medicines:', err));
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
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition transform duration-200 w-full md:w-auto"
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
            className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg mt-6 border border-gray-200">
        <table className="min-w-full border border-gray-200">
          {/* Table Headings */}
          <thead>
            <tr className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-center text-sm ">
              <th className="py-3 px-6 border-b">Name</th>
              <th className="py-3 px-6 border-b">Batch</th>
              <th className="py-3 px-6 border-b">Expiry</th>
              <th className="py-3 px-6 border-b">Stock</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-800 font-bold">
            {filteredMedicines.length > 0 ? (
              filteredMedicines.map((medicine, index) => (
                <tr
                  key={medicine.id || index}
                  onClick={() => handleSelectMedicine(medicine)}
                  className={`text-center text-sm cursor-pointer transition-all duration-200 ${
                    index % 2 === 0 ? "bg-indigo-100 hover:bg-indigo-200" : "bg-white hover:bg-gray-200"
                  }`}
                >
                  <td className="py-3 px-6 border-b">{medicine.name || "N/A"}</td>
                  <td className="py-3 px-6 border-b">{medicine.batchNumber || "N/A"}</td>
                  <td className="py-3 px-6 border-b">
                    {medicine.expiryDate ? new Date(medicine.expiryDate).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="py-3 px-6 border-b">{medicine.stock || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-6 px-6 text-center text-gray-600">
                  <svg className="w-6 h-6 mx-auto mb-2 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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