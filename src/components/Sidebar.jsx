import { Link, useLocation } from "react-router-dom";
const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);
  
  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 h-screen border-r border-gray-700 fixed transition-all duration-300 ease-in-out flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between ">
      <div className="flex justify-center text-center  "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6 text-center justify-center text-indigo-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
</svg>
<h1 className={`text-xl font-bold text-indigo-500 ml-0.5  tracking-wide transition-all ${isCollapsed ? "hidden" : "block mr-0.5"}`}>
          PharmaERP
        </h1>
</div>
        
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="text-indigo-600 font-bold hover:text-indigo-400 hover:bg-gray-700 rounded-lg p-2 transition duration-200"
        >
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2 mt-4   flex-1 align-middle ">
        {[
          { to: "/dashboard", icon: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25", label: "Dashboard" },
          { to: "/inventory", icon: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z", label: "Inventory" },
          { to: "/billing", icon: "M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z", label: "Billing" },
          { to: "/customers", icon: "M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z", label: "Customers" },
          { to: "/reports", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z", label: "Reports" },
        ].map((item, index) => (
            <Link
            key={index}
            title={item.label}
            to={item.to}
            className={`flex   gap-3 p-3 text-gray-300 hover:bg-gray-700 hover:text-indigo-400 rounded-r-3xl transition duration-200 w-full justify-items-center  pl-[25%] pr-[25%] ${isActive(item.to) ? "bg-gray-700 text-indigo-400 border-l-4 border-indigo-600" : ""}`}
            >
            <div className="w-6 flex justify-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-green-100"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
            </div>
            <span className={`${isCollapsed ? "hidden" : "block"} text-sm text-green-100 font-medium`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};
export default Sidebar;
