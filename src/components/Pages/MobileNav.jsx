import React, { useEffect, useRef, useState } from "react";
import "../../styles/MobileNav.css";
import { Link } from "react-router-dom";
import gsap from "gsap";

const MobileNav = ({ toggle }) => {
  const [dropdown, setDropDown] = useState(false);
  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (toggle) {
      gsap.fromTo(
        navRef.current,
        { y: "-100%" },
        { y: "0%", duration: 0.5, ease: "power2.out" }
      );
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(navRef.current, { y: "-100%", duration: 0.5, ease: "power2.in" });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [toggle]);

  const handleDrop = () => {
    setDropDown((prev) => !prev);
  };

  useEffect(() => {
    if (dropdown) {
      gsap.to(dropdownRef.current, {
        opacity: 1,
        height: "auto",
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(dropdownRef.current, {
        opacity: "0",
        duration: 0.4,
        height: 0,
        ease: "power2.in",
      });
    }
  }),
    [dropdown];

  return (
    <div
      ref={overlayRef}
      className={`w-nav-overlay ${
        toggle ? "max-[991px]:h-[9981.7px]" : "hidden"
      }`}
      data-wf-ignore=""
      id="w-nav-overlay-0"
    >
      <nav
        ref={navRef}
        role="navigation"
        className="n-navbar-megamenu_menu w-nav-menu"
        style={{ transform: "translateY(-100%)" }} // Ensure it starts hidden
        data-nav-menu-open=""
      >
        <div className="uui-navbar_menu-right">
          <div className="navbar-megamenu_button-wrapper">
            <Link
              to="/auth/signin"
              className="button-secondary-gray show-tablet max-w-full inline-block"
            >
              <div>Log in</div>
            </Link>
          </div>
        </div>
        <div className="navbar-megamenu_menu-left">
          <a
            href="/tools/resume-builder"
            className="navbar-link-megamenu w-nav-link w--nav-link-open"
          >
            AI Resume Builder
          </a>
          <a
            href="/"
            className="navbar-link-megamenu w-nav-link w--nav-link-open"
          >
            Job Application Tracker
          </a>
          <Link
            to="/pricing"
            className="navbar-link-megamenu w-nav-link w--nav-link-open"
          >
            Pricing
          </Link>
          <div
            data-hover="true"
            data-delay="300"
            data-w-id="a13ce6ee-ae2f-565a-431b-7fc261fc2778"
            className="navbar-megamenu_menu-dropdown w-dropdown w--nav-dropdown-open"
            onClick={handleDrop}
          >
            <div
              className="navbar-megamenu_dropdown-toggle w-dropdown-toggle w--nav-dropdown-toggle-open"
              id="w-dropdown-toggle-0"
              aria-controls="w-dropdown-list-0"
              aria-haspopup="menu"
              aria-expanded={dropdown}
              role="button"
              tabIndex="0"
            >
              <div
                className={`uui-dropdown-icon w-embed transition-transform duration-300 ${
                  dropdown ? "rotate-180" : "rotate-0"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <a href="#" className="navbar-dropdown-link">
                Tools
              </a>
            </div>
            <nav
              ref={dropdownRef}
              className={`uui-navbar_dropdown-list w-dropdown-list ${
                dropdown ? "w--open" : ""
              }`}
              id="w-dropdown-list-0"
              aria-labelledby="w-dropdown-toggle-0"
              style={{ height: "0px", opacity: "0", width: "927px" }}
            >
              <div className="navbar-megamenu_container">
                <div className="uui-navbar_dropdown-content">
                  <div className="navbar-megamenu_dropdown-content-left">
                    <div className="navbar-megamenu_dropdown-link-list-more">
                      <div
                        className="navbar-megamenu_dropdown-link w-inline-block"
                        tabIndex="0"
                      >
                        <div className="navbar-megamenu_icon-wrapper">
                          <div className="icon-featured-large">
                            <div className="uui-icon-1x1-xsmall w-embed">
                              <svg
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M17 19.5H31V14.5H17V19.5Z"
                                  fill="#2427AB"
                                ></path>
                                <path
                                  d="M31 26.5H17V21.5H31V26.5Z"
                                  fill="#2427AB"
                                ></path>
                                <path
                                  d="M17 33.5H31V28.5H17V33.5Z"
                                  fill="#2427AB"
                                ></path>
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M16.5 6C12.3579 6 9 9.35787 9 13.5V34.5C9 38.6421 12.3579 42 16.5 42H31.5C35.6421 42 39 38.6421 39 34.5V13.5C39 9.35786 35.6421 6 31.5 6H16.5ZM14 13.5C14 12.1193 15.1193 11 16.5 11H31.5C32.8807 11 34 12.1193 34 13.5V34.5C34 35.8807 32.8807 37 31.5 37H16.5C15.1193 37 14 35.8807 14 34.5V13.5Z"
                                  fill="#2427AB"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="navbar-megamenu_item-right">
                          <div className="navbar-megamenu_item-heading">
                            AI Resume Builder
                          </div>
                          <div className="navbar-text-size-small">
                            Make your resume stand out by quickly customizing it
                            to each application and applying to more jobs.
                          </div>
                        </div>
                      </div>
                      <div
                        className="navbar-megamenu_dropdown-link w-inline-block"
                        tabIndex="0"
                      >
                        <div className="navbar-megamenu_icon-wrapper">
                          <div className="icon-featured-large">
                            <div className="uui-icon-1x1-xsmall w-embed">
                              <svg
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.6406 33.0695L17.8817 26.8284C19.4438 25.2663 19.4438 22.7337 17.8817 21.1716L11.6406 14.9305C9.68796 12.9778 6.52214 12.9778 4.56952 14.9305L13.6391 24L4.56952 33.0695C6.52214 35.0222 9.68797 35.0222 11.6406 33.0695Z"
                                  fill="#005149"
                                ></path>
                                <path
                                  d="M29.7071 26.8284L23.466 33.0695C21.5133 35.0222 18.3475 35.0222 16.3949 33.0695L25.4644 24L16.3949 14.9305C18.3475 12.9778 21.5133 12.9778 23.466 14.9305L29.7071 21.1716C31.2692 22.7337 31.2692 25.2663 29.7071 26.8284Z"
                                  fill="#005149"
                                ></path>
                                <path
                                  d="M41.7071 26.8284L35.466 33.0695C33.5133 35.0222 30.3475 35.0222 28.3949 33.0695L37.4644 24L28.3949 14.9305C30.3475 12.9778 33.5133 12.9778 35.466 14.9305L41.7071 21.1716C43.2692 22.7337 43.2692 25.2663 41.7071 26.8284Z"
                                  fill="#005149"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="navbar-megamenu_item-right">
                          <div className="navbar-megamenu_item-heading">
                            Job Application Tracker
                          </div>
                          <div className="navbar-text-size-small">
                            Keep track of your job applications and manage your
                            full job search, all in one place.
                          </div>
                        </div>
                      </div>
                      <div
                        className="navbar-megamenu_dropdown-link w-inline-block"
                        tabIndex="0"
                      >
                        <div className="navbar-megamenu_icon-wrapper">
                          <div className="icon-featured-large">
                            <div className="uui-icon-1x1-xsmall w-embed">
                              <svg
                                width="72"
                                height="73"
                                viewBox="0 0 72 73"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M61 0.5C63.2091 0.5 65 2.29086 65 4.5V7.5H68C70.2091 7.5 72 9.29086 72 11.5C72 13.7091 70.2091 15.5 68 15.5H65V18.5C65 20.7091 63.2091 22.5 61 22.5C58.7909 22.5 57 20.7091 57 18.5V15.5H54C51.7909 15.5 50 13.7091 50 11.5C50 9.29086 51.7909 7.5 54 7.5H57V4.5C57 2.29086 58.7909 0.5 61 0.5ZM11.402 56.0147C9.83992 57.5768 9.83991 60.1095 11.402 61.6716C12.9641 63.2337 15.4968 63.2337 17.0589 61.6716L36.2868 42.4436L30.6299 36.7868L11.402 56.0147ZM45.7868 32.9436L41.9436 36.7868L36.2868 31.1299L40.1299 27.2868C41.692 25.7247 44.2247 25.7247 45.7868 27.2868C47.3489 28.8489 47.3489 31.3815 45.7868 32.9436ZM52.8579 40.0147L24.1299 68.7426C18.6626 74.21 9.79828 74.21 4.33094 68.7426C-1.1364 63.2753 -1.1364 54.411 4.33094 48.9437L33.0589 20.2157C38.5262 14.7484 47.3905 14.7484 52.8579 20.2157C58.3252 25.6831 58.3252 34.5474 52.8579 40.0147ZM65 41.5C65 39.2909 63.2091 37.5 61 37.5C58.7909 37.5 57 39.2909 57 41.5V44.5H54C51.7909 44.5 50 46.2909 50 48.5C50 50.7091 51.7909 52.5 54 52.5H57V55.5C57 57.7091 58.7909 59.5 61 59.5C63.2091 59.5 65 57.7091 65 55.5V52.5H68C70.2091 52.5 72 50.7091 72 48.5C72 46.2909 70.2091 44.5 68 44.5H65V41.5ZM30 10.5C32.7614 10.5 35 8.26142 35 5.5C35 2.73858 32.7614 0.5 30 0.5C27.2386 0.5 25 2.73858 25 5.5C25 8.26142 27.2386 10.5 30 10.5Z"
                                  fill="#005149"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="navbar-megamenu_item-right">
                          <div className="navbar-megamenu_item-heading">
                            Resume Bullet Point Generator
                          </div>
                          <div className="navbar-text-size-small">
                            Generate metric-focused resume bullet points that
                            highlight your biggest career achievements.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="navbar-megamenu_dropdown-link-list-more">
                      <div
                        className="navbar-megamenu_dropdown-link w-inline-block"
                        tabIndex="0"
                      >
                        <div className="navbar-megamenu_icon-wrapper">
                          <div className="icon-featured-large">
                            <div className="uui-icon-1x1-xsmall w-embed">
                              <svg
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M27.25 14H25.25C22.4886 14 20.25 16.2386 20.25 19V21C20.25 22.2245 20.6902 23.3463 21.421 24.2156C19.9702 25.0908 19 26.6821 19 28.5V33H23V28.5C23 27.9477 23.4477 27.5 24 27.5H28.5C29.0523 27.5 29.5 27.9477 29.5 28.5V33H33.5V28.5C33.5 26.6821 32.5298 25.0908 31.079 24.2156C31.8098 23.3463 32.25 22.2245 32.25 21V19C32.25 16.2386 30.0114 14 27.25 14ZM28.25 21V19C28.25 18.4477 27.8023 18 27.25 18H25.25C24.6977 18 24.25 18.4477 24.25 19V21C24.25 21.5523 24.6977 22 25.25 22H27.25C27.8023 22 28.25 21.5523 28.25 21Z"
                                  fill="#F5B501"
                                ></path>
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M19 6C14.8579 6 11.5 9.35787 11.5 13.5V14.5H7V19.5H11.5V21.5H7V26.5H11.5V28.5H7V33.5H11.5V34.5C11.5 38.6421 14.8579 42 19 42H33.5C37.6421 42 41 38.6421 41 34.5V13.5C41 9.35786 37.6421 6 33.5 6H19ZM16.5 13.5C16.5 12.1193 17.6193 11 19 11H33.5C34.8807 11 36 12.1193 36 13.5V34.5C36 35.8807 34.8807 37 33.5 37H19C17.6193 37 16.5 35.8807 16.5 34.5V13.5Z"
                                  fill="#F5B501"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="navbar-megamenu_item-right">
                          <div className="navbar-megamenu_item-heading">
                            Cover Letter Generator
                          </div>
                          <div className="navbar-text-size-small">
                            Accelerate your job search with Teal's AI-powered
                            Cover Letter Generator, write a tailored cover
                            letter in seconds.
                          </div>
                        </div>
                      </div>
                      <div
                        className="navbar-megamenu_dropdown-link w-inline-block"
                        tabIndex="0"
                      >
                        <div className="navbar-megamenu_icon-wrapper">
                          <div className="icon-featured-large">
                            <div className="uui-icon-1x1-xsmall is-small w-embed">
                              <svg
                                width="72"
                                height="73"
                                viewBox="0 0 72 73"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M61 0.5C63.2091 0.5 65 2.29086 65 4.5V7.5H68C70.2091 7.5 72 9.29086 72 11.5C72 13.7091 70.2091 15.5 68 15.5H65V18.5C65 20.7091 63.2091 22.5 61 22.5C58.7909 22.5 57 20.7091 57 18.5V15.5H54C51.7909 15.5 50 13.7091 50 11.5C50 9.29086 51.7909 7.5 54 7.5H57V4.5C57 2.29086 58.7909 0.5 61 0.5ZM11.402 56.0147C9.83992 57.5768 9.83991 60.1095 11.402 61.6716C12.9641 63.2337 15.4968 63.2337 17.0589 61.6716L36.2868 42.4436L30.6299 36.7868L11.402 56.0147ZM45.7868 32.9436L41.9436 36.7868L36.2868 31.1299L40.1299 27.2868C41.692 25.7247 44.2247 25.7247 45.7868 27.2868C47.3489 28.8489 47.3489 31.3815 45.7868 32.9436ZM52.8579 40.0147L24.1299 68.7426C18.6626 74.21 9.79828 74.21 4.33094 68.7426C-1.1364 63.2753 -1.1364 54.411 4.33094 48.9437L33.0589 20.2157C38.5262 14.7484 47.3905 14.7484 52.8579 20.2157C58.3252 25.6831 58.3252 34.5474 52.8579 40.0147ZM65 41.5C65 39.2909 63.2091 37.5 61 37.5C58.7909 37.5 57 39.2909 57 41.5V44.5H54C51.7909 44.5 50 46.2909 50 48.5C50 50.7091 51.7909 52.5 54 52.5H57V55.5C57 57.7091 58.7909 59.5 61 59.5C63.2091 59.5 65 57.7091 65 55.5V52.5H68C70.2091 52.5 72 50.7091 72 48.5C72 46.2909 70.2091 44.5 68 44.5H65V41.5ZM30 10.5C32.7614 10.5 35 8.26142 35 5.5C35 2.73858 32.7614 0.5 30 0.5C27.2386 0.5 25 2.73858 25 5.5C25 8.26142 27.2386 10.5 30 10.5Z"
                                  fill="#005149"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="navbar-megamenu_item-right">
                          <div className="navbar-megamenu_item-heading">
                            Resume Summary Generator
                          </div>
                          <div className="navbar-text-size-small">
                            Take your current resume to the next level and
                            generate a tailored, attention-grabbing summary that
                            makes an impact.
                          </div>
                        </div>
                      </div>
                      <a
                        href="/tools"
                        className="navbar-megamenu_dropdown-link w-inline-block"
                        tabIndex="0"
                      >
                        <div className="navbar-megamenu_icon-wrapper">
                          <div className="icon-featured-large">
                            <div className="uui-icon-1x1-xsmall is-small w-embed">
                              <svg
                                width="60"
                                height="61"
                                viewBox="0 0 60 61"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0 7.5C0 3.63401 3.13401 0.5 7 0.5C10.866 0.5 14 3.63401 14 7.5C14 11.366 10.866 14.5 7 14.5C3.13401 14.5 0 11.366 0 7.5Z"
                                  fill="#2427AB"
                                ></path>
                                <path
                                  d="M0 30.5C0 26.634 3.13401 23.5 7 23.5C10.866 23.5 14 26.634 14 30.5C14 34.366 10.866 37.5 7 37.5C3.13401 37.5 0 34.366 0 30.5Z"
                                  fill="#2427AB"
                                ></path>
                                <path
                                  d="M7 46.5C3.13401 46.5 0 49.634 0 53.5C0 57.366 3.13401 60.5 7 60.5C10.866 60.5 14 57.366 14 53.5C14 49.634 10.866 46.5 7 46.5Z"
                                  fill="#2427AB"
                                ></path>
                                <path
                                  d="M23 7.5C23 3.63401 26.134 0.5 30 0.5C33.866 0.5 37 3.63401 37 7.5C37 11.366 33.866 14.5 30 14.5C26.134 14.5 23 11.366 23 7.5Z"
                                  fill="#2427AB"
                                ></path>
                                <path
                                  d="M30 23.5C26.134 23.5 23 26.634 23 30.5C23 34.366 26.134 37.5 30 37.5C33.866 37.5 37 34.366 37 30.5C37 26.634 33.866 23.5 30 23.5Z"
                                  fill="#2427AB"
                                ></path>
                                <path
                                  d="M23 53.5C23 49.634 26.134 46.5 30 46.5C33.866 46.5 37 49.634 37 53.5C37 57.366 33.866 60.5 30 60.5C26.134 60.5 23 57.366 23 53.5Z"
                                  fill="#2427AB"
                                ></path>
                                <path
                                  d="M53 0.5C49.134 0.5 46 3.63401 46 7.5C46 11.366 49.134 14.5 53 14.5C56.866 14.5 60 11.366 60 7.5C60 3.63401 56.866 0.5 53 0.5Z"
                                  fill="#2427AB"
                                ></path>
                                <path
                                  d="M46 30.5C46 26.634 49.134 23.5 53 23.5C56.866 23.5 60 26.634 60 30.5C60 34.366 56.866 37.5 53 37.5C49.134 37.5 46 34.366 46 30.5Z"
                                  fill="#2427AB"
                                ></path>
                                <path
                                  d="M53 46.5C49.134 46.5 46 49.634 46 53.5C46 57.366 49.134 60.5 53 60.5C56.866 60.5 60 57.366 60 53.5C60 49.634 56.866 46.5 53 46.5Z"
                                  fill="#2427AB"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="navbar-megamenu_item-right">
                          <div className="navbar-megamenu_item-heading">
                            See All Tools --&gt;
                          </div>
                          <div className="navbar-text-size-small">
                            Explore Teal's full suite of tools.
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
