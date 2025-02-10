import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const Reports = ({ isCollapsed }) => {
  const [expiryAlerts, setExpiryAlerts] = useState([]);

  // Fetch expiry alerts
//   useEffect(() => {
//     const fetchExpiryAlerts = async () => {
//       try {
//         const response = await axios.get("/reports/expiry-alerts");
//         setExpiryAlerts(response.data);
//       } catch (error) {
//         console.error("Error fetching expiry alerts:", error);
//       }
//     };
//     fetchExpiryAlerts();
//   }, []);

  // Sales Data
  const salesData = [
    ["Month", "Sales"],
    ["Jan", 1000],
    ["Feb", 1500],
    ["Mar", 2000],
    ["Apr", 1800],
    ["May", 2500],
  ];

  return (
    <div className={`${isCollapsed ? "ml-20" : "ml-64"} p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 min-h-screen font-sans`}>

      {/* Reports Header */}
      <div className="flex items-center mb-6">
        <svg className="w-8 h-8 text-indigo-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"></path>
        </svg>
        <h1 className="text-xl font-bold text-indigo-600  tracking-wide">Reports</h1>
      </div>

      {/* Expiry Alerts Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-6">
        <div className="flex items-center mb-4">
          <svg className="w-6 h-6 text-red-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 8v4m0 4h.01"></path>
          </svg>
          <h2 className="text-lg font-semibold uppercase text-gray-800">Expiry Alerts</h2>
        </div>
        <ul className="divide-y divide-gray-300">
          {expiryAlerts.length > 0 ? (
            expiryAlerts.map((alert) => (
              <li key={alert.id} className="py-3 flex items-center justify-between">
                <span className="font-medium text-gray-700">{alert.name}</span>
                <span className="text-sm text-red-600 font-semibold bg-red-100 px-3 py-1 rounded-lg">
                  Expires on {new Date(alert.expiryDate).toLocaleDateString()}
                </span>
              </li>
            ))
          ) : (
            <li className="py-4 text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto text-gray-300 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v4m0 4h.01"></path>
              </svg>
              No expiry alerts found.
            </li>
          )}
        </ul>
      </div>

      {/* Sales Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <div className="flex items-center mb-4">
          <svg className="w-6 h-6 text-blue-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18"></path>
            <path d="M18 17l2-2-2-2"></path>
            <path d="M14 7l4 4-4 4"></path>
          </svg>
          <h2 className="text-lg font-semibold uppercase text-gray-800">Monthly Sales</h2>
        </div>
        <Chart
          width="100%"
          height="300px"
          chartType="LineChart"
          loader={<div>Loading Chart...</div>}
          data={salesData}
          options={{
            hAxis: { title: "Month", titleTextStyle: { color: "#374151" } },
            vAxis: { title: "Sales (₹)", titleTextStyle: { color: "#374151" } },
            colors: ["#6366F1"],
            backgroundColor: "transparent",
            legend: { position: "bottom" },
          }}
        />
      </div>

    </div>
  );
};

export default Reports;
