// import HomeIcon from "../../../assets/homeicon.svg?react";
// import ResumeIcon from "../../../assets/resumebuilder.svg?react";
// import ApplicationIcon from "../../../assets/myapplication.svg?react";
// import ContactIcon from "../../../assets/contacticon.svg?react";
import { TbSmartHome } from "react-icons/tb";
// import { BiLogOut } from "react-icons/bi";
import { MdOutlineSupport } from "react-icons/md";
// import HelpIcon from "../../../assets/helpicon.svg?react";
import { FaRegUserCircle } from "react-icons/fa";

export const SideDashData = [
  {
    id: 1,
    title: "Home",
    icon: <TbSmartHome className="!text-xl" />,
    path: "/dashboard/home",
  },
  {
    id: 2,
    title: "Resume Builder",
    icon: <TbSmartHome />,
    path: "/dashboard/resume-builder",
  },
  {
    id: 3,
    title: "Job Tracker",
    icon: <TbSmartHome />,
    path: "/dashboard/my-applications",
  },
  // {
  //   id: 4,
  //   title: "Contacts",
  //   icon: <TbSmartHome />,
  //   path: "/dashboard/contacts",
  // },
  {
    id: 5,
    title: "Archived Jobs",
    icon: <TbSmartHome />,
    path: "/dashboard/archived-jobs",
  },
];

export const SideDashData2 = [
  {
    id: 5,
    title: "Support Center",
    icon: <MdOutlineSupport />,
    path: "/dashboard/supportcenter",
  },
  {
    id: 6,
    title: "Account",
    icon: <FaRegUserCircle />,
    path: "/dashboard/account",
  },
];
