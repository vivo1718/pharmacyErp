import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import {  UserPlusIcon, PencilIcon, CubeTransparentIcon } from "@heroicons/react/24/outline";
import axios from "axios";
// import api from "../api";

export default function Customers({isCollapsed}) {
  const [customers, setCustomers] = useState([]);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       const response = await axios.get("/customers");
//       setCustomers(response.data);
//     };
//     fetchCustomers();
//   }, []);

useEffect(() => {
    // Replace with your API call
    const dummyCustomers = [
      { id: 1, name: 'John Doe', phone: '1234567890', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', phone: '9876543210', email: 'jane@example.com' },
      // Add more dummy data as needed
    ];
    setCustomers(dummyCustomers);
  }, []);

  return (
<div className={`${isCollapsed ? "ml-20" : "ml-64"} p-6 bg-gray-100 min-h-screen`}>
{/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-indigo-500 flex items-center">
          {/* Example Indigo-themed SVG icon */}
          <svg className="w-7 h-7 text-indigo-600 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <path d="M20 8v6M23 11h-6"></path>
          </svg>
          Customer Management
        </h1>
        <Link
        //   to="/customers/add"
          className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-5 py-2 rounded-lg shadow-md flex items-center transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          <svg className="w-6 h-6 text-white mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"></path>
          </svg>
          Add Customer
        </Link>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.id} className={index % 2 === 0 ? "bg-indigo-50" : "bg-white"}>
                <td className="px-6 py-4 text-gray-800">{customer.name}</td>
                <td className="px-6 py-4 text-gray-800">{customer.phone}</td>
                <td className="px-6 py-4 text-gray-800">{customer.email}</td>
                <td className="px-6 py-4 flex space-x-3">
                  <Link to={`/customers/${customer.id}`} className="text-blue-500 hover:text-blue-700 transition">
                    {/* View Icon */}
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </Link>
                  <Link to={`/customers/edit/${customer.id}`} className="text-green-500 hover:text-green-700 transition">
                    {/* Edit Icon */}
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 0 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487z"></path>
                      <path d="M19.5 7.125L16.862 4.487"></path>
                    </svg>
                  </Link>
                  <button className="text-red-500 hover:text-red-700 transition">
                    {/* Delete Icon */}
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
}