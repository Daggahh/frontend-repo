import React from "react";
import { FiLoader } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";
import { RadarOutlined } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="logo">
            <Link to="/">
              <h1 className="!tracking-normal text-[#012332] text-[56px] font-bold tracki\">
                J
                <span>
                  {/* <FiLoader /> */}
                  <RadarOutlined fontSize="large" />
                </span>
                bJ
                <span>
                  {/* <FiLoader /> */}
                  <RadarOutlined fontSize="large" />
                </span>
                tt
              </h1>
            </Link>
          </div>

          <div className="footer-2">
            <div className="Company">
              <h4>Company</h4>
              <dd>
                <Link to="/about/">About us</Link>
              </dd>
              <dd>
                <a href="#">Blog</a>
              </dd>
              <dd>
                <a href="#">Contact us</a>
              </dd>
              <dd>
                <Link to="/FAQ/">How it Works</Link>
              </dd>
              <dd>
                <Link to="/testimonials/">Testimonials</Link>
              </dd>
            </div>

            <div className="support">
              <h4>Support</h4>
              <dd>
                <a href="#">Help center</a>
              </dd>
              <dd>
                <a href="#">Terms of service</a>
              </dd>
              <dd>
                <a href="#">Legal</a>
              </dd>
              <dd>
                <a href="#">Privacy policy</a>
              </dd>
              <dd>
                <a href="#">Status</a>
              </dd>
            </div>
          </div>

          <div className="socials">
            <h4>Follow us on</h4>
            <div className="social-icons">
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaLinkedin />
              </a>
              <a href="#">
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>©JobJott 2024.All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
