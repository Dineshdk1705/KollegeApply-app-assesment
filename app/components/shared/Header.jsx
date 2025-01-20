"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Header = ({ searchQuery, handleInputSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevSearchLength, setPrevSearchLength] = useState(0);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (searchQuery.length > prevSearchLength) {
      setIsMenuOpen(false);
    }
    setPrevSearchLength(searchQuery.length);
  }, [searchQuery, prevSearchLength]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      ref={menuRef}
      className="w-full h-auto lg:h-[69px] py-4 flex flex-wrap lg:flex-nowrap justify-between relative bg-white"
    >
      <div className="flex items-center gap-12 w-full sm:w-auto justify-between sm:mr-8">
        <Link href={"/"} className="w-[98px] h-6">
          <img src="/images/company_logo.svg" alt="logo" />
        </Link>
        <button
          className="block sm:hidden text-[#3A3A3A] focus:outline-none h-5 w-5"
          onClick={toggleMenu}
        >
          <img
            src={`/icons/${isMenuOpen ? "close" : "menu"}.svg`}
            alt="menu icon"
          />
        </button>
        {/* Desktop Nav */}
        <nav className="hidden sm:block">
          <ul className="flex flex-wrap justify-start gap-6 sm:flex-nowrap">
            {["University", "Colleges", "Exams", "Courses", "News"].map(
              (title, index) => (
                <li
                  key={index}
                  className="flex max-w-[87px] text-[#3A3A3A] justify-center items-center"
                >
                  <h5 className="font-medium text-sm">{title}</h5>
                  <div className="ml-2 flex items-center justify-center mt-1">
                    <img src="/icons/arrow.svg" alt="icons" />
                  </div>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>

      <div className="w-full sm:w-[334px] h-[45px] flex rounded-md sm:ml-4 mt-4 sm:mt-0">
        <div className="w-[13.33px] h-[13.33px] my-auto">
          <img src="/icons/search2.svg" alt="icon" />
        </div>
        <input
          type="text"
          placeholder="Search for Colleges, Exams, Courses & more..."
          value={searchQuery}
          onChange={handleInputSearch}
          className="w-full px-2 focus:outline-none text-sm font-normal"
        />
      </div>

      {/* Mobile Navbar */}
      {isMenuOpen && (
        <nav className="absolute top-full left-0 w-full bg-white shadow-md z-10">
          <ul className="flex flex-col gap-4 py-4 px-6">
            {["University", "Colleges", "Exams", "Courses", "News"].map(
              (title, index) => (
                <li
                  key={index}
                  className="flex text-[#3A3A3A] justify-start items-center"
                >
                  <h5 className="font-medium text-sm">{title}</h5>
                  <div className="ml-2 flex items-center justify-center mt-1">
                    <img src="/icons/arrow.svg" alt="icons" />
                  </div>
                </li>
              )
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
