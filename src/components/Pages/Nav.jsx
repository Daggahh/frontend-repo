import React, { useState, useEffect } from "react";
import arrowdown from "../../assets/chevron-arrow-down.svg";
import divider from "../../assets/Divider.svg";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
// import SideBar from "./SideBar";
import "../../styles/Nav.css";
import { RadarOutlined } from "@mui/icons-material";

const Nav = () => {
  const [toggle, setToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar-header");
      const homeSection = document.getElementById("home-section");
      const homeSectionHeight = homeSection ? homeSection.offsetHeight : 0;
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > homeSectionHeight) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar-header ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar">
          <div className="flex items-center">
            <div className="content-text !block">
              <Link to="/">
                <h1 className="!tracking-normal text-[#012332] text-[24px] font-bold">
                  J
                  <span>
                    {/* <FiLoader /> */}
                    <RadarOutlined className="text-[10px]" />
                  </span>
                  bJ
                  <span>
                    {/* <FiLoader /> */}
                    <RadarOutlined />
                  </span>
                  tt
                </h1>
              </Link>
            </div>

            <div className="navbar-left">
              <div className="navbar-menu">
                <a href="/" className="menu-links long-text relative">
                  <p className="menu-title relative hover-underline-animation">
                    Job Application Tracker
                  </p>
                </a>

                <Link
                  to="/dashboard/supportcenter"
                  className="menu-links relative"
                >
                  <p className="menu-title relative hover-underline-animation">
                    Support Center
                  </p>
                </Link>

                <Link to="/pricing" className="menu-links relative">
                  <p className="menu-title relative hover-underline-animation">
                    Pricing
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {/* <div className="dropdown">
          <button className="dropbtn">More</button>
          <div className="dropdown-content">
            <a href="#">Career Hub</a>
            <a href="#">Cover Letter Templates</a>
            <a href="#">Resume Templates</a>
            <a href="#">Interview Question Templates</a>
            <a href="#">Career Path</a>
          </div>
        </div>
      </div> */}

          <div className="navbar-right">
            <Link to="/auth/signin">
              <button className="cta-button">
                <span className="box">Login</span>
              </button>
            </Link>

            <img src={divider} alt="" />

            <Link to="/auth/signup">
              <button className="cta-button-2">
                <span className="box-2">Sign Up</span>
              </button>
            </Link>
          </div>
          <div className="icon-menu" onClick={handleToggle}>
            {" "}
            <RxHamburgerMenu color="black" size={25} />{" "}
          </div>
        </div>
      </nav>
      {toggle === false ? null : (
        <SideBar toggle={toggle} setToggle={setToggle} />
      )}
    </>
  );
};

export default Nav;
