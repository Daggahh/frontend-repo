import React, { useState, useEffect, lazy } from "react";
import "./styles/Mainboard.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import MyApplication from "./Pages/MyApplication";
import Contact from "./Pages/Contact";
import Account from "./Pages/Account/Account";
import Overview from "./Pages/Overview/Overview";
// import ResumeBuilder from "./Pages/ResumeBuilder";
// import SupportCenter from "./Pages/SupportCenter";
const JobTrackerSection0 = lazy(() =>
  import("./Pages/MyApplication/JobTrackerSection0")
);
const JobTrackerSectionOne = lazy(() =>
  import("./Pages/MyApplication/JobTrackerSectionOne")
);
const JobTrackerSectionTwo = lazy(() =>
  import("./Pages/MyApplication/JobTrackerSectionTwo")
);

const MainBoard = ({ isSideDashOpen }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);

  const routeToLeadingText = {
    "/dashboard/home": "Loading overview...",
    "/dashboard/resume-builder": "loading resume...",
    "/dashboard/my-applications": "Loading jobs...",
    "/dashboard/contacts": "Loading contacts...",
  };

  useEffect(() => {
    // to determine the loader based off the route
    const currentRoute = location.pathname.split("/")[2] || "";
    const text =
      routeToLeadingText[`/dashboard/${currentRoute}`] || "Loading...";

    setLoadingText(text);
    setIsLoading(true);

    //simulate a loading timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    //clean up the timeout on route change
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/dashboard/my-applications") {
      document.body.classList.add("tracker");
      document.body.classList.add("default-layout");
    } else {
      document.body.classList.remove("tracker");
      document.body.classList.remove("default-layout");
    }
  }, [location.pathname]);
  return (
    <section
      className={`mainboard-section default-content ${
        !isSideDashOpen ? "expanded-mainboard" : ""
      }`}
    >
      <main id="default-layout-view-container">
        <div className="relative h-screen w-full">
          {isLoading && (
            <div
              className="
                absolute top-0 left-0 h-full w-full bg-white/50 z-[1000]
                flex gap-2 items-center justify-center
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-loader-circle animate-spin w-5 h-5 text-grey-600"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
              </svg>
              <span className="text-grey-600">{loadingText}</span>
            </div>
          )}
          {!isLoading && (
            <Routes>
              <Route
                index
                path="home"
                element={
                  <Overview
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    jobs={jobs}
                    setJobs={setJobs}
                  />
                }
              />
              {/* <Route path="resume-builder" element={<ResumeBuilder />} /> */}
              <Route
                path="my-applications/*"
                element={
                  <MyApplication
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    jobs={jobs}
                    setJobs={setJobs}
                  />
                }
              >
                <Route
                  index
                  element={
                    jobs.length > 0 ? (
                      <Navigate to="job-trackerv1" replace />
                    ) : (
                      <JobTrackerSection0 />
                    )
                  }
                />
                <Route
                  path="job-trackerv1"
                  element={<JobTrackerSectionOne />}
                />
                <Route
                  path="job-trackerv2"
                  element={<JobTrackerSectionTwo />}
                />
              </Route>
              <Route path="contacts" element={<Contact />} />
              {/* <Route path="supportcenter" element={<SupportCenter />} /> */}
              <Route path="account" element={<Account />} />
            </Routes>
          )}
        </div>
      </main>
    </section>
  );
};

export default MainBoard;
