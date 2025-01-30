import React, { useState, useEffect } from "react";
import MainBoard from "./MainBoard";
import SideDash from "./SideDash";
// import { Outlet } from "react-router-dom";
// import { startActivityTracker, stopActivityTracker } from "./ActivityTracker";
import "./styles/Dashboard.css";

const Dashboard = () => {
  const [isSideDashOpen, setIsSideDashOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSideDashOpen((prev) => !prev);
  };

  // useEffect(() => {
  //   startActivityTracker();
  //   return () => stopActivityTracker(); // Clean up on unmount
  // }, []);

  return (
    <div className="dashboard container-none">
      <SideDash isOpen={isSideDashOpen} toggleSidebar={toggleSidebar} />
      <MainBoard isSideDashOpen={isSideDashOpen} />
      {/* <Outlet /> */}
    </div>
  );
};

export default Dashboard;
