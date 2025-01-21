import React, { useState, useEffect, useRef } from "react";
import "./Overview.css";
import { StyleProvider } from "@ant-design/cssinjs";
import AntJobModal from "../MyApplication/ActionButtons/AntJobModal";
import { FaPlus, FaPlusCircle } from "react-icons/fa";
import { Badge, DatePicker, Divider, Modal, notification, Spin } from "antd";
import { MailOutline, RadarOutlined, StarOutline } from "@mui/icons-material";
import JobjottModal from "./jobjottModal.jsx";
import GoalsModal from "./goalsModal.jsx";
import WeekGoalModal from "./weekGoalModal.jsx";
import {
  BellFilled,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { getGoals } from "../../../../utils/api/goalService.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";

import { Tooltip as AntdTooltip } from "antd";
import { Tooltip as ChartTooltip } from "recharts";
import { fetchJobsFromAPI } from "../../../../utils/api/jobService.js";
import InterviewModal from "./interviewModal.jsx";

const Overview = ({
  modalOpen,
  setModalOpen,
  jobs,
  setJobs,
  fallbackSymbol = "¤",
}) => {
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [goal, setGoal] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const selectedGoal = goal?._id;
  const widthValue = "100%";
  const gutterValue = "0";
  const [progress, setProgress] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [weekGoal, setWeekGoal] = useState(5);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [inputGoal, setInputGoal] = useState(weekGoal);

  const [data, setData] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loadingData, setLoadingData] = useState(false);
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(1, "month"),
    dayjs(),
  ]);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Colors for pie chart

  const [modalNotifOpen, setModalNotifOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData)); // Parse and set user data
    }
  }, []);

  // Fetch goals on component mount
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const fetchedGoals = await getGoals();
        if (fetchedGoals) {
          setGoal(fetchedGoals); // Assuming only one goal is returned
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
  }, []);

  // Function to handle the opening of the modal
  const handleEditGoal = () => {
    setGoalModalOpen(true);
  };

  const extractCurrencySymbol = (currencyName) => {
    const matchedCurrency = currencies.find(
      (currency) => currency.name === currencyName
    );
    return matchedCurrency ? matchedCurrency.symbol : fallbackSymbol; // Fallback symbol
  };

  const renderGoalText = (goal) => {
    if (
      goal?.targetGoal === "Land a new job in the same career path" ||
      goal?.targetGoal === "Land a new job in a new career path"
    ) {
      return "Next Career Goal: Land a new job";
    } else if (goal?.targetGoal === "Explore new career paths") {
      return "Next Career Goal: Explore opportunities";
    }
    return "Next Career Goal: Land a new job";
  };

  useEffect(() => {
    // Fetch the number of job applications moved to "Applied" stage in the last week
    const fetchWeeklyProgress = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://backend-repo-1-x2b1.onrender.com"
        );
        const { applicationsMovedToApplied, totalApplications } = response.data;

        setProgress(applicationsMovedToApplied);
        setTotalApplications(totalApplications);
      } catch (error) {
        console.error("Error fetching weekly progress", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyProgress();
  }, []);

  const handleEdit = () => {
    setInputGoal(weekGoal);
    setIsVisible(true);
  };

  const handleSave = () => {
    setWeekGoal(inputGoal);
    setIsVisible(false);
  };

  // Calculate percentage progress
  const progressPercentage = Math.min((progress / weekGoal) * 100, 100);
  const circleShade = `rgba(121, 61, 136, ${
    0.4 + 0.6 * Math.min(progress / weekGoal, 1)
  })`;

  const remaining = Math.max(weekGoal - progress, 0);

  let message;
  if (progress === 0) {
    message = (
      <p className="mb-0 text-[12px] font-medium">
        <span
          data-br=":r0:"
          data-brr="1"
          style={{
            textDecoration: "inherit",
            textWrap: "balance",
          }}
          className="inline-block align-top max-w-[286px]"
        >
          Make sure to move jobs to "Applied" in your{" "}
          <Link
            to="/dashboard/my-applications/job-trackerv2"
            className="font-semibold text-[#111313] underline hover:no-underline"
          >
            Job Tracker
          </Link>{" "}
          to see your weekly goal progress ✅
        </span>
      </p>
    );
  } else if (remaining > 0) {
    message = (
      <p>
        {remaining} application{remaining > 1 ? "s" : ""} remaining to meet your
        weekly goal! 🚀
        <br />
        <Link
          to="/dashboard/my-applications/job-trackerv2"
          className="font-semibold text-[#111313] underline hover:no-underline"
        >
          Apply Now
        </Link>
      </p>
    );
  } else {
    message = <p>You achieved your weekly goal! 🎉</p>;
  }

  const formatDate = (date) => {
    const today = new Date().toDateString();
    const jobDate = new Date(date).toDateString();

    if (jobDate === today) {
      return "TODAY";
    }
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = await fetchJobsFromAPI();
        setJobs(fetchedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        message.error("Unable to fetch jobs. Please try again later.");
      } finally {
      }
    };

    fetchJobs();
  }, []);

  // Group jobs by date
  const groupedJobs = jobs.reduce((acc, job) => {
    const date = formatDate(job.createdAt);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(job);
    return acc;
  }, {});

  useEffect(() => {
    fetchPipelineData(dateRange[0], dateRange[1]);
  }, [dateRange]);

  const fetchPipelineData = async (startDate, endDate) => {
    setLoadingData(true);
    try {
      const response = await axios.get(
        "https://backend-repo-1-x2b1.onrender.com",
        {
          params: {
            startDate: startDate.format("YYYY-MM-DD"),
            endDate: endDate.format("YYYY-MM-DD"),
          },
        }
      );

      const { pipelineData, totalJobs } = response.data;

      if (pipelineData.length === 0) {
        message.info("No jobs found for the selected date range.");
      }

      setData(
        pipelineData.map((item) => ({
          name: item._id, // Status
          value: item.count,
          percentage: ((item.count / totalJobs) * 100).toFixed(1), // Percentage
        }))
      );
      setTotalJobs(totalJobs);
    } catch (error) {
      console.error("Error fetching pipeline data:", error);
      message.error("Failed to load data.");
    } finally {
      setLoadingData(false);
    }
  };

  const onDateChange = (dates) => {
    if (dates && dates[0] && dates[1]) {
      setDateRange(dates);
    } else {
      message.warning("Please select a valid date range.");
    }
  };

  const handleViewSchedule = (job) => {
    setSelectedJob(job);
    setModalNotifOpen(true);
  };

  const isValidDate = (date) => {
    return !isNaN(new Date(date).getTime());
  };

  const sortJobsByDate = (jobs) => {
    return jobs
      .filter((job) => isValidDate(job.interview?.interviewDate))
      .sort(
        (a, b) =>
          new Date(a.interview.interviewDate) -
          new Date(b.interview.interviewDate)
      );
  };

  const getBorderColor = (interviewDate) => {
    const now = new Date();
    const date = new Date(interviewDate);
    const diff = (date - now) / (1000 * 60 * 60 * 24); // Difference in days

    if (diff <= 3) return "border-red-500";
    if (diff <= 7) return "border-yellow-500";
    return "border-green-500";
  };

  // const sortedJobs = sortJobsByDate(jobs);

  // Hook for tracking missed interviews
  // const useMissedInterviews = (jobs) => {
  const [missedInterviews, setMissedInterviews] = useState([]);
  const [shownNotifications, setShownNotifications] = useState(new Set());
  const [showMissedDetails, setShowMissedDetails] = useState(false);
  const notificationRef = useRef(null);

  // Hook to detect click outside the notification dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowMissedDetails(false); // Close dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Track missed interviews
  useEffect(() => {
    const now = new Date();
    const missed = jobs.filter(
      (job) =>
        job.interview?.interviewDate &&
        new Date(job.interview.interviewDate) < now &&
        !shownNotifications.has(job._id) // Ensure notification is shown only once
    );

    setMissedInterviews((prev) => [...prev, ...missed]);
    missed.forEach((job) => {
      setShownNotifications((prev) => new Set(prev).add(job._id));
      notification.warning({
        message: "Missed Interview",
        description: `You missed an interview with ${job.companyName} for the position ${job.jobTitle}.`,
        duration: 5,
      });
    });
  }, [jobs, shownNotifications]);

  const sortedJobs = sortJobsByDate(jobs);
  // const missedInterviews = useMissedInterviews(jobs);

  return (
    <>
      <div className="p-2 bg-white w-full border-b border-solid border-[#ece4db] flex justify-between items-center px-5">
        <div>
          {/* <h4>`Welcome home, ${user.firstName}!`</h4> */}
          <h4 className="text-[16px]">
            {" "}
            Welcome home,{" "}
            <span className="font-semibold">
              {user ? user.firstName : "Guest"}!
            </span>{" "}
          </h4>
        </div>
        <div>
          <ul className="flex gap-4 items-center">
            <li
              className="p-2 rounded-md border border-1-[#111313] relative cursor-pointer"
              onClick={() => setShowMissedDetails(!showMissedDetails)}
            >
              <Badge
                size="small"
                count={missedInterviews.length}
                offset={[0, 0]}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="leading-8 text-exl cursor-pointer"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M440.08 341.31c-1.66-2-3.29-4-4.89-5.93-22-26.61-35.31-42.67-35.31-118 0-39-9.33-71-27.72-95-13.56-17.73-31.89-31.18-56.05-41.12a3 3 0 0 1-.82-.67C306.6 51.49 282.82 32 256 32s-50.59 19.49-59.28 48.56a3.13 3.13 0 0 1-.81.65c-56.38 23.21-83.78 67.74-83.78 136.14 0 75.36-13.29 91.42-35.31 118-1.6 1.93-3.23 3.89-4.89 5.93a35.16 35.16 0 0 0-4.65 37.62c6.17 13 19.32 21.07 34.33 21.07H410.5c14.94 0 28-8.06 34.19-21a35.17 35.17 0 0 0-4.61-37.66zM256 480a80.06 80.06 0 0 0 70.44-42.13 4 4 0 0 0-3.54-5.87H189.12a4 4 0 0 0-3.55 5.87A80.06 80.06 0 0 0 256 480z"></path>
                </svg>{" "}
              </Badge>

              {/* Notification Dropdown */}
              {showMissedDetails && (
                <div
                  ref={notificationRef}
                  className="absolute top-12 right-4 bg-white shadow-lg p-4 rounded-lg border w-64 z-1001"
                >
                  <h3 className="font-semibold mb-2">Missed Interviews</h3>
                  {missedInterviews.length > 0 ? (
                    <ul className="space-y-2">
                      {missedInterviews.map((job) => (
                        <li key={job._id} className="text-sm text-gray-700">
                          <p>
                            <strong>{job.jobTitle}</strong> at {job.companyName}
                          </p>
                          <p>
                            <small>
                              Missed on:{" "}
                              {new Date(
                                job.interview.interviewDate
                              ).toLocaleString()}
                            </small>
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No missed interviews.
                    </p>
                  )}
                </div>
              )}
            </li>
            <span>
              <Divider variant="solid" type="vertical" className="!m-0 !h-8" />
            </span>
            <li>
              <button
                type="button"
                className="bg-transparent border border-1-solid border-[#ece4db] rounded-full px-6 py-3 text-[12px] font-semibold"
                onClick={() => setModalOpen(true)}
              >
                <span className="flex gap-1 items-center justify-center">
                  {" "}
                  Add New Application
                  <FaPlusCircle />
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <main className="ml-4 mr-4 mt-4 mb-4 ">
        <div
          className="career-dashboard _center_1szvl_1 home-container !mt-0 !p-0"
          style={{ "--width": widthValue, "--gutter": gutterValue }}
        >
          <div
            className="flex -ml-2 -mr-2 gap-y-4 min-w-0"
            style={{ flexFlow: "row wrap" }}
          >
            <div className="ant-col ant-col-xs-24 ant-col-xl-16 pl-2 pr-2">
              <div className="ant-space ant-space-vertical gap-4 flex-col">
                {/* visualization chart div */}
                <div className="ant-space-item">
                  <div className="border bg-card text-card-foreground shadow-sm rounded-tl-xl rounded-br-xl">
                    <div className="flex flex-col space-y-1.5 p-6">
                      <h3 className="text-2xl font-semibold leading-none tracking-tight">
                        <div className="flex flex-col gap-2 items-start md:flex-row md:items-center md:gap-4">
                          <span className="text-[24px]">
                            {goal
                              ? renderGoalText(goal)
                              : "Next Career Goal: Land a new job"}
                          </span>

                          <button
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 transition-all duration-75 underline-offset-4 h-10 py-2 rounded-md text-[#99BFBF] text-[14px] leading-5 font-normal hover:no-underline px-0"
                            onClick={handleEditGoal}
                          >
                            <EditOutlined />
                            <span className="ml-2">
                              {selectedGoal ? "Edit Goal" : "Add Goal"}
                            </span>
                          </button>
                        </div>
                      </h3>
                    </div>
                    <div className="p-6 pt-0">
                      <div className="flex flex-col gap-4 md:flex-row md:gap-2">
                        <div className="grow-0 shrink-0 basis-1/3">
                          <div className="leading-4">
                            <div className="leading-5 text-base mb-0.5 text-grey-800">
                              Target Title
                            </div>
                            <div className="leading-5 text-base font-semibold text-black">
                              {goal?.targetTitle || "Not set"}
                            </div>
                          </div>
                        </div>
                        <div className="grow-0 shrink-0 basis-1/3">
                          <div className="leading-4">
                            <div className="leading-5 text-base mb-0.5 text-grey-800">
                              Target Date
                            </div>
                            <div className="leading-5 text-base font-semibold text-black">
                              {goal?.targetDate
                                ? new Date(goal.targetDate).toLocaleDateString()
                                : "Not set"}
                            </div>
                          </div>
                        </div>
                        <div className="grow-0 shrink-0 basis-1/3">
                          <div className="leading-4">
                            <div className="leading-5 text-base mb-0.5 text-grey-800">
                              Target Salary Range
                            </div>
                            <div className="leading-5 text-base font-semibold text-black">
                              {goal?.salaryMin && goal?.salaryMax
                                ? `${extractCurrencySymbol(goal?.currency)} ${
                                    goal.salaryMin
                                  } to ${extractCurrencySymbol(
                                    goal?.currency
                                  )} ${goal.salaryMax}`
                                : "₦0.00 to ₦0.00"}

                              {/* {goal?.salaryMin && goal?.salaryMax
                                ? `${goal.salaryMin} to ${goal.salaryMax}`
                                : "₦0.00 to ₦0.00"} */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ant-space-item">
                  <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                    {/* <!-- Left Section: Weekly Applications --> */}
                    <div className="w-full lg:w-1/2 p-6 bg-white shadow rounded-tl-none rounded-tr-xl rounded-br-xl ">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold h3 mb-1">
                          Job Applications
                          <AntdTooltip
                            title="Set a goal and track your weekly job application progress. We recommend starting with at least 5 applications a week."
                            className="font-medium font-sans"
                          >
                            <InfoCircleOutlined className="mb-[2px] p-1 text-[#111313] text-[18px] align-middle cursor-help" />
                          </AntdTooltip>
                        </h2>
                        <button
                          type="button"
                          className="text-[#99BFBF] hover:text-[#99BFBF]"
                          onClick={handleEdit}
                        >
                          <EditOutlined className="text-[19px]" />
                        </button>
                      </div>
                      <div className="flex flex-col flex-grow items-center text-center gap-[26px]">
                        <AntdTooltip
                          title={`Sent Applications: ${progress} (${Math.round(
                            progressPercentage
                          )}%)`}
                        >
                          <div className="relative max-w-40 flex rounded-[50%] overflow-hidden my-0 mx-auto">
                            <div className="activity-ring-label absolute top-[50%] left-[50%] max-w-[90%]">
                              <span className="activity-ring-count text-[32px] font-extrabold">
                                {progress}
                              </span>
                              <span className="font-medium">
                                applications sent
                              </span>
                            </div>
                            <svg
                              viewBox="0 0 100 100"
                              width="100%"
                              height="100%"
                            >
                              <path
                                d="M 95 50 A 45 45 0 1 1 94.9999999931461 49.99921460183664"
                                fill="none"
                                strokeWidth="10"
                                strokeLinecap="round"
                                stroke="#AF8BB8"
                              ></path>
                              <path
                                d="M 95 50 A 45 45 0 1 1 94.9999999931461 49.99921460183664"
                                fill="none"
                                strokeWidth="10"
                                strokeDasharray="282.7433388230814"
                                strokeDashoffset={
                                  282.7433388230814 -
                                  (progressPercentage / 100) * 282.7433388230814
                                }
                                strokeLinecap="round"
                                stroke={loading ? "#AF8BB8" : circleShade} // Darker shade while loading
                                style={{
                                  transition:
                                    "stroke-dashoffset 500ms ease-out",
                                }}
                              ></path>
                            </svg>
                          </div>
                        </AntdTooltip>
                        <div className=" activity-footer flex flex-col  gap-4 mt-4 text-center">
                          <span className="activity-pill">
                            Goal: {weekGoal}
                          </span>
                          {message}
                        </div>
                      </div>
                    </div>

                    {/* <!-- Right Section: Application History --> */}
                    <div
                      className="w-full lg:w-1/2 p-6 bg-white shadow rounded-tl-xl rounded-tr-none rounded-br-none rounded-bl-xl overflow-y-auto"
                      style={{ height: "393px" }}
                    >
                      <div className="flex grow flex-col justify-between mb-4">
                        <h2 className="text-lg font-bold h3 mb-1">
                          Recent Applications
                        </h2>
                      </div>
                      {/* Recent Applications List */}
                      <div>
                        {Object.entries(groupedJobs).map(
                          ([date, jobList], index) => (
                            <div key={index} className="mb-6">
                              {/* Date Header */}
                              <div className="mb-2 font-semibold text-gray-600 text-sm">
                                {date}
                              </div>
                              <hr className="mb-4 border-t border-gray-300" />

                              {/* Job Applications */}
                              {jobList.map((job, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between items-center mb-4 p-2 hover:bg-gray-50 rounded"
                                >
                                  {/* Left Section: Job Details */}
                                  <div className="flex items-center">
                                    <div className="flex flex-col">
                                      <span className="font-bold">
                                        {job.jobTitle}
                                      </span>
                                      <span className="text-sm text-gray-500">
                                        {job.companyName}; {job.location}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Right Section: Status */}
                                  <div className="flex items-center">
                                    {/* Job Status */}
                                    <span
                                      className={`text-sm px-2 py-1 rounded ${
                                        [
                                          "Archived",
                                          "Withdrawn",
                                          "Not Selected",
                                          "No Response",
                                        ].includes(job.status)
                                          ? "bg-red-100 text-red-600"
                                          : "bg-green-100 text-green-600"
                                      }`}
                                    >
                                      {job.status}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )
                        )}

                        {/* View All Applications Link */}
                        <div className="text-center mt-4">
                          <Link
                            to="/dashboard/my-applications/job-trackerv1"
                            className="text-blue-500 font-semibold hover:underline"
                          >
                            View All Applications History
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ant-space-item">
                  <div className="border bg-card text-card-foreground shadow-sm rounded-tl-none rounded-bl-xl rounded-br-none rounded-tr-xl">
                    <div className="flex flex-col space-y-1.5 p-6">
                      <div className="flex grow flex-col justify-between items-center mb-4">
                        <h2 className="text-lg font-bold h3 mb-1">
                          Job Search Pipeline
                        </h2>
                        <span className="font-medium text-[14px]">
                          <DatePicker.RangePicker
                            value={dateRange}
                            onChange={onDateChange}
                            format="YYYY-MM-DD"
                          />
                        </span>
                      </div>

                      {loadingData ? (
                        <Spin size="large" />
                      ) : data.length > 0 ? (
                        <div className="flex flex-row items-center">
                          <ResponsiveContainer width="50%" height={300}>
                            <PieChart>
                              <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                // label={({ name, percentage }) =>
                                //   `${name}: ${percentage}%`
                                // }
                              >
                                {data.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                  />
                                ))}
                              </Pie>
                              <ChartTooltip
                                content={({ payload }) => {
                                  if (payload && payload.length > 0) {
                                    const { name, value, percentage } =
                                      payload[0].payload;
                                    return (
                                      <div className="p-2 bg-white shadow rounded">
                                        <p>
                                          <strong>{name}</strong>
                                        </p>
                                        <p>Total: {value}</p>
                                        <p>Percentage: {percentage}%</p>
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                          {/* Labels and Percentages */}
                          <div className="mt-4 w-[50%]">
                            <h3 className="text-lg font-bold mb-2">Details</h3>
                            <ul className="space-y-2">
                              {data.map((entry, index) => (
                                <li
                                  key={index}
                                  className="flex items-center space-x-2"
                                >
                                  <div
                                    className="w-4 h-4 rounded-full"
                                    style={{
                                      backgroundColor:
                                        COLORS[index % COLORS.length],
                                    }}
                                  ></div>
                                  <span className="font-medium">
                                    {entry.name}
                                  </span>
                                  <span className="ml-auto">
                                    {entry.value} ({entry.percentage}%)
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <p>No data available for the selected range.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Task List Section */}
            <div className="ant-col ant-col-xs-24 ant-col-xl-8 px-2">
              <div className="ant-row gap-y-4 -mx-2">
                <div className="ant-col ant-col-xs-24 ant-col-lg-12 ant-col-xl-24 px-2">
                  <div className="bg-black p-8 pt-7 text-white font-medium text-sm border border-border rounded-xl rounded-tl-none rounded-br-none mb-4">
                    <div className="mb-7">
                      <span className="flex items-center justify-start gap-2">
                        {" "}
                        <h2 className="text-[32px] font-semibold">
                          J
                          <span>
                            {/* <FiLoader /> */}
                            <RadarOutlined />
                          </span>
                          bJ
                          <span>
                            {/* <FiLoader /> */}
                            <RadarOutlined />
                          </span>
                          tt
                        </h2>
                        <FaPlus className="text-[25px]" />
                      </span>
                      <span className="text-[1.25rem] leading-7 font-semibold">
                        What's included:
                      </span>
                    </div>

                    <div>
                      <ul className="mb-8">
                        <li className="flex flex-row items-center justify-start gap-4 mb-6">
                          <div className="w-11 h-11 bg-white rounded-md flex flex-row justify-center items-center">
                            <MailOutline className="w-5 h-5 text-black " />
                          </div>

                          <div>
                            <div className="text-[14px] leading-5 font-semibold mb-1 font-sans">
                              Cover Letter Generator
                            </div>
                            <div className="text-[12px] leading-4 font-medium">
                              An intuitive AI cover letter generator
                            </div>
                          </div>
                        </li>
                        <li className="flex flex-row items-center justify-start gap-4 mb-6">
                          <div className="w-11 h-11 bg-white rounded-md flex flex-row justify-center items-center">
                            <StarOutline className="w-5 h-5 text-black " />
                          </div>
                          <div>
                            <div className="text-[14px] leading-5 font-semibold mb-1 font-sans">
                              Unlimited Keywords
                            </div>
                            <div className="text-[12px] leading-4 font-medium">
                              Strengthen your resume with keywords
                            </div>
                          </div>
                        </li>
                        <li className="flex flex-row items-center justify-start gap-4">
                          <div className="w-11 h-11 bg-white rounded-md flex flex-row justify-center items-center">
                            <svg
                              fill="#111313"
                              height="29"
                              viewBox="0 0 29 29"
                              width="29"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-primary"
                            >
                              <g clipPath="url(#clip0_116_5574)">
                                <path d="M14.9376 5.20472C15.9192 5.20472 16.715 4.40895 16.715 3.42731C16.715 2.44567 15.9192 1.6499 14.9376 1.6499C13.956 1.6499 13.1602 2.44567 13.1602 3.42731C13.1602 4.40895 13.956 5.20472 14.9376 5.20472Z"></path>
                                <path
                                  clipRule="evenodd"
                                  d="M20.2444 8.56068C18.7032 7.01949 16.2046 7.01949 14.6633 8.56066L1.28283 21.9411C-0.25834 23.4824 -0.25834 25.9811 1.28283 27.5222L1.50853 27.7479C3.04972 29.2891 5.54846 29.2891 7.08963 27.7479L20.4701 14.3674C22.0113 12.8263 22.0113 10.3275 20.4701 8.78637L20.2444 8.56068ZM16.5237 10.421C17.0374 9.90731 17.8703 9.90731 18.384 10.421L18.6098 10.6467C19.1235 11.1605 19.1235 11.9934 18.6098 12.5071L16.1384 14.9784L14.0523 12.8924L16.5237 10.421ZM12.1919 14.7527L14.278 16.8388L5.22927 25.8876C4.71555 26.4013 3.88263 26.4013 3.36891 25.8876L3.1432 25.6618C2.62948 25.1481 2.62948 24.3152 3.1432 23.8015L12.1919 14.7527Z"
                                  fillRule="evenodd"
                                ></path>
                                <path d="M26.1962 18.2388C26.8506 18.2388 27.3811 17.7083 27.3811 17.0538C27.3811 16.3994 26.8506 15.8689 26.1962 15.8689H25.0112V14.684C25.0112 14.0295 24.4807 13.499 23.8263 13.499C23.1719 13.499 22.6414 14.0295 22.6414 14.684V15.8689H21.4564C20.802 15.8689 20.2715 16.3994 20.2715 17.0538C20.2715 17.7083 20.802 18.2388 21.4564 18.2388H22.6414V19.4237C22.6414 20.0782 23.1719 20.6087 23.8263 20.6087C24.4807 20.6087 25.0112 20.0782 25.0112 19.4237V18.2388H26.1962Z"></path>
                                <path d="M27.3811 5.20476C27.3811 5.85918 26.8506 6.3897 26.1962 6.3897H25.0112V7.57461C25.0112 8.22903 24.4807 8.75955 23.8263 8.75955C23.1719 8.75955 22.6414 8.22903 22.6414 7.57461V6.3897H21.4564C20.802 6.3897 20.2715 5.85918 20.2715 5.20476C20.2715 4.55033 20.802 4.01982 21.4564 4.01982H22.6414V2.83484C22.6414 2.18042 23.1719 1.6499 23.8263 1.6499C24.4807 1.6499 25.0112 2.18042 25.0112 2.83484V4.01982H26.1962C26.8506 4.01982 27.3811 4.55034 27.3811 5.20476Z"></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_116_5574">
                                  <rect
                                    height="28.4386"
                                    transform="translate(0.126953 0.464844)"
                                    width="28.4386"
                                  ></rect>
                                </clipPath>
                              </defs>
                            </svg>
                          </div>

                          <div>
                            <div className="text-[14px] leading-5 font-semibold mb-1 font-sans">
                              Unlimited AI
                            </div>
                            <div className="text-[12px] leading-4 font-medium">
                              Customize and Enhance with AI
                            </div>
                          </div>
                        </li>
                      </ul>

                      <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-[14px] leading-5 font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 transition-all duration-75 bg-[#99BFBF] text-black hover:bg-secondary/80 focus-visible:ring-secondary h-10 px-4 py-2 rounded-3xl w-full"
                        onClick={() => setOpenModal(true)}
                      >
                        Upgrade to Jobjott+
                      </button>
                    </div>
                  </div>

                  <div className="summary-module-wrapper followups-container rounded-tl-xl rounded-bl-xl rounded-tr-none rounded-br-none overflow-y-auto">
                    <div className="module-header flex mb-4 justify-between flex-col">
                      <div className="module-heading">
                        <h2 className="h3 tracking-normal font-semibold leading-[1.2]">
                          Upcoming Interviews{" "}
                        </h2>
                      </div>
                      <hr className="mb-4 mt-4 border-t border-gray-300" />

                      <div className="space-y-4 -mx-5">
                        {sortedJobs.map((job) => (
                          <div
                            key={job._id}
                            className={`flex justify-between items-center border p-4 rounded-md ${getBorderColor(
                              job.interview?.interviewDate
                            )}`}
                          >
                            <div>
                              <h3 className="text-[20px] font-semibold">
                                {job.jobTitle}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {job.companyName}
                              </p>
                              <p className="text-sm text-gray-500">
                                Interview Type:{" "}
                                {job.interview?.interviewType || "N/A"}
                              </p>
                              <button
                                onClick={() => handleViewSchedule(job)}
                                className="text-blue-500 hover:underline"
                              >
                                View Schedule
                              </button>
                            </div>
                            <div className="flex flex-col text-right">
                              <p className="text-sm text-gray-500">
                                {new Date(
                                  job.interview?.interviewDate
                                ).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(
                                  job.interview?.interviewDate
                                ).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <StyleProvider layer>
        <AntJobModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setJobs={setJobs}
        />
      </StyleProvider>
      <JobjottModal openModal={openModal} setOpenModal={setOpenModal} />
      <GoalsModal
        goalModalOpen={goalModalOpen}
        setGoalModalOpen={setGoalModalOpen}
        selectedGoal={selectedGoal}
        goal={goal}
        currencies={currencies}
        setCurrencies={setCurrencies}
        refreshGoals={async () => {
          const updatedGoals = await getGoals();
          setGoal(updatedGoals);
        }}
      />
      <WeekGoalModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        handleSave={handleSave}
        inputGoal={inputGoal}
        setInputGoal={setInputGoal}
      />
      <InterviewModal
        modalNotifOpen={modalNotifOpen}
        setModalNotifOpen={setModalNotifOpen}
        selectedJob={selectedJob}
      />
    </>
  );
};

export default Overview;
