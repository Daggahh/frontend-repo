import React, { useState, useEffect } from "react";
import divider from "../../assets/Divider.svg";
import { Link } from "react-router-dom";
import "../../styles/Nav.css";
import { RadarOutlined } from "@mui/icons-material";
import MobileNav from "./MobileNav";

const Nav = () => {
  const [toggle, setToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
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
    <nav
      className={`navbar-header ${
        isScrolled || toggle ? "navbar-scrolled open" : ""
      }`}
    >
      <div
        data-w-id="a13ce6ee-ae2f-565a-431b-7fc261fc276d"
        data-animation="default"
        data-collapse="medium"
        data-duration="400"
        data-easing="ease"
        data-easing2="ease"
        role="banner"
        className="navbar w-nav"
      >
        <div className="flex items-center">
          <div className="content-text !block">
            <Link to="/">
              <h1 className="!tracking-normal text-[#012332] text-[24px] font-bold">
                J
                <span>
                  <RadarOutlined className="text-[10px]" />
                </span>
                bJ
                <span>
                  <RadarOutlined />
                </span>
                tt
              </h1>
            </Link>
          </div>

          <div className="navbar-left">
            <div className="navbar-menu">
              <Link to="/" className="menu-links relative">
                <p className="menu-title relative hover-underline-animation">
                  AI Resume Builder
                </p>
              </Link>

              <a href="/" className="menu-links long-text relative">
                <p className="menu-title relative hover-underline-animation">
                  Job Application Tracker
                </p>
              </a>

              <Link to="/pricing" className="menu-links relative">
                <p className="menu-title relative hover-underline-animation">
                  Pricing
                </p>
              </Link>
            </div>
          </div>
        </div>

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

        <div className="div-block-82">
          <Link to="/auth/signup">
            <button className="cta-button-2">
              <span className="box-2">Sign Up</span>
            </button>
          </Link>
          <div
            className="uui-navbar_menu-button w-nav-button"
            style={{ WebkitUserSelect: "text" }}
            aria-label="menu"
            role="button"
            tabIndex="0"
            aria-controls="w-nav-overlay-0"
            aria-haspopup="menu"
            aria-expanded={toggle}
            onClick={handleToggle}
          >
            <div className={`menu-icon_component ${toggle ? "open" : ""}`}>
              <div className="menu-icon_line-top line"></div>
              <div
                className="menu-icon_line-middle line"
                style={{ width: "24px", height: "2px" }}
              >
                <div className="menu-icon_line-middle-inner line"></div>
              </div>
              <div className="menu-icon_line-bottom line"></div>
            </div>
          </div>
        </div>
      </div>
      {toggle && <MobileNav toggle={toggle} setToggle={setToggle} />}
    </nav>
  );
};

export default Nav;
