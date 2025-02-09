import React, { useState } from "react";
import { Checkbox, Divider, Button, Col, Menu, Dropdown } from "antd";
import {
  EditOutlined,
  InboxOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import JobPipeline from "./JobTrackerSectTwo/JobPipeline";
import DropdownComponent from "./ActionButtons/DropdownComponent";
import FilterDropdownMenu from "./ActionButtons/FilterDropdown";
import MenuDropdown from "./ActionButtons/MenuDropdown";
import { StyleProvider } from "@ant-design/cssinjs";
import Newjob from "./ActionButtons/Newjob";
import AntJobModal from "./ActionButtons/AntJobModal";
import { DeleteJobModal } from "./JobTrackerSectOne/ExtendedSections";
import "./JobTrackerSectTwo/JobTrackerSectionTwo.css";
import "./JobTrackerSectOne/JobTrackerSectionOne.css";
import { useOutletContext } from "react-router-dom";

const STATUS_OPTIONS = [
  "Bookmarked",
  "Applying",
  "Applied",
  "Interviewing",
  "Negotiating",
  "Accepted",
  "I Withdrew",
  "Not Selected",
  "No Response 😒",
  "Archived",
];

const ARCHIVE_STATUSES = [
  "I Withdrew",
  "Not Selected",
  "No Response 😒",
  "Archived",
];

const JobTrackerSectionTwo = () => {
  const { jobs, setJobs, handleJobUpdate, selectedJob, setSelectedJob, archivedJobs, setArchivedJobs } =
    useOutletContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const activeJobs = jobs.filter(
    (job) => !ARCHIVE_STATUSES.includes(job.status)
  );

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSelectAll = (e) => {
    setSelectedJobs(e.target.checked ? activeJobs.map((job) => job._id) : []);
  };

  const handleJobSelect = (jobId) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleStatusChange = (jobId, newStatus) => {
    const updatedJobs = jobs.map((job) =>
      job._id === jobId ? { ...job, status: newStatus } : job
    );
    setJobs(updatedJobs);
    handleJobUpdate(jobId, { status: newStatus });
  };

  const handleArchive = () => {
    setJobs((prev) =>
      prev.map((job) =>
        selectedJobs.includes(job._id) ? { ...job, status: "Archived" } : job
      )
    );
    setSelectedJobs([]);
  };

  const handleDeleteJobClick = () => {
    setDeleteModalOpen(true); // Open delete job modal
  };

  const statusMenu = (jobId) => ({
    items: STATUS_OPTIONS.map((status) => ({
      key: status,
      label: (
        <span onClick={() => handleStatusChange(jobId, status)}>{status}</span>
      ),
    })),
  });

  // const [visibleColumns, setVisibleColumns] = useState({
  //   selected: true,
  //   role: true,
  //   company_name: true,
  //   application_deadline: true,
  //   posted_at: true,
  //   follow_up_at: true,
  //   min_salary: true,
  //   location: true,
  //   statusName: true,
  //   max_salary: true,
  // });

  const data = [
    {
      id: jobs?._id,
      selected: false,
      role: jobs?.jobTitle,
      company_name: jobs?.companyName,
      applied_at: jobs?.dates.applied,
      added_at: jobs?.dates.saved,
      application_deadline: jobs?.dates.deadline,
      follow_up_at: jobs?.dates.followUp,
      max_salary: jobs?.salaryRange.maxSalary,
      statusName: jobs?.status,
      location: jobs?.location,
    },
    //other objexts will be added here
  ];

  const columns = [ 
    {
      title: "",
      dataIndex: "selected",
      key: "selected",
      tabulatorfield: "selected",
      render: (selected) => (
        <div className="formatterCell">
          <Checkbox
            className="font-semibold"
            onChange={handleChange}
            checked={isChecked}
          />
        </div>
      ),
      width: 40,
      height: 37,
      height2: 56,
      align: "center",
      className: "text-center",
    },
    {
      title: "Job Position",
      dataIndex: "role",
      tabulatorfield: "role",
      key: "role",
      width: 180,
      height: 37,
      height2: 56,
      align: "center",
      render: (text) => (
        <div className="formatterCell">
          <div className="invisible-button" role="button" tabIndex="0">
            <span>{text}</span>
          </div>
        </div>
      ),
      className: "role-cell",
    },
    {
      title: "Company",
      dataIndex: "company_name",
      tabulatorfield: "company_name",
      key: "company_name",
      width: 120,
      height: 37,
      height2: 56,
      align: "center",
      render: (text) => (
        <div className="formatterCell">
          <div className="invisible-button" role="button" tabIndex="0">
            <span>{text}</span>{" "}
            <span
              role="img"
              aria-label="right"
              className="anticon anticon-right"
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="right"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
              </svg>
            </span>
          </div>
        </div>
      ),
      className: "company-cell",
    },
    {
      title: "Date Posted",
      dataIndex: "posted_at",
      key: "posted_at",
      tabulatorfield: "posted_at",
      tabIndex: 0,
      width: 111,
      height: 37,
      height2: 56,
      align: "center",
      render: (text) => (
        <span
          className="tabulator-cell-line-clamp tabulator-cell-full-background"
          style={{ background: "" }}
        >
          {text ? text : "N/A"}
        </span>
      ),
      className: "tabulator-cell-text-edit tabulator-editable",
    },
    {
      title: "Date Applied",
      dataIndex: "applied_at",
      tabulatorfield: "applied_at",
      tabIndex: 0,
      key: "applied_at",
      width: 134,
      height: 37,
      height2: 56,
      align: "center",
      render: (text) => (
        <span className="muted-text">{text ? text : "N/A"}</span>
      ),
      className: "tabulator-cell-text-edit tabulator-editable",
    },
    {
      title: "Follow up",
      dataIndex: "follow_up_at",
      key: "follow_up_at",
      tabulatorfield: "follow_up_at",
      tabIndex: 0,
      width: 100,
      height: 37,
      height2: 56,
      align: "center",
      render: (text) => (text ? text : <Button type="link">Add date</Button>),
      className: "tabulator-cell-text-edit tabulator-editable",
    },
    {
      title: "Date Saved",
      dataIndex: "added_at",
      key: "added_at",
      tabulatorfield: "added_at",
      tabIndex: 0,
      width: 111,
      height: 37,
      height2: 56,
      align: "center",
      render: (text) => (
        <span
          className="tabulator-cell-line-clamp tabulator-cell-full-background"
          style={{ background: "" }}
        >
          {text ? text : "N/A"}
        </span>
      ),
      className: "tabulator-cell-text-edit tabulator-editable",
    },
    {
      title: "Deadline",
      dataIndex: "application_deadline",
      tabulatorfield: "application_deadline",
      key: "application_deadline",
      tabIndex: 0,
      width: 134,
      height: 37,
      height2: 56,
      align: "center",
      render: (text) => (text ? text : "N/A"),
      className: "tabulator-cell-text-edit tabulator-editable",
    },

    {
      title: "Min. Salary",
      dataIndex: "min_salary",
      key: "min_salary",
      tabulatorfield: "min_salary",
      tabIndex: 0,
      width: 111,
      height: 37,
      height2: 56,
      align: "center",
      render: (text) => text,
      className: "tabulator-cell-text-edit tabulator-editable",
    },
    {
      title: "Max. Salary",
      dataIndex: "max_salary",
      key: "max_salary",
      tabulatorfield: "max_salary",
      tabIndex: 0,
      width: 111,
      height: 37,
      height2: 56,
      align: "center",
      render: (text) => text,
      className: "tabulator-cell-text-edit tabulator-editable",
    },
    {
      title: "Status",
      dataIndex: "statusName",
      key: "statusName",
      tabulatorfield: "statusName",
      tabIndex: 0,
      width: 100,
      height: 37,
      height2: 56,
      align: "center",
      render: (text) => text,
      className: "selection-cell tabulator-editable",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      tabulatorfield: "location",
      tabIndex: 0,
      width: 120,
      height: 37,
      height2: 56,
      align: "center",
      render: (text) => (
        <span className="tabulator-cell-line-clamp">{text}</span>
      ),
      className: "tabulator-cell-text-edit tabulator-editable",
    },
  ];

  return (
    <>
      <JobPipeline />
      <>
        <div className="job-tracker-section false">
          <div
            className="_cluster_jw67l_1 job-tracker-actions"
            style={{
              "--space": 0,
              "--align": "stretch",
              "--justify": "space-between",
              "--wrap": "wrap",
            }}
          >
            <Col>
              <div className="selection-bar">
                <Checkbox
                  className="font-semibold"
                  onChange={handleSelectAll}
                  checked={selectedJobs.length === activeJobs.length}
                >
                  {`${selectedJobs.length} selected`}
                </Checkbox>

                {selectedJobs.length > 0 && (
                  <>
                    <Divider type="vertical" className="vertical-separator" />
                    <Dropdown
                      menu={statusMenu(selectedJobs[0])}
                      trigger={["click"]}
                    >
                      <Button
                        icon={<EditOutlined />}
                        size="small"
                        className="ts-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setStatusDropdownOpen(true);
                        }}
                      >
                        Status
                      </Button>
                    </Dropdown>
                    <Divider type="vertical" className="vertical-separator" />
                    <Button
                      icon={<InboxOutlined />}
                      size="small"
                      className="ts-btn"
                      onClick={handleArchive}
                    >
                      Archive
                    </Button>
                    <Button
                      icon={<DeleteOutlined />}
                      size="small"
                      danger
                      className="ts-btn"
                      onClick={handleDeleteJobClick}
                    >
                      Delete
                    </Button>
                    {deleteModalOpen && (
                      <DeleteJobModal
                        deleteModalOpen={deleteModalOpen}
                        setDeleteModalOpen={setDeleteModalOpen}
                      />
                    )}
                  </>
                )}
              </div>
            </Col>

            <div className="ant-col action-buttons">
              <DropdownComponent />
              <FilterDropdownMenu />
              <MenuDropdown />
              <StyleProvider layer>
                <Newjob setModalOpen={setModalOpen} />
              </StyleProvider>
            </div>
          </div>
        </div>
        <StyleProvider layer>
          <AntJobModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </StyleProvider>
      </>

      <div className="job-tracker-section false">
        <div className="job-tracker-table-container">
          <div className="table-column-wrapper">
            <div
              className="job-tracker-table tabulator"
              role="grid"
              tabulator-layout="fitColumns"
              style={{ height: "100%" }}
            >
              {/* Table Header */}
              <div className="tabulator-header" role="rowgroup">
                <div className="tabulator-header-contents" role="rowgroup">
                  <div className="tabulator-headers" style={{ height: "37px" }}>
                    {columns.map((col, index) => (
                      <div
                        key={col.key}
                        className={`${
                          index === 0
                            ? "tabulator-col text-center"
                            : "tabulator-col tabulator-sortable tabulator-col-sorter-element role-cell"
                        }`}
                        style={{
                          width: `${col.width}px`,
                          justifyContent: col.align,
                          minWidth: `${col.width}px`,
                          height: `${col.height}px`,
                        }}
                        role="columnheader"
                        aria-sort="none"
                      >
                        <div className="tabulator-col-content">
                          <div className="tabulator-col-title-holder">
                            <div className="tabulator-col-title">
                              {col.title}
                              {index > 0 && (
                                <div className="tabulator-col-sorter">
                                  <div className="tabulator-arrow"></div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div
                className="tabulator-tableholder"
                style={{
                  height: "calc(100% - 38px)",
                  maxHeight: "calc(100% - 38px)",
                }}
                tabIndex={0}
              >
                <div className="tabulator-table" role="rowgroup">
                  {/* TODO: Implement backend connection for dynamic key generation */}
                  {/* <div key={`${item.userId}-${item.timestamp}`}></div> */}
                  {data.map((row) => (
                    <div
                      key={row.id}
                      className="tabulator-row tabulator-selectable tabulator-row-odd"
                      role="row"
                    >
                      {columns.map((col) => (
                        <>
                          <div
                            key={col.key}
                            className={`tabulator-cell ${col.className}`}
                            style={{
                              width: `${col.width}px`,
                              height: `${col.height2}px`,
                            }}
                            role="gridcell"
                            tabIndex={col.tabIndex}
                            tabulatorfield={col.tabulatorfield}
                          >
                            {col.render
                              ? col.render(row[col.dataIndex], row)
                              : row[col.dataIndex]}
                          </div>
                          {col.key !== columns[columns.length - 1].key && (
                            <span
                              className="tabulator-col-resize-handle"
                              style={{ height: `${col.height}px` }}
                            ></span>
                          )}
                        </>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobTrackerSectionTwo;
