import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { GiPlatform } from "react-icons/gi";
import { RiTimeLine } from "react-icons/ri";
import {
  MdDateRange,
  MdNotificationsActive,
  MdOutlineInsights,
} from "react-icons/md";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../styles/Features.css";

function FeatureItem({ icon, header, subtext, className }) {
  return (
    <div className={`feature-item ${className}`}>
      <div className="features-card ">
        <div className="mobile-ft-card">
          <div className="features-icon">{icon}</div>
          <div className="features-text">
            <h1>{header}</h1>
          </div>
        </div>
        <div className="features-icon">{icon}</div>
        <div className="features-text">
          <h1>{header}</h1>
          <p>{subtext}</p>
        </div>
      </div>
    </div>
  );
}

function Features() {
  const sectionRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = section.querySelectorAll(".features-card");
    gsap.fromTo(
      cards,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: "power2.out",
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );
  }, []);

  const featureData = [
    {
      icon: <GiPlatform />,
      header: "Dashboard Overview",
      subtext:
        "A clean and concise dashboard that gives a summary of all active applications. Key metrics such as the number of applications submitted, interviews scheduled, and offers received.",
    },
    {
      icon: <RiTimeLine />,
      header: "Keep Track of Deadlines",
      subtext:
        "Set and view deadlines for application submissions and follow-ups. Visual timelines or calendars to track upcoming deadlines.",
    },
    {
      icon: <MdDateRange />,
      header: "Organize Your Interviews",
      subtext:
        "Schedule interviews with date, time, and location or platform details. Sync with personal calendars for seamless integration.",
    },
    {
      icon: <MdNotificationsActive />,
      header: "Set Custom Reminders and Notifications",
      subtext:
        "Set reminders for important dates and tasks. Receive notifications via email or in-app alerts for upcoming deadlines and interview.",
    },
    {
      icon: <MdOutlineInsights />,
      header: "Visualize Your Job Hunt",
      subtext:
        "Gain insights into your job applications with our easy-to-understand visual analytics.",
    },
  ];

  return (
    <section className="features-main-section !shadow-xl" ref={sectionRef}>
      <div className="features-container">
        <div className="features-main-text">
          <div style={{ position: "relative" }}>
            <h1>
              Simplify your job hunt with
              <span className="text-colour">JobJott's tracking tools.</span>
            </h1>
          </div>
        </div>

        <div className="features-details">
          {featureData.slice(0, 3).map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              header={feature.header}
              subtext={feature.subtext}
              className={`feature-item-${index + 1}`}
            />
          ))}
          <div className="flex-container">
            {featureData.slice(3).map((feature, index) => (
              <FeatureItem
                key={index + 3}
                icon={feature.icon}
                header={feature.header}
                subtext={feature.subtext}
                className={`feature-item-${index + 4}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
