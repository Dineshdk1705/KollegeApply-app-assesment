"use client";

import React, { useState, useEffect, useMemo } from "react";
import TopNewsCard from "../shared/TopNewsCard";
import FeaturedNews from "../shared/FeaturedNews";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomePage = ({ searchQuery }) => {
  const [storiesNewsData, setStoriesNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All News");

  useEffect(() => {
    const fetchStoriesNews = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/bigStoriesNews");
        const storiesNews = await res.json();
        setStoriesNewsData(storiesNews);
      } catch (err) {
        console.log("error while fetching news:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStoriesNews();
  }, []);

  const filteredStoriesNews = useMemo(() => {
    return storiesNewsData.filter((news) => {
      const matchesCategory =
        selectedCategory === "All News" || news.category === selectedCategory;
      const matchSearchQuery = news.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchSearchQuery && matchesCategory;
    });
  }, [selectedCategory, storiesNewsData, searchQuery]);

  return (
    <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-8">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 mb-10 sm:mb-8">
        {/* Trending News */}
        <div className="w-full md:w-[579px] flex items-center justify-between border-[0.5px] border-[#40347D5C] border-opacity-5 rounded-lg px-4 py-2 bg-[#F2EFFF]">
          <h4 className="text-xs">
            <span className="font-semibold">⚡️ Trending Now:</span>
            <span> CBSE Class 12 Physics Question Paper 2024 Set 3</span>
          </h4>
          <button className="text-[11px] font-semibold flex items-center">
            Check Now
            <img src="/icons/arrow2.svg" alt="icon" className="ml-1 w-3 h-3" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="w-full  h-[28px] md:w-[455px] flex flex-wrap lg:justify-start justify-center gap-2">
          {[
            "All News",
            "Admission Alert",
            "College news",
            "Exam news",
            "Latest News",
          ].map((category) => (
            <button
              key={category}
              className={`h-full px-2 py-1 font-medium text-[11px] border-[1px] border-[#E6E6E6] rounded-lg ${
                category === selectedCategory
                  ? "text-[#40347D] bg-[#F3F3F3]"
                  : "text-[#3A3A3A] bg-white"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-7 mb-11">
        {/* Left Section */}
        <div className="w-full lg:w-[770px] shadow-md rounded-lg bg-white">
          <div className="w-full h-[240px] md:h-[350px] lg:h-[446px]">
            <img
              src="/images/university.png"
              alt="poster"
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>
          <div className="p-5">
            <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-2">
              Chitkara University MBA Admission Open; <br /> Check Direct
              List...
            </h2>
            <p className="text-xs md:text-sm text-[#8F81CE] mb-5">
              20 Sep 2023, 8:00pm
            </p>
            <p className="text-sm font-normal">
              New Delhi: The State Common Entrance Test Cell, Government of
              Maharashtra, has issued the admit cards for the MArch, MHMCT, BEd,
              MEd, and MPEd Courses on February 27, 2024. To download the
              document...
              <span className="underline font-semibold">READ</span>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[437px] shadow-md bg-white rounded-lg px-4 py-6">
          <h3 className="relative text-[#40347D] font-bold text-xl italic mb-4">
            THE BIG STORIES
            <span className="absolute ml-1">
              <img src="/icons/star.svg" alt="icon" />
            </span>
          </h3>
          <ul className="w-full">
            {isLoading ? (
              <Skeleton count={4} height={150} />
            ) : filteredStoriesNews.length > 0 ? (
              filteredStoriesNews.slice(0, 4).map((news, index) => (
                <li key={index} className="last:mb-0">
                  <TopNewsCard news={news} />
                  {index !== 3 && (
                    <div className="bg-gray-200 h-[2px] w-full rounded-lg my-2"></div>
                  )}
                </li>
              ))
            ) : (
              <p className="text-gray-300 text-center">No news found.</p>
            )}
          </ul>
        </div>
      </div>
      <FeaturedNews />
    </div>
  );
};

export default HomePage;
