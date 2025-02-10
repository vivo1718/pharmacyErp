import React from "react";
import { Chart } from "react-google-charts";

const Dashboard=({isCollapsed})=> {
  const salesData = [
    ["Month", "Sales"],
    ["Jan", 1000],
    ["Feb", 1500],
    ["Mar", 2000],
    ["Apr", 1800],
    ["May", 2500],
  ];

  return (
    <div className={`${isCollapsed ? "ml-20" : "ml-64"} p-6  min-h-screen font-sans`}>
      
      {/* Dashboard Header */}
      <div className="flex items-center  mb-6">
        <svg className="w-8 h-8 text-indigo-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path>
        </svg>
        <h1 className="text-xl font-bold text-indigo-600  tracking-wide">Dashboard</h1>
      </div>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* Total Sales */}
        <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center gap-4">
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18"></path>
            <path d="M18 17l2-2-2-2"></path>
            <path d="M14 7l4 4-4 4"></path>
          </svg>
          <div>
            <h2 className="text-lg font-semibold uppercase">Total Sales</h2>
            <p className="text-3xl font-bold">₹25,000</p>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-red-500 to-red-600 text-white flex items-center gap-4">
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 8v4m0 4h.01"></path>
          </svg>
          <div>
            <h2 className="text-lg font-semibold uppercase">Low Stock Alerts</h2>
            <p className="text-3xl font-bold">5</p>
          </div>
        </div>

        {/* Pending Bills */}
        <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-white flex items-center gap-4">
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
            <path d="M8 6h8M6 10h12M10 14h4"></path>
          </svg>
          <div>
            <h2 className="text-lg font-semibold uppercase">Pending Bills</h2>
            <p className="text-3xl font-bold">3</p>
          </div>
        </div>

      </div>

      {/* Sales Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 uppercase">Monthly Sales</h2>
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
}
export default Dashboard;