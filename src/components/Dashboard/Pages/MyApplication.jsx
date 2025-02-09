import React, { useEffect, useState } from "react";
import "../styles/MyApplications.css";
// import JobTrackerSectionTwo from "./MyApplication/JobTrackerSectionTwo";
import { StyleProvider } from "@ant-design/cssinjs";
import AntJobModal from "./MyApplication/ActionButtons/AntJobModal";
import { Outlet } from "react-router-dom";
import { message } from "antd";
import {
  fetchArchivedJobsFromAPI,
  fetchJobsFromAPI,
  updateJobInAPI,
} from "../../../utils/api/jobService";

const MyApplication = ({ modalOpen, setModalOpen, jobs, setJobs }) => {
  const [selectedJob, setSelectedJob] = useState(null); // State to track the currently selected job.
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [archivedJobs, setArchivedJobs] = useState([]); // State for archived jobs

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoadingJobs(true);
        const fetchedJobs = await fetchJobsFromAPI();

        // Filter out archived jobs
        // Separate active and archived jobs
        const archivedStatuses = [
          "I Withdrew",
          "Not Selected",
          "No Response 😒",
          "Archived",
        ];
        const activeJobs = fetchedJobs.filter(
          (job) => !archivedStatuses.includes(job.status)
        );
        const archivedJobs = fetchedJobs.filter((job) =>
          archivedStatuses.includes(job.status)
        );

        setJobs(activeJobs);
        setArchivedJobs(archivedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        message.error("Unable to fetch jobs. Please try again later.");
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobUpdate = async (updatedJob) => {
    try {
      // Call API to update the job in the database
      const updatedJobresponse = await updateJobInAPI(
        updatedJob._id,
        updatedJob
      );

      // Update the jobs state and filter out archived jobs
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === updatedJobresponse._id
            ? { ...job, ...updatedJobresponse }
            : job
        )
      );

      // If the job is archived, remove it from active jobs and add to archived jobs
      const archivedStatuses = [
        "I Withdrew",
        "Not Selected",
        "No Response 😒",
        "Archived",
      ];
      if (archivedStatuses.includes(updatedJobresponse.status)) {
        setJobs((prevJobs) =>
          prevJobs.filter((job) => job._id !== updatedJobresponse._id)
        );
        setArchivedJobs((prevArchivedJobs) => [
          ...prevArchivedJobs,
          updatedJobresponse,
        ]);
      }

      message.success("Job updated successfully!");
    } catch (error) {
      console.error("Error updating job:", error);
      message.error("Failed to update job. Please try again.");
    }
  };

  return (
    <>
      <main className="mainboard-content">
        <div className="job-tracker-container relative">
          <div className="job-tracker-content-wrapper">
            {/* <JobTrackerSectionTwo /> */}
            <Outlet
              context={{
                setModalOpen,
                jobs,
                setJobs,
                loadingJobs,
                setLoadingJobs,
                handleJobUpdate,
                selectedJob,
                setSelectedJob,
                archivedJobs,
                setArchivedJobs,
              }}
            />
          </div>
        </div>
      </main>

      {/* AntJobModal: pass handleNewJob function to modal for adding a new job */}
      <StyleProvider layer>
        <AntJobModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setJobs={setJobs}
        />
      </StyleProvider>
    </>
  );
};

export default MyApplication;
