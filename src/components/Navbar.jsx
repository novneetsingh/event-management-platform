import React from "react";
import { Menu, LogOut, Calendar, Users } from "lucide-react";
import { handleLogout } from "../utils/handleLogout";

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around h-10">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Event Management Platform
            </h1>
          </div>

          <div className="flex justify-center mr-40">
            <button
              onClick={() => setActiveTab("create")}
              className={`${
                activeTab === "create"
                  ? "bg-indigo-500 text-white"
                  : "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              } inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium mx-4`}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Create Event
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`${
                activeTab === "upcoming"
                  ? "bg-indigo-500 text-white"
                  : "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              } inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium mx-4`}
            >
              <Users className="mr-2 h-5 w-5" />
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab("my")}
              className={`${
                activeTab === "my"
                  ? "bg-indigo-500 text-white"
                  : "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              } inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium mx-4`}
            >
              <Menu className="mr-2 h-5 w-5" />
              My Events
            </button>
          </div>

          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium bg-red-500 hover:bg-red-700 text-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
