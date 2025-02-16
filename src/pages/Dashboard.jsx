import React from "react";
import { Chart } from "react-google-charts";
import { useEffect,useState } from "react";
import axios from "axios";
const Dashboard=({isCollapsed})=> {
  const salesData = [
    ["Month", "Sales"],
    ["Jan", 1000],
    ["Feb", 1500],
    ["Mar", 2000],
    ["Apr", 1800],
    ["May", 2500],
  ];
  const [lowStockMedicines, setLowStockMedicines] = useState([]);
const [criticalLowStockCount, setCriticalLowStockCount] = useState(0);

useEffect(() => {
  axios.get("http://localhost:5010/api/low-stock-alerts", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  .then((res) => {
    setLowStockMedicines(res.data.lowStockMedicines);
    setCriticalLowStockCount(res.data.criticalLowStockCount);
  })
  .catch((err) => console.error("Error fetching low stock alerts:", err));
}, []);

  return (
    <div className={`${isCollapsed ? "ml-25" : "ml-64"} p-6  min-h-screen font-sans`}>
      
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
        <div className="relative p-6 rounded-lg shadow-lg overflow-hidden bg-gradient-to-r from-indigo-500 to-blue-600 text-white flex items-center gap-4 transform transition-all duration-300 hover:scale-105">
    {/* Background Blob Shapes */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#ffffff"
        fillOpacity="0.2"
        d="M441.5,280Q403,310,372,335.5Q341,361,300.5,371Q260,381,214.5,392Q169,403,126.5,384.5Q84,366,59.5,332Q35,298,26,257.5Q17,217,31,179.5Q45,142,70.5,114Q96,86,133,65.5Q170,45,212,31.5Q254,18,298,25Q342,32,379.5,58.5Q417,85,441.5,130Q466,175,456.5,221.5Q447,268,441.5,280Z"
        transform="translate(-50 -50)"
      />
      <path
        fill="#ffffff"
        fillOpacity="0.2"
        d="M392.5,320Q360,390,300,400Q240,410,190,370Q140,330,100,290Q60,250,50,190Q40,130,90,90Q140,50,200,30Q260,10,310,50Q360,90,380,140Q400,190,390,240Q380,290,392.5,320Z"
        transform="translate(30 30)"
      />
    </svg>

    {/* Foreground Content */}
    <svg
      className="w-12 h-12 text-white relative z-10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17l2-2-2-2" />
      <path d="M14 7l4 4-4 4" />
    </svg>
    <div className="font-sans relative z-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider">Total Sales</h2>
      <p className="text-2xl font-bold mt-2">₹25,000</p>
    </div>
  </div>


        {/* Low Stock Alerts */}
        <div className="relative p-6 rounded-lg shadow-lg overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white flex items-center gap-4 transform transition-all duration-300 hover:scale-105">
    {/* Background SVG Shape */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      
    <path
        fill="#ffffff"
        fillOpacity="0.3"
        d="M441.5,280Q403,310,372,335.5Q341,361,300.5,371Q260,381,214.5,392Q169,403,126.5,384.5Q84,366,59.5,332Q35,298,26,257.5Q17,217,31,179.5Q45,142,70.5,114Q96,86,133,65.5Q170,45,212,31.5Q254,18,298,25Q342,32,379.5,58.5Q417,85,441.5,130Q466,175,456.5,221.5Q447,268,441.5,280Z"
        transform="translate(-50 -50)"
      />
      <path
        fill="#ffffff"
        fillOpacity="0.3"
        d="M392.5,320Q360,390,300,400Q240,410,190,370Q140,330,100,290Q60,250,50,190Q40,130,90,90Q140,50,200,30Q260,10,310,50Q360,90,380,140Q400,190,390,240Q380,290,392.5,320Z"
        transform="translate(30 30)"
      />
    </svg>

    <svg className="w-12 h-12 text-white relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 8v4m0 4h.01"></path>
    </svg>
    <div className="font-sans relative z-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider">Low Stock Alerts</h2>
      <p className="text-2xl font-bold mt-2">{criticalLowStockCount}</p>
    </div>
  </div>
        {/* Pending Bills */}
        <div className="relative p-6 rounded-lg shadow-lg overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 text-white flex items-center gap-4 transform transition-all duration-300 hover:scale-105">
    {/* Background SVG Shape */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#ffffff"
        fillOpacity="0.2"
        d="M441.5,280Q403,310,372,335.5Q341,361,300.5,371Q260,381,214.5,392Q169,403,126.5,384.5Q84,366,59.5,332Q35,298,26,257.5Q17,217,31,179.5Q45,142,70.5,114Q96,86,133,65.5Q170,45,212,31.5Q254,18,298,25Q342,32,379.5,58.5Q417,85,441.5,130Q466,175,456.5,221.5Q447,268,441.5,280Z"
        transform="translate(-50 -50)"
      />
      <path
        fill="#ffffff"
        fillOpacity="0.2"
        d="M392.5,320Q360,390,300,400Q240,410,190,370Q140,330,100,290Q60,250,50,190Q40,130,90,90Q140,50,200,30Q260,10,310,50Q360,90,380,140Q400,190,390,240Q380,290,392.5,320Z"
        transform="translate(30 30)"
      />
    </svg>

    <svg className="w-12 h-12 text-white relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"></rect>
      <path d="M8 6h8M6 10h12M10 14h4"></path>
    </svg>
    <div className="font-sans relative z-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider">Pending Bills</h2>
      <p className="text-2xl font-bold mt-2">3</p>
    </div>
  </div>
</div>

      {/* Sales Chart Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-lg shadow-lg border border-indigo-200 transform transition-all duration-300 hover:shadow-xl">
  <h2 className="text-lg font-semibold mb-4 text-indigo-800 uppercase">Monthly Sales</h2>
  <div className="relative">
    {/* Chart */}
    <Chart
      width="100%"
      height="300px"
      chartType="LineChart"
      loader={<div>Loading Chart...</div>}
      data={salesData}
      options={{
        hAxis: { 
          title: "Month", 
          titleTextStyle: { color: "#374151" }, 
          gridlines: { color: "#E5E7EB" }, 
          textStyle: { color: "#4B5563" } 
        },
        vAxis: { 
          title: "Sales (₹)", 
          titleTextStyle: { color: "#374151" }, 
          gridlines: { color: "#E5E7EB" }, 
          textStyle: { color: "#4B5563" } 
        },
        colors: ["#6366F1"],
        backgroundColor: "transparent",
        legend: { position: "bottom", textStyle: { color: "#4B5563" } },
        chartArea: { backgroundColor: "transparent" },
        tooltip: { textStyle: { color: "#1E3A8A" } },
        // Enable shading below the line
        areaOpacity: 0.2, // Adjust opacity for the shaded area
        focusTarget: "category", // Highlight data points on hover
        lineWidth: 3, // Thicker line for better visibility
      }}
    />
  </div>
</div>

    </div>
  );
}
export default Dashboard;