import React, { useState } from "react";
import { Modal, Button,} from "antd";
import {
  CheckCircleOutlined,
  UserOutlined,
  FileDoneOutlined,
  ContactsOutlined,
  BulbOutlined,
  CustomerServiceOutlined,
  ClockCircleOutlined,
  RobotOutlined,
  SolutionOutlined,
  EditOutlined,
  MailOutlined,
  BellOutlined,
  FileTextOutlined,
  SearchOutlined,
  LeftCircleOutlined,
} from "@ant-design/icons";
import { FaPlus } from "react-icons/fa";
import { AnalyticsOutlined } from "@mui/icons-material";

const JobjottModal = ({ openModal, setOpenModal }) => {
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [isPaymentFormVisible, setIsPaymentFormVisible] = useState(false);

  const plans = {
    free: {
      title: "Free Plan",
      features: [
        {
          icon: <UserOutlined className="text-[20px] w-[20px] h-[24px]" />,
          feature: "Create and manage profiles",
        },
        {
          icon: <FileDoneOutlined className="text-[20px] w-[20px] h-[24px]" />,
          feature: "Save and track job applications",
        },
        {
          icon: <ContactsOutlined className="text-[20px] w-[20px] h-[24px]" />,
          feature: "Add and manage contacts",
        },
        {
          icon: <BulbOutlined className="text-[20px] w-[20px] h-[24px]" />,
          feature: "Guidance on how to track job applications",
        },
        {
          icon: (
            <CustomerServiceOutlined className="text-[20px] w-[20px] h-[24px]" />
          ),
          feature: "Support Center",
        },
        {
          icon: (
            <ClockCircleOutlined className="text-[20px] w-[20px] h-[24px]" />
          ),
          feature: "Track your job applications in real time",
        },
      ],
    },
    "10k": {
      title: "₦10,000 Every month",
      features: [
        {
          icon: <RobotOutlined className="text-[20px] w-[20px] h-[24px]" />,
          feature:
            "AI curated Professional Resume Builder for different industries",
        },
        {
          icon: <SolutionOutlined className="text-[20px] w-[20px] h-[24px]" />,
          feature: "Smart Job Recommendations",
        },
        {
          icon: <EditOutlined className="text-[20px] w-[20px] h-[24px]" />,
          feature: "Resume Builder",
        },
        {
          icon: <MailOutlined className="text-[20px] w-[20px] h-[24px]" />,
          feature: "Real-time Email Notifications",
        },
        {
          icon: <BellOutlined className="text-[20px] w-[20px] h-[24px]" />,
          feature: "Real-time Job Updates",
        },
        {
          icon: <FileTextOutlined className="text-[20px] w-[20px] h-[24px]" />,
          feature: "Email template notifications",
        },
      ],
    },
    "20k": {
      title: "₦20,000 Every month",
      features: [
        {
          icon: (
            <svg
              fill="currentColor"
              height="28"
              viewBox="0 0 29 29"
              width="28"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[20px] w-[20px] h-[24px]"
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
          ),
          feature: "Unlimited AI-generated Resume Content & Cover Letters",
        },
        {
          icon: <BulbOutlined className="text-[20px] w-[20px] h-[24px]" />,
          feature:
            "Highlight your qualifications with job-specific resume recommendations",
        },
        {
          icon: <MailOutlined className="text-[20px] w-[20px] h-[24px]" />,
          feature:
            "Save time with email templates for every stage of your job application",
        },
        {
          icon: <SearchOutlined className="text-[20px] w-[20px] h-[24px]" />,
          feature:
            "Customize your applications faster with unlimited skills & keywords",
        },
        {
          icon: <AnalyticsOutlined className="text-[20px] w-[20px] h-[24px]" />,
          feature: "Get more interviews with unlimited resume analysis",
        },
      ],
    },
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setIsPaymentFormVisible(false); // Reset payment form when changing plans
  };

  const handleNext = () => {
    if (selectedPlan === "free") {
      setOpenModal(false);
    } else {
      setIsPaymentFormVisible(true);
    }
  };

  return (
    <Modal
      centered
      open={openModal}
      onCancel={() => setOpenModal(false)}
      footer={null}
      className="jobjott-plus-modal ant-modal mt-16 mb-5"
    >
      <div className="jobjott-plus-container flex max-w-[1140px]">
        <div className="col left">
          <div className="jobjott-plus-content">
            <span className="text-[48px] flex items-center font-bold">
              JobJott <FaPlus className="text-[38px] ml-2 mt-2" />
            </span>
            <div className="copy mt-6 font-semibold text-[24px] leading-[120%]">
              Upgrade your Membership today and land a job you love sooner!
            </div>
            <div className="features mt-8 flex flex-col gap-4 font-medium">
              {plans[selectedPlan]?.features.map(({ feature, icon }, index) => (
                <div
                  key={index}
                  className="feature-item flex gap-4 items-center"
                >
                  <span className="feature-icon max-w-full h-auto">{icon}</span>
                  <div className="feature-item-description text-[16px]">
                    {feature}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col right">
          {!isPaymentFormVisible ? (
            <div
              className="options flex flex-col gap-[27px] text-center"
              style={{ padding: "138px 120px 80px" }}
            >
              <div className="font-semibold">
                Select your upgrade option below and proceed to checkout
              </div>
              <div className="jobjott-plus-buttons flex gap-2 flex-col">
                {Object.entries(plans).map(([key, plan]) => (
                  <Button
                    key={key}
                    type="button"
                    onClick={() => handlePlanSelect(key)}
                    className={`ant-btn price-btn w-full hover:bg-[#0051491a] ${
                      selectedPlan === key ? "selected" : ""
                    }`}
                  >
                    <div className="price">
                      <strong>{plan.title}</strong>
                    </div>
                    {selectedPlan === key && (
                      <CheckCircleOutlined className="mr-2 text-[20px]" />
                    )}
                  </Button>
                ))}
              </div>
              <Button
                type="button"
                className="ant-btn ant-btn-round ant-btn-primary w-full ant-btn-secondary"
                onClick={handleNext}
              >
                <span>Next</span>
              </Button>
            </div>
          ) : (
            <div className="checkout" style={{ padding: "138px 40px 97px" }}>
              <button
                type="button"
                onClick={() => setIsPaymentFormVisible(false)}
                className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
              >
                <LeftCircleOutlined /> <span>Back to Plan Selection</span>
              </button>
              <div className="w-full mb-6">
                <p className="text-[1.25rem] leading-7 font-semibold flex justify-between">
                  <span>JobJott plus</span>
                  {/* <span>{plans[selectedPlan]?.title}</span> */}
                  <span>{selectedPlan === "10k" ? "₦10,000" : "₦20,000"}</span>
                </p>
                <p className="text-[1.125rem] font-normal leading-7 text-gray-500">
                  Billed every month
                </p>
              </div>
              <form id="payment-form">
                <div id="payment-element" className="StripeElement">
                  {/* Stripe Payment Element */}
                </div>
                <button className="pay-btn relative border-none pt-[12px] text-[16px] pb-[12px] pl-[24px] pr-[24px] flex flex-row items-center font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 transition-all duration-300 bg-black text-white hover:bg-secondary/80 focus-visible:ring-secondary h-10 rounded-3xl w-full">
                  <a
                    href={
                      selectedPlan === "10k"
                        ? "https://paystack.com/pay/bqojc7nu6m" // Link for 10k plan
                        : "https://paystack.com/pay/v7h9r58hwo" // Replace with the 20k plan link
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap !text-[14px] leading-5 font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 transition-all duration-300 bg-black text-white hover:bg-secondary/80 focus-visible:ring-secondary h-10 rounded-3xl w-full"
                  >
                    Purchase
                  </a>
                  <div className="icon-container">
                    <svg viewBox="0 0 24 24" className="icon card-icon">
                      <path
                        d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18C2,19.11 2.89,20 4,20H20C21.11,20 22,19.11 22,18V6C22,4.89 21.11,4 20,4Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <svg viewBox="0 0 24 24" className="icon payment-icon">
                      <path
                        d="M2,17H22V21H2V17M6.25,7H9V6H6V3H18V6H15V7H17.75L19,17H5L6.25,7M9,10H15V8H9V10M9,13H15V11H9V13Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <svg viewBox="0 0 24 24" className="icon dollar-icon">
                      <path
                        d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                        fill="currentColor"
                      ></path>
                    </svg>

                    <svg
                      viewBox="0 0 24 24"
                      className="icon wallet-icon default-icon"
                    >
                      <path
                        d="M21,18V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V6H12C10.89,6 10,6.9 10,8V16A2,2 0 0,0 12,18M12,16H22V8H12M16,13.5A1.5,1.5 0 0,1 14.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,12A1.5,1.5 0 0,1 16,13.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>

                    <svg viewBox="0 0 24 24" className="icon check-icon">
                      <path
                        d="M9,16.17L4.83,12L3.41,13.41L9,19L21,7L19.59,5.59L9,16.17Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
export default JobjottModal;
