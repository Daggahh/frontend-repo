import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import {
  Button,
  Space,
  Typography,
  Radio,
  Skeleton,
  Tooltip,
  Dropdown,
  message,
} from "antd";
import {
  LeftCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  RightCircleOutlined,
  CheckOutlined,
  BulbOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";
import EditJobModal from "./JobTrackerSectOne/EditJobModal";
import { StyleProvider } from "@ant-design/cssinjs";
import JobListingDrawer, {
  AppliedExtended,
  ApplyingExtended,
  BookmarkExtended,
  DeleteJobModal,
  FullscreenLoader,
  InterviewingExtended,
  NegotiatingExtended,
} from "./JobTrackerSectOne/ExtendedSections";
import AntdTracker from "./JobTrackerSectOne/AntdTracker";
import "./JobTrackerSectOne/JobTrackerSectionOne.css";
import { Link, useOutletContext } from "react-router-dom";
import {
  updateJobDates,
  updateJobStatusInAPI,
  updateProgressInAPI,
} from "../../../../utils/api/jobService";

const AddSalaryRange = lazy(() => import("./JobTrackerSectOne/AddSalaryRange"));

const JobTrackerSectionOne = () => {
  // Extracts the current job listings, a function to update them, loading state, and an update handler from the context provided by the parent component.
  const {
    jobs,
    setJobs,
    loadingJobs,
    handleJobUpdate,
    selectedJob,
    setSelectedJob,
    archivedJobs,
    setArchivedJobs,
  } = useOutletContext();
  const selectedJobFromList = useMemo(
    () => jobs?.find((job) => job._id === selectedJob?._id),
    [jobs, selectedJob]
  ); // Memoized value to find the currently selected job from the job list based on the selected job's ID.
  const [loadingSalary, setLoadingSalary] = useState(false); // State to track whether the salary data is being loaded.
  const [localLoadingJobs, setLocalLoadingJobs] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Bookmarked");
  const [isAccepted, setIsAccepted] = useState(selectedStatus === "Accepted");
  const [activeTab, setActiveTab] = useState("job-info");
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Checked Items
  const [checkedItems, setCheckedItems] = useState({
    bookmarkedChecked: false,
    appliedChecked: false,
    setOne: [],
    setTwo: [],
    setThree: [],
  });

  // Selected Items
  const [selectedItem, setSelectedItem] = useState("Get Referral");
  const [secondSelectedItem, setSecondSelectedItem] =
    useState("Research & Prepare");
  const [thirdSelectedItem, setThirdSelectedItem] = useState(
    "Research your Targets"
  );
  const [isItemSelected, setIsItemSelected] = useState(false);

  // Constants
  const totalItems = {
    setOne: 5,
    setTwo: 4,
    setThree: 3,
  };

  const progressPercentage = {
    setOne: (checkedItems.setOne.length / totalItems.setOne) * 100,
    setTwo: (checkedItems.setTwo.length / totalItems.setTwo) * 100,
    setThree: Math.ceil(
      (checkedItems.setThree.length / totalItems.setThree) * 100
    ),
  };

  // Effect hook to initialize the selected job from localStorage or the first job in the list when the jobs data changes.
  useEffect(() => {
    if (jobs && jobs.length > 0) {
      const savedJobId = localStorage.getItem("selectedJobId");
      const savedStatus = localStorage.getItem("selectedStatus");
      if (savedJobId) {
        // If a job ID is stored in localStorage, find that job in the list
        const job = jobs.find((job) => job._id === savedJobId);
        if (job) {
          setSelectedJob(job);
          setSelectedStatus(savedStatus || job.status);
          setIsAccepted((savedStatus || job.status) === "Accepted");
        } else {
          // Fallback to the first job if no match is found
          setSelectedJob(jobs[0]);
          setSelectedStatus(jobs[0].status);
          setIsAccepted(jobs[0].status === "Accepted");
        }
      } else {
        // If no saved job ID, set the first job as selected
        setSelectedJob(jobs[0]);
        setSelectedStatus(jobs[0].status);
        setIsAccepted(jobs[0].status === "Accepted");
      }
    }
  }, [jobs]);

  useEffect(() => {
    if (selectedJob) {
      setCheckedItems(selectedJob.progress);
    }
  }, [selectedJob]);

  // Effect: Expand Section on Item Selection
  useEffect(() => {
    if (isItemSelected) {
      setIsExpanded(true);
      setIsItemSelected(false);
    }
  }, [isItemSelected]);

  // Effect: Collapse Section on Full Completion
  useEffect(() => {
    if (checkedItems.setOne.length === totalItems.setOne) {
      setIsExpanded(false);
    }
  }, [checkedItems.setOne]);

  useEffect(() => {
    if (checkedItems.setTwo.length === totalItems.setTwo) {
      setIsExpanded(false);
    }
  }, [checkedItems.setTwo]);

  useEffect(() => {
    if (checkedItems.setThree.length === totalItems.setThree) {
      setIsExpanded(false);
    }
  }, [checkedItems.setThree]);

  // // Log only when selectedJob is available
  // useEffect(() => {
  //   if (selectedJob) {
  //     console.log("Selected Job:", selectedJob);
  //     console.log("Selected Job ID for AddSalaryRange:", selectedJob._id);
  //   }
  // }, [selectedJob]); // Runs only when selectedJob changes

  // // Check if selectedJobFromList exists, if so log the found job
  // useEffect(() => {
  //   if (selectedJobFromList) {
  //     console.log("Selected Job from jobs list:", selectedJobFromList);
  //   }
  // }, [selectedJobFromList]); // Runs only when selectedJobFromList changes

  const getDomainFromUrl = (url) => {
    try {
      const { hostname } = new URL(url);
      return hostname.replace("www.", ""); // Remove 'www.' if present
    } catch (error) {
      return null; // Return null if the URL is invalid
    }
  };

  // Handlers
  const handleJobSelect = (job) => {
    if (!job || job._id === selectedJob?._id) return; // Avoid unnecessary updates

    console.log("Selected Job:", job);
    setLocalLoadingJobs(true); // Start local loading state
    setSelectedJob(null);

    localStorage.setItem("selectedJobId", job._id);
    localStorage.setItem("selectedStatus", job.status || "Bookmarked");

    // Simulate async job detail fetching
    setTimeout(() => {
      setSelectedJob(job); // Set the new selected job
      setSelectedStatus(job.status || "Bookmarked");
      setIsAccepted((job.status || "Bookmarked") === "Accepted");
      setLocalLoadingJobs(false); // End local loading state
    }, 500); // Adjust timeout duration as needed
  };

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleStatusChange = async (e) => {
    // console.log(e.target.value);
    const newStatus = e.target.value;
    setIsAccepted(newStatus === "Accepted");
    setSelectedStatus(newStatus);
    setLoading(true);

    try {
      // Update status in backend
      const updatedJob = await updateJobStatusInAPI(selectedJob._id, newStatus);

      if (updatedJob) {
        // Automatically update the "Applied" date if status is "Applied"
        let updatedDates = { ...selectedJob.dates };
        if (newStatus === "Applied" && !updatedDates.applied) {
          const appliedDate = new Date().toISOString();
          updatedDates.applied = appliedDate;

          await updateJobDates(selectedJob._id, {
            dateType: "applied",
            dateValue: appliedDate,
          });
        }
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === selectedJob._id
              ? { ...job, status: newStatus, dates: updatedDates }
              : job
          )
        );

        // If the job is archived, move it to archived jobs
        const archivedStatuses = [
          "I Withdrew",
          "Not Selected",
          "No Response 😒",
          "Archived",
        ];
        if (archivedStatuses.includes(newStatus)) {
          setArchivedJobs((prevArchived) => [...prevArchived, updatedJob]);
          setJobs((prevJobs) =>
            prevJobs.filter((job) => job._id !== selectedJob._id)
          );
        }

        setSelectedJob((prevJob) => ({
          ...prevJob,
          status: newStatus,
          dates: updatedDates,
        }));
        localStorage.setItem("selectedStatus", newStatus);
      }
    } catch (error) {
      console.error("Failed to update job status:", error);
    } finally {
      setLoading(false);
    }
  };

  // Centralized function to update checked items, Checkbox Handlers
  // const updateCheckedItems = (setKey, item, isChecked) => {
  //   setCheckedItems((prev) => ({
  //     ...prev,
  //     [setKey]: isChecked
  //       ? [...prev[setKey], item]
  //       : prev[setKey].filter((checkedItem) => checkedItem !== item),
  //   }));
  //   setIsExpanded(true);
  // };

  // const handleBoxChecked = (setKey) => (e, item) => {
  //   updateCheckedItems(setKey, item, e.target.checked);
  // };

  const handleBoxChecked = (statusKey) => async (e) => {
    const isChecked = e.target.checked;

    const updatedProgress = {
      ...checkedItems,
      [statusKey]: isChecked,
    };

    if (isChecked) {
      setIsExpanded(true);
    }

    try {
      await updateProgressInAPI(selectedJob._id, updatedProgress);
      setCheckedItems(updatedProgress);

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === selectedJob._id
            ? { ...job, progress: updatedProgress }
            : job
        )
      );
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const handleBoxCheckedMulti = (setKey) => async (e, item) => {
    const isChecked = e.target.checked;

    const updatedSet = isChecked
      ? [...checkedItems[setKey], item]
      : checkedItems[setKey].filter((checkedItem) => checkedItem !== item);
    setIsExpanded(true);

    const updatedProgress = {
      ...checkedItems,
      [setKey]: updatedSet,
    };

    try {
      await updateProgressInAPI(selectedJob._id, updatedProgress);
      setCheckedItems(updatedProgress);

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === selectedJob._id
            ? { ...job, progress: updatedProgress }
            : job
        )
      );
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const handleBoxCheckedOne = handleBoxCheckedMulti("setOne");
  const handleBoxCheckedTwo = handleBoxCheckedMulti("setTwo");
  const handleBoxCheckedThree = handleBoxCheckedMulti("setThree");

  // Item Selection Handlers
  const handleItemSelectedOne = (item, e) => {
    e.stopPropagation(); // Prevent event bubbling
    setSelectedItem(item); // Set the selected item
    setIsItemSelected(true); // Keep the section expanded when an item is selected
  };

  const handleItemSelectedTwo = (item, e) => {
    e.stopPropagation();
    setSecondSelectedItem(item);
    setIsItemSelected(true);
  };

  const handleItemSelectedThree = (item, e) => {
    e.stopPropagation();
    setThirdSelectedItem(item);
    setIsItemSelected(true);
  };

  // Utility Functions
  const getTimeDifference = (createdAt) => {
    const now = new Date();
    const savedDate = new Date(createdAt);
    const diffInMilliseconds = now - savedDate;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

    if (diffInSeconds < 60) {
      return "a few seconds ago"; // For seconds under a minute
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  // Render Extended Section
  const renderExtendedSection = () => {
    switch (selectedStatus) {
      case "Bookmarked":
        return (
          <BookmarkExtended
            isChecked={checkedItems.bookmarkedChecked}
            handleCheckboxChange={handleBoxChecked("bookmarkedChecked")}
            setIsExpanded={setIsExpanded}
          />
        );
      case "Applying":
        return (
          <ApplyingExtended
            checkedItems={checkedItems}
            setIsExpanded={setIsExpanded}
            selectedItem={selectedItem}
            handleBoxCheckedOne={handleBoxCheckedOne}
            handleItemSelectedOne={handleItemSelectedOne}
            selectedJob={selectedJob}
            handleStatusChange={handleStatusChange}
          />
        );
      case "Applied":
        return (
          <AppliedExtended
            selectedJob={selectedJob}
            isChecked={checkedItems.appliedChecked}
            handleCheckboxChange={handleBoxChecked("appliedChecked")}
          />
        );

      case "Interviewing":
        return (
          <InterviewingExtended
            checkedItems={checkedItems}
            setIsExpanded={setIsExpanded}
            secondSelectedItem={secondSelectedItem}
            handleBoxCheckedTwo={handleBoxCheckedTwo}
            handleItemSelectedTwo={handleItemSelectedTwo}
          />
        );
      case "Negotiating":
        return (
          <NegotiatingExtended
            checkedItems={checkedItems}
            setIsExpanded={setIsExpanded}
            thirdSelectedItem={thirdSelectedItem}
            handleBoxCheckedThree={handleBoxCheckedThree}
            handleItemSelectedThree={handleItemSelectedThree}
          />
        );
      // Add cases for other statuses here
      default:
        return null;
    }
  };

  // Progress Text
  const getProgressText = () => {
    switch (selectedStatus) {
      case "Bookmarked":
        return `Bookmarked Steps: ${
          checkedItems.bookmarkedChecked ? "100%" : "0%"
        } Complete`;
      case "Applying":
        return `Applying Steps: ${progressPercentage.setOne}% Complete`;
      case "Applied":
        return `Applied Steps: ${
          checkedItems.appliedChecked ? "100%" : "0%"
        } Complete`;
      case "Interviewing":
        return `Interviewing Steps: ${progressPercentage.setTwo}% Complete`;
      case "Negotiating":
        return `Negotiating Steps: ${progressPercentage.setThree}% Complete`;
      default:
        return "Other Steps";
    }
  };

  // Status Options
  const statusOptions = [
    { label: "Bookmarked", value: "Bookmarked" },
    { label: "Applying", value: "Applying" },
    { label: "Applied", value: "Applied" },
    { label: "Interviewing", value: "Interviewing" },
    { label: "Negotiating", value: "Negotiating" },
    { label: "Accepted", value: "Accepted" },
  ];

  const handleMenuClick = async (key) => {
    console.log(`Clicked on: ${key}`);
    if (key === "5") {
      setDeleteModalOpen(true);
      console.log("Job Deleted");
    }
    // Close the dropdown after selection
    setDropdownVisible(false);
  };

  const menuItems = [
    {
      key: "1",
      label: "I Withdrew",
      onClick: () => handleStatusChange({ target: { value: "I Withdrew" } }),
    },
    {
      key: "2",
      label: "Not Selected",
      onClick: () => handleStatusChange({ target: { value: "Not Selected" } }),
    },
    {
      key: "3",
      label: "No Response 😒",
      onClick: () =>
        handleStatusChange({ target: { value: "No Response 😒" } }),
    },
    {
      key: "4",
      label: "Archived",
      onClick: () => handleStatusChange({ target: { value: "Archived" } }),
    },
    { key: "divider", type: "divider" },
    {
      key: "5",
      label: <span className="delete-job-btn">Delete Job</span>,
      onClick: () => handleMenuClick("5"),
    },
  ];

  return (
    <div className="job-tracker-section drawer-visible" data-projection-id="3">
      <div className="job-tracker-table-container hide-x-overflow shared-table-container ">
        <div className="table-column-wrapper">
          <div
            data-instance="tabulator-1734223037678-7874267"
            className="job-tracker-table tabulator"
            role="grid"
            style={{ height: "100%" }}
          >
            <div className="tabulator-header" role="rowgroup">
              <div className="tabulator-header-contents" role="rowgroup">
                <div
                  className="tabulator-headers"
                  role="row"
                  style={{ height: "37px" }}
                >
                  <div
                    className="tabulator-col role-cell"
                    role="columnheader"
                    aria-sort="none"
                    data-tabulator-field="role"
                    style={{
                      justifyContent: "center",
                      minWidth: "40px",
                      height: "37px",
                      width: "280px",
                    }}
                  >
                    <div className="tabulator-col-content">
                      <div className="tabulator-col-title-holder">
                        <div className="tabulator-col-title">Jobs</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tabulator-frozen-rows-holder"
                  style={{ minWidth: "0px" }}
                ></div>
              </div>
            </div>

            <div
              className="tabulator-tableholder"
              tabIndex="0"
              style={{
                height: "calc(100% - 38px)",
                maxHeight: "calc(100% - 38px)",
              }}
            >
              <div
                className="tabulator-table"
                role="rowgroup"
                style={{ paddingTop: "0px", paddingBottom: "0px" }}
              >
                {localLoadingJobs || loadingJobs || loadingSalary ? (
                  <Skeleton active paragraph={{ rows: 4 }} />
                ) : (
                  jobs.map((job, index) => (
                    <div
                      key={index}
                      className={`tabulator-row tabulator-selectable ${
                        index % 2 === 0
                          ? "tabulator-row-odd"
                          : "tabulator-row-even"
                      }`}
                      role="row"
                    >
                      <div
                        className="tabulator-cell role-cell"
                        role="gridcell"
                        data-tabulator-field="role"
                        style={{ height: "56px", width: "280px" }}
                      >
                        <div className="formatterCell">
                          <div
                            className={`invisible-button ${
                              selectedJob?._id === job._id ? "selected" : ""
                            }`}
                            role="button"
                            tabIndex="0"
                            aria-selected={selectedJob?._id === job._id}
                            onClick={() => handleJobSelect(job)} // Select job on click
                          >
                            <div className="job-content">
                              <div className="job-role">{job.jobTitle}</div>
                              <div className="job-company">
                                {job.companyName}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="table-drawer-wrapper">
          <div className="job-listing-drawer">
            <div className="mobile-drawer-actions">
              <a href="/job-tracker">
                <Button
                  type="link"
                  icon={<LeftCircleOutlined />}
                  className="ant-btn-link"
                >
                  Back
                </Button>
              </a>

              <div className="post-actions-container">
                <Space size="large">
                  {/* Edit Button */}
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    size="large"
                    className="ant-btn-icon-only"
                  />

                  {/* Delete Button */}
                  <Button
                    type="link"
                    icon={<DeleteOutlined />}
                    size="large"
                    className="ant-btn-icon-only"
                  />
                </Space>
              </div>
            </div>

            <div
              className="drawer-container"
              data-projection-id="1"
              style={{ transform: "none", transformOrigin: "50% 50% 0px" }}
            >
              <div className="drawer-dismiss-container">
                <Link to="/dashboard/my-applications/job-trackerv2">
                  <Button
                    type="link"
                    size="large"
                    icon={<RightCircleOutlined />}
                    className="mt-2"
                  />
                </Link>
              </div>

              <div
                dir="ltr"
                data-orientation="horizontal"
                className="w-full overflow-y-auto"
              >
                <div className="drawer-content">
                  <div className="job-listing-drawer-item job-listing-fields">
                    <div className="job-listing-fields-row">
                      {localLoadingJobs || loadingJobs || loadingSalary ? (
                        <Skeleton
                          active
                          paragraph={{ rows: 4 }}
                          style={{ width: "100%" }}
                        />
                      ) : (
                        <>
                          <div className="job-listing-fields-secondary">
                            <Suspense
                              fallback={
                                <Skeleton active paragraph={{ rows: 1 }} />
                              }
                            >
                              {/* Add Salary Range Section */}
                              {selectedJob && (
                                <AddSalaryRange
                                  selectedJob={selectedJob}
                                  setSelectedJob={setSelectedJob}
                                  selectedJobId={selectedJobFromList?._id}
                                  loadingSalary={loadingSalary}
                                  setLoadingSalary={setLoadingSalary}
                                />
                              )}
                            </Suspense>
                          </div>

                          <div className="read-only-row end">
                            <Space
                              direction="vertical"
                              style={{ width: "100%" }}
                            >
                              {selectedJob ? (
                                <div
                                  className="read-row-container"
                                  style={{ display: "block" }}
                                >
                                  <Typography.Title level={2}>
                                    {selectedJob.jobTitle}
                                  </Typography.Title>
                                  <div className="job-detail-row">
                                    <Typography.Text strong>
                                      {selectedJob.companyName}
                                    </Typography.Text>
                                    <Typography.Text> — </Typography.Text>
                                    <Typography.Text>
                                      {selectedJob.location || "N/A"}
                                    </Typography.Text>
                                  </div>

                                  <div className="job-listing-link">
                                    <div className="post-saved font-medium">
                                      Saved{" "}
                                      {getTimeDifference(selectedJob.createdAt)}
                                      {selectedJob.URL && (
                                        <>
                                          {" "}
                                          on{" "}
                                          <a
                                            className="link-text !font-medium"
                                            href={selectedJob.URL}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                          >
                                            {getDomainFromUrl(
                                              selectedJob.URL
                                            ) || "Job Listing"}
                                          </a>
                                        </>
                                      )}
                                    </div>
                                  </div>

                                  <Tooltip
                                    title="Edit job post information"
                                    className="font-medium font-sans"
                                  >
                                    <div className="read-only-row-btn-container end">
                                      <Button
                                        aria-label="Edit job post information"
                                        type="link"
                                        size="large"
                                        icon={<EditOutlined />}
                                        onClick={() => setModalOpen(true)}
                                        className="edit-btn gold-text"
                                      />
                                    </div>
                                  </Tooltip>
                                </div>
                              ) : (
                                <Typography.Text strong italic>
                                  Select a job to view details
                                </Typography.Text>
                              )}
                            </Space>
                          </div>
                          <StyleProvider layer>
                            <EditJobModal
                              modalOpen={modalOpen}
                              setModalOpen={setModalOpen}
                              selectedJob={selectedJob}
                              onJobUpdate={handleJobUpdate}
                            />
                          </StyleProvider>
                        </>
                      )}
                    </div>

                    <>
                      <FullscreenLoader
                        spinning={loading}
                        text="Updating Status..."
                      />
                      {selectedJob && (
                        <Radio.Group
                          value={selectedStatus}
                          onChange={handleStatusChange}
                          buttonStyle="solid"
                          data-testid="status-progress-bar"
                          className="status-progress-bar"
                        >
                          {statusOptions.map((status) => (
                            <Radio.Button
                              key={status.value}
                              value={status.value}
                              onClick={() =>
                                status.label === "Accepted" &&
                                setIsAccepted(true)
                              }
                            >
                              {status.label}{" "}
                              {status.value !== "Bookmarked" && (
                                <CheckOutlined style={{ marginLeft: 2 }} />
                              )}
                            </Radio.Button>
                          ))}
                          <Dropdown
                            menu={{ items: menuItems }}
                            open={dropdownVisible}
                            onOpenChange={(flag) => setDropdownVisible(flag)}
                            trigger={["click"]}
                            placement="bottomRight"
                          >
                            <Button
                              id="archiveDropdown"
                              type="default"
                              size="small"
                              className="status-progress-bar-archive-dropdown border !border-[#dcdcdc] !border-l-0 !rounded-r !rounded-l-none hover:!bg-[#f3f7f8] font-sans"
                            >
                              Close Job
                            </Button>
                          </Dropdown>

                          <DeleteJobModal
                            selectedJobId={selectedJobFromList?._id}
                            setJobs={setJobs}
                            deleteModalOpen={deleteModalOpen}
                            setDeleteModalOpen={setDeleteModalOpen}
                          />
                        </Radio.Group>
                      )}
                    </>

                    {localLoadingJobs || loadingJobs || loadingSalary ? (
                      <div className="linear-loader">
                        <div className="linear-loader-bar" />
                      </div>
                    ) : (
                      <>
                        <div
                          className="_box_1rxfg_1 _guidance_1qsov_1"
                          style={{
                            "--py": "0",
                            "--px": "0",
                            "--bg": "#fff",
                            "--color": "#e5e5e5",
                            "--rad": "0",
                            "--style": "solid",
                            "--width": "0",
                          }}
                          onClick={handleToggle}
                        >
                          <div className="_stack_lds83_1">
                            <div style={{ "--stack-space": "0" }}>
                              <div
                                className="_cluster_jw67l_1 _header_1qsov_11"
                                style={{
                                  "--space": "0",
                                  "--align": "center",
                                  "--justify": "space-between",
                                  "--wrap": "wrap",
                                }}
                              >
                                {isAccepted ? (
                                  <div
                                    style={{
                                      textAlign: "center",
                                      fontSize: "1.2rem",
                                      fontFamily: "Montserrat, sans-serif",
                                    }}
                                    className="m-auto font-extrabold"
                                  >
                                    Congratulations 🎉
                                  </div>
                                ) : (
                                  <>
                                    <div
                                      className="_cluster_jw67l_1 _header-text_1qsov_16"
                                      style={{
                                        "--space": "0.375rem",
                                        "--align": "center",
                                        "--justify": "flex-start",
                                        "--wrap": "wrap",
                                      }}
                                    >
                                      <span className="text-base">
                                        <BulbOutlined />
                                      </span>
                                      <span>
                                        <strong>Guidance</strong>
                                      </span>
                                      <span>&gt;</span>
                                      <span className="font-medium">
                                        {getProgressText()}
                                      </span>
                                    </div>
                                    <button
                                      aria-label="toggle guidance"
                                      className="_btn_mkpcn_1 none _toggle-btn_1qsov_25"
                                      type="button"
                                    >
                                      <span
                                        role="img"
                                        aria-label={
                                          isExpanded
                                            ? "up-circle"
                                            : "down-circle"
                                        }
                                      >
                                        {isExpanded ? (
                                          <DownCircleOutlined />
                                        ) : (
                                          <UpCircleOutlined />
                                        )}
                                      </span>
                                    </button>
                                  </>
                                )}
                              </div>
                              {isExpanded && renderExtendedSection()}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="job-listing-drawer-item _job-listing-toolbar_q9krx_1">
                    <JobListingDrawer
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />
                  </div>

                  <AntdTracker
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    setJobs={setJobs}
                    selectedJob={selectedJob}
                    setSelectedJob={setSelectedJob}
                    handleJobUpdate={handleJobUpdate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTrackerSectionOne;
