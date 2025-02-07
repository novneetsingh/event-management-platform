import React, { useState } from "react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="min-h-screen bg-gray-100 overflow-auto">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === "create" && <EventForm />}
        {activeTab === "upcoming" && <EventList type="upcoming" />}
        {activeTab === "my" && <EventList type="my" />}
      </main>
    </div>
  );
};

export default Dashboard;
