import React, { useState, useRef, useEffect } from "react";
import { Button } from "antd";

const MenuDropdown = () => {
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenuDropdown = () => {
    setIsMenuDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsMenuDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="menu-container" ref={dropdownRef}>
      {" "}
      <Button
        type="button"
        className={`filter-btn filter-btn-default filter-btn-sm filter-dropdown-trigger ${
          isMenuDropdownOpen ? "filter-dropdown-open" : ""
        }`}
        onClick={toggleMenuDropdown}
      >
        <span role="img" aria-label="menu" className="menuicon menuicon-menu">
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="menu"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
          </svg>
        </span>
        <span>Menu</span>
      </Button>
      {isMenuDropdownOpen && (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
          {" "}
          <div>
            <div
              className="filter-dropdown filter-dropdown-placement-bottomLeft"
              style={{ minWidth: "94.6562px", left: "0px", top: "35px" }}
            >
              <ul
                className="filter-dropdown-menu filter-dropdown-menu-root filter-dropdown-menu-vertical filter-dropdown-menu-light"
                role="menu"
                tabIndex="0"
                data-menu-list="true"
              >
                <li
                  className="filter-dropdown-menu-item"
                  role="menuitem"
                  tabIndex="-1"
                  data-menu-id="tour-item"
                >
                  <span
                    role="img"
                    aria-label="info-circle"
                    className="dropdown-menuicon dropdown-menuicon-info-circle filter-dropdown-menu-item-icon"
                  >
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="info-circle"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                      <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                    </svg>
                  </span>
                  <span className="filter-dropdown-menu-title-content">
                    Quick Tour
                  </span>
                </li>
                <li
                  className="filter-dropdown-menu-item"
                  role="menuitem"
                  tabIndex="-1"
                  data-menu-id="archived-jobs"
                >
                  <span
                    role="img"
                    aria-label="inbox"
                    className="dropdown-menuicon dropdown-menuicon-inbox filter-dropdown-menu-item-icon"
                  >
                    <svg
                      viewBox="0 0 1024 1024"
                      focusable="false"
                      data-icon="inbox"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M885.2 446.3l-.2-.8-112.2-285.1c-5-16.1-19.9-27.2-36.8-27.2H281.2c-17 0-32.1 11.3-36.9 27.6L139.4 443l-.3.7-.2.8c-1.3 4.9-1.7 9.9-1 14.8-.1 1.6-.2 3.2-.2 4.8V830a60.9 60.9 0 0060.8 60.8h627.2c33.5 0 60.8-27.3 60.9-60.8V464.1c0-1.3 0-2.6-.1-3.7.4-4.9 0-9.6-1.3-14.1zm-295.8-43l-.3 15.7c-.8 44.9-31.8 75.1-77.1 75.1-22.1 0-41.1-7.1-54.8-20.6S436 441.2 435.6 419l-.3-15.7H229.5L309 210h399.2l81.7 193.3H589.4zm-375 76.8h157.3c24.3 57.1 76 90.8 140.4 90.8 33.7 0 65-9.4 90.3-27.2 22.2-15.6 39.5-37.4 50.7-63.6h156.5V814H214.4V480.1z"></path>
                    </svg>
                  </span>
                  <span className="filter-dropdown-menu-title-content">
                    <a
                      className="no-underline"
                      href="/job-tracker/archived-jobs"
                    >
                      Archived Jobs
                    </a>
                  </span>
                </li>
              </ul>
              <div aria-hidden="true" style={{ display: "none" }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
