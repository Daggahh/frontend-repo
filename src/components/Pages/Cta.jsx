import React from "react";
import "../../styles/Cta.css";
import { Link } from "react-router-dom";

const Cta = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-left">
          <div className="cta-left-wrap">
            <div className="cta-text">
              <h3>Try it now</h3>
            </div>

            <div className="cta-subtext">
              <h2>
                Ready to level up your <br /> job application process?
              </h2>
            </div>
          </div>
        </div>

        <div className="cta-right flex items-center justify-center">
          <div className="cta-section-btn">
            <Link to="/auth/signup">
              <button className="get-started-btn">Get Started Now</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
