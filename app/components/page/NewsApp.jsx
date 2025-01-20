"use client";

import { useState, useEffect, useMemo } from "react";
import "tailwindcss/tailwind.css";
import HomePage from "./HomePage";
import Link from "next/link";
import SmallGridNewsCard from "../shared/SmallGridNewsCard";

export default function NewsApp({ searchquery }) {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All News");

  useEffect(() => {
    async function fetchNews() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/news");
        const data = await res.json();
        setNewsData(data);
      } catch (err) {
        console.log("error while fetching news: ", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNews();
  }, []);

  const filteredNews = useMemo(() => {
    return newsData.filter((news) => {
      const matchesCategory =
        selectedCategory === "All News" || news.category === selectedCategory;
      const matchesSearch = news.title
        .toLowerCase()
        .includes(searchquery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [newsData, searchquery, selectedCategory]);

  return (
    <div className="w-full bg-[#faf9ff]">
      <HomePage searchQuery={searchquery} />
      <div className="min-h-screen flex flex-col items-center bg-[#F5F3FF] border-[1px] border-[#DCD4FF] py-4 px-2 sm:px-4 md:px-8">
        {/* Tab Filters */}
        <div className="w-full max-w-[740px] h-[62px] rounded-2xl bg-white flex flex-wrap justify-center shadow-sm space-x-2 md:space-x-8 mt-4 sm:mt-6 md:mt-10 px-4 border-x-[0.5px] border-t-[0.5px] border-[#DCD4FF]">
          {["All News", "College news", "Exam news", "Admission 2025"].map(
            (category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`border-b-2 px-2 ${
                  selectedCategory === category
                    ? "font-bold border-[#40347D] text-[#40347D]"
                    : "font-medium text-[#464646] border-white"
                }`}
              >
                <h5 className="text-sm sm:text-base md:text-lg">{category}</h5>
              </button>
            )
          )}
        </div>
        <ul className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredNews.map((news, index) => {
            return (
              <li key={news.id}>
                <Link href={`${news.id}`}>
                  <SmallGridNewsCard key={index} news={news} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
