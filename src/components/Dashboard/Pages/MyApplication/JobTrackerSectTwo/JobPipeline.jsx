import React from "react";
import "./JobPipeline.css";
import { useOutletContext } from "react-router-dom";

const JobPipeline = () => {
  const { jobs, setSelectedJob } = useOutletContext();

  const pipelineSections = [
    "Bookmarked",
    "Applying",
    "Applied",
    "Interviewing",
    "Negotiating",
    "Accepted",
  ];

  const getJobCount = (status) =>
    jobs.filter((job) => job.status === status).length;

  const handleFilterJobs = (status) => {
    setSelectedJob(jobs.filter((job) => job.status === status));
  };

  return (
    <div
      className="job-tracker-section pipeline-section"
      style={{ opacity: 1, transform: "none" }}
    >
      <div className="job-pipeline-container">
        <div className="active-jobs-container">
          {pipelineSections.map((status, index) => {
            const count = getJobCount(status);
            return (
              <div
                key={index}
                className={`job-pipeline-section-wrapper reset-all-button-styles ${
                  count > 0 ? "contains-listings active-filter" : ""
                }`}
              >
                <div className="section-wrapper-inner">
                  <button
                    className="job-pipeline-section"
                    onClick={() => handleFilterJobs(status)}
                    disabled={count === 0}
                  >
                    <div className="section-value h4">
                      {count > 0 ? count : "--"}
                    </div>
                    <div className="section-label">{status}</div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JobPipeline;
