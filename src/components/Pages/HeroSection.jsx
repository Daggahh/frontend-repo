import React, { useEffect } from "react";
import "../../styles/HeroSection.css";
import rectsmall from "../../assets/rectsmall.svg";
import { Link } from "react-router-dom";
import gsap from "gsap";

const HeroSection = () => {
  useEffect(() => {
    const ctcp = ".call-to-action p";
    gsap.fromTo(
      ctcp,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: "power2.out",
        duration: 1,
      }
    );
  }, []);

  return (
    <section className="hero-section-container" id="home-section">
      <div className="hero">
        {/* text content */}
        <div className="textContent">
          <div className="headline">
            <h1>
              Simplify Your Job Search with <br /> <span> Our Tracker</span>
            </h1>
          </div>
          <div className="call-to-action">
            <p>
              Stay organized and on top of your job applications with our
              intuitive tracker. Manage deadlines, schedule interviews, and
              receive timely reminders to ensure you never miss an opportunity
            </p>
          </div>
          <div className="hero-section-btn">
            <Link to="/auth/signup">
              <button className="get-started-btn">
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front text">Get Started! - It's 100% Free!</span>
              </button>
            </Link>
          </div>
        </div>
        <div>
          <img src={rectsmall} alt="rectangle" className="hero-rect1" />
          <img src={rectsmall} alt="rectangle" className="hero-rect2" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
