import React, { useEffect, useState } from "react";
import Nav from "../../Pages/Nav";
import "../../../styles/AboutUs.css";
import FooterBottom from "../../Pages/FooterBottom";

const AboutUs = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const values = [
    {
      title: "Candidate-Centered Approach",
      description:
        "Your job search is our priority. We design every feature with you in mind—helping you stay organized, manage deadlines, and track applications effortlessly.",
      imgSrc:
        "https://framerusercontent.com/images/l5xqky1zN2WeArHal9Q6DFzdPpU.png",
    },
    {
      title: "Aim for the Moon",
      description:
        "We believe in aiming high. Your career aspirations matter, and we empower you with the tools needed to land your dream job",
      imgSrc:
        "https://framerusercontent.com/images/Rl96SE0RamkVKzy2hBKacyE9IQw.png",
    },
    {
      title: "Efficiency is Key",
      description:
        "Time is valuable in job hunting. Our platform ensures a seamless, fast-tracking experience—helping you apply, schedule interviews, and stay ahead of deadlines with ease.",
      imgSrc:
        "https://framerusercontent.com/images/HBsOOHsI8pBhHSCGjGttTp9pg.png",
    },
    {
      title: "Trust",
      description:
        "Job searching is stressful, but we’ve got your back. We provide a secure and reliable platform to manage your applications with confidence.",
      imgSrc:
        "https://framerusercontent.com/images/gLqG1IkxcW3aEf6ab5GdMMn9lRU.png",
    },
    {
      title: "Transparency",
      description:
        "We believe in openness and clarity. Yala provides transparent financial solutions, ensuring you have a clear picture of your transactions and our processes.",
      imgSrc:
        "https://framerusercontent.com/images/JL4AMYw2MgtFu1w2ns8Rd4FYw0.png",
    },
  ];

  const sections = [
    {
      title: "Job Seekers & Career Changers",
      description:
        "Whether you're a fresh graduate, an experienced professional, or transitioning to a new career, JobJott helps you track applications, manage deadlines, and stay organized throughout your job search.",
    },
    {
      title: "Freelancers & Gig Workers",
      description:
        "Juggling multiple projects? JobJott makes it easy to track applications, follow up with clients, and manage your job pipeline efficiently.",
    },
    {
      title: "Recruiters & Hiring Managers",
      description:
        "Streamline your hiring process by keeping track of applicants, organizing interviews, and managing candidate progress with ease.",
    },
    {
      title: "Students & Interns",
      description:
        "Looking for internships or part-time jobs? JobJott helps students stay on top of their applications, deadlines, and interviews without stress.",
    },
    {
      title: "Remote & International Job Seekers",
      description:
        "Applying for jobs across different time zones? JobJott keeps your search structured, ensuring you never miss an opportunity, no matter where you are.",
    },
  ];

  return (
    <div className="bg-[#F5F9F9]">
      <Nav />

      <div className="jobjot-main-container !block !p-0 !justify-normal bg-[#F5F9F9]">
        <div
          className={`aboutus-component hero-section bg-[#F5F9F9] ${
            isLoaded
              ? "opacity-100 transition-opacity duration-500"
              : "opacity-0"
          } `}
        >
          <section className="u--section">
            <div className="u--container">
              <div className="text--center balance">
                <div className="s--margin-bottom--2rem">
                  <h2>Company Values</h2>
                </div>
                <div className="s--margin-bottom--2rem">
                  <p className="t--text--size-medium">
                    Our shared values unite us, guiding our efforts as one
                    cohesive team.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-6 p-6 values-container">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg p-6 rounded-xl max-w-sm text-center value-cont"
                  >
                    <div className="relative !w-[69px] !h-[69px] mx-auto mb-4 overflow-visible value-flex">
                      <img
                        src={value.imgSrc}
                        alt={value.title}
                        className="w-full h-full object-contain"
                      />
                      <div
                        className="framer-1c45rnv !h-[5px] !w-[69px]"
                        data-framer-name="Ellipse 72"
                        style={{
                          backgroundColor: "rgb(238, 247, 223)",
                          borderRadius: "100%",
                          opacity: "1",
                        }}
                      ></div>
                    </div>
                    <div className="mobile-v-text">
                      <h3 className="text-lg font-semibold text-[#012332]">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 mt-2">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="max-w-3xl mx-auto p-6">
              <h2 className="text-2xl font-bold text-center mb-6">
                Who is JobJott For?
              </h2>
              <div className="space-y-4">
                {sections.map((section, index) => (
                  <Card
                    key={index}
                    className="p-4 shadow-lg rounded-xl bg-white"
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleSection(index)}
                    >
                      <h3 className="text-lg font-semibold">{section.title}</h3>
                      {openIndex === index ? <ChevronUp /> : <ChevronDown />}
                    </div>
                    {openIndex === index && (
                      <p className="mt-2 text-gray-600">
                        {section.description}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            </div> */}
          </section>
        </div>
      </div>

      <FooterBottom />
    </div>
  );
};

export default AboutUs;
