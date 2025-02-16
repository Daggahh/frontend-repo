import React, { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import Nav from "./Nav";
import "../../styles/Pricing.css";
import { Link } from "react-router-dom";
import FooterBottom from "./FooterBottom";

const Pricing = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-[#F5F9F9]">
      <Nav />

      <div className="jobjot-main-container !justify-normal bg-[#F5F9F9]">
        <div
          className={`pricing-component hero-section bg-[#F5F9F9] ${
            isLoaded
              ? "opacity-100 transition-opacity duration-500"
              : "opacity-0"
          } `}
        >
          <div className="w-[98%] mx-auto pt-20">
            <h2 className="text-[2.5rem] md:text-[3rem] text-center font-bold mb-5 md:leading-tight text-[#012332]">
              Find Your Perfect Plan.
            </h2>
            <p className="text-[0.875rem] md:text-[1rem] font-medium text-center w-full  md:w-[70%] mx-auto z-20 mb-10 leading-relaxed text-[#012332]">
              Upgrade to unlock Teal's premium features and turbocharge your job
              search.
            </p>
            <div className="flex gap-3 items-center justify-center mb-10 md:mb-0">
              <button className="pricing-btn px-8 py-3">Monthly</button>
              {/* <button className="font-semibold text-[0.875rem] leading-6 text-[#111313] px-8 py-3 border-[#012332] border-2 border-solid rounded-full">
              Yearly
            </button> */}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-10 mt-14 mobile-flex -ms-5 -me-5">
            <div className="bg-white rounded-2xl p-5 shadow ">
              <div className="mobile-flex-row">
                <div className="bg-background p-4 rounded-2xl pricing-textbox">
                  <p className="text-[0.875rem] mb-5">Starter Plan</p>
                  <h4 className="text-[3rem] leading-4 font-bold mb-5">Free</h4>
                  <p className="text-[0.875rem] w-full leading-relaxed tracking-tight">
                    Create and manage profiles.
                  </p>
                </div>
                <div>
                  <ul className="flex flex-col mt-5 gap-2">
                    <li>
                      <p className="text-base md:leading-loose w-full flex items-center gap-2 tracking-tighter">
                        <FaCircleCheck className="text-xl text-main" />
                        Save and track job applications
                      </p>
                    </li>
                    <li>
                      <p className="text-base md:leading-loose w-full flex items-center gap-2 tracking-tighter">
                        <FaCircleCheck className="text-xl text-main" />
                        Add contacts
                      </p>
                    </li>
                    <li>
                      <p className="text-base md:leading-loose w-full flex items-center gap-2 tracking-tighter">
                        <FaCircleCheck className="text-xl text-main" />
                        Guidance on how track job applications
                      </p>
                    </li>
                    <li>
                      <p className="text-base md:leading-loose w-full flex items-center gap-2 tracking-tighter">
                        <FaCircleCheck className="text-xl text-main" />
                        Support Center
                      </p>
                    </li>
                    <li>
                      <p className="text-base md:leading-loose w-full flex items-center gap-2 tracking-tighter">
                        <FaCircleCheck className="text-xl text-main" />
                        Track your job applications in real time
                      </p>
                    </li>
                  </ul>
                  <Link to="/auth/signin">
                    <button className="bg-[#2A8E9E] py-5 mt-5 rounded-full w-full text-white text-sm mobile-btn">
                      Select Plan
                    </button>
                  </Link>
                </div>
              </div>

              <Link to="/auth/signin">
                <button className="bg-[#2A8E9E] py-5 mt-5 rounded-full w-full text-white text-sm mobile-flex-row-btn">
                  Select Plan
                </button>
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow">
              <div className="mobile-flex-row">
                <div className="bg-background p-4 rounded-2xl pricing-textbox">
                  <p className="text-[0.875rem] mb-5">Standard Plan</p>
                  <h4 className="text-[3rem] leading-4 font-bold mb-5 pricing-h4">
                    <span className="text-[0.875rem]">NGN</span> 10,000.00{" "}
                    <span className="text-sm font-normal"></span>
                  </h4>
                  <p className="text-sm w-full leading-relaxed tracking-tight">
                    AI curated Professional Resume Builder for different
                    industries.
                  </p>
                </div>
                <div>
                  <ul className="flex flex-col mt-5 gap-2">
                    <li>
                      <p className="text-base md:leading-loose w-full flex items-center gap-2 tracking-tighter">
                        <FaCircleCheck className="text-xl text-main" />
                        Smart Job Recommendations
                      </p>
                    </li>
                    <li>
                      <p className="text-base md:leading-loose w-full flex items-center gap-2 tracking-tighter">
                        <FaCircleCheck className="text-xl text-main" />
                        Resume Builder
                      </p>
                    </li>
                    <li>
                      <p className="text-base md:leading-loose w-full flex items-center gap-2 tracking-tighter">
                        <FaCircleCheck className="text-xl text-main" />
                        Real time Email Notifications
                      </p>
                    </li>
                    <li>
                      <p className="text-base md:leading-loose w-full flex items-center gap-2 tracking-tighter">
                        <FaCircleCheck className="text-xl text-main" />
                        Real time Job Updates
                      </p>
                    </li>
                    <li>
                      <p className="text-base md:leading-loose w-full flex items-center gap-2 tracking-tighter">
                        <FaCircleCheck className="text-xl text-main" />
                        Email template notifications
                      </p>
                    </li>
                  </ul>
                  <Link to="/auth/signin">
                    <button className="bg-[#2A8E9E] py-5 mt-5 rounded-full w-full text-white text-sm mobile-btn">
                      Select Plan
                    </button>
                  </Link>
                </div>
              </div>
              <Link to="/auth/signin">
                <button className="bg-[#2A8E9E] py-5 mt-5 rounded-full w-full text-white text-sm mobile-flex-row-btn">
                  Select Plan
                </button>
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow">
              <div className="mobile-flex-row">
                <div className="bg-background p-4 rounded-2xl pricing-textbox">
                  <p className="text-sm mb-5">Pro Version</p>
                  <h4 className="text-[3rem] leading-4 font-bold mb-5  pricing-h4">
                    <span className="text-[0.875rem]">NGN</span> 20,000.00
                    <span className="text-sm font-normal"></span>
                  </h4>
                  <p className="text-sm w-full leading-relaxed tracking-tight">
                    Professional Cover Letters tailored specifically to
                    different jobs.
                  </p>
                </div>
                <div>
                  <ul className="flex flex-col mt-5 gap-2">
                    <li>
                      <p className="text-base md:leading-loose w-full flex items-center gap-2 tracking-tighter">
                        <FaCircleCheck className="text-xl text-main" />
                        Smart Job Recommendations
                      </p>
                    </li>
                    <li>
                      <p className="text-base md:leading-loose w-full flex items-center gap-2 tracking-tighter">
                        <FaCircleCheck className="text-xl text-main" />
                        Resume Builder
                      </p>
                    </li>
                    <li>
                      <p className="text-base md:leading-loose w-full flex items-center gap-2 tracking-tighter">
                        <FaCircleCheck className="text-xl text-main" />
                        Real time Email Notifications
                      </p>
                    </li>
                    <li>
                      <p className="text-base md:leading-loose w-full flex items-center gap-2 tracking-tighter">
                        <FaCircleCheck className="text-xl text-main" />
                        Real time Job Updates
                      </p>
                    </li>
                    <li>
                      <p className="text-base md:leading-loose w-full flex items-center gap-2 tracking-tighter">
                        <FaCircleCheck className="text-xl text-main" />
                        Email template notifications
                      </p>
                    </li>
                    <li>
                      <p className="text-base md:leading-loose w-full flex items-center gap-2 tracking-tighter">
                        <FaCircleCheck className="text-xl text-main" />
                        Cover letter templates
                      </p>
                    </li>
                  </ul>
                  <Link to="/auth/signin">
                    <button className="bg-[#2A8E9E] py-5 mt-5 rounded-full w-full text-white text-sm mobile-btn">
                      Select Plan
                    </button>
                  </Link>
                </div>
              </div>
              <Link to="/auth/signin">
                <button className="bg-[#2A8E9E] py-5 mt-5 rounded-full w-full text-white text-sm mobile-flex-row-btn">
                  Select Plan
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <FooterBottom />
    </div>
  );
};

export default Pricing;
