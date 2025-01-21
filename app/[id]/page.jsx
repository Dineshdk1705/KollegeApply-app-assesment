"use client";

import { useParams } from "next/navigation";
import TopNewsCard from "../components/shared/TopNewsCard";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import newsDemo from "../../data/newsDemo.json";
import Skeleton from "react-loading-skeleton";

export default function DynamicDetailsPage() {
  const { id } = useParams();
  const [newsByIdData, setNewsByIdData] = useState(null);

  useEffect(() => {
    async function fetchNewsById() {
      try {
        const res = await fetch("/api/news");
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }
        const data = await res.json();

        if (Array.isArray(data)) {
          const filteredData = data.find(
            (news) => String(news.id) === String(id)
          );

          if (filteredData) {
            setNewsByIdData(filteredData);
          } else {
            console.warn("No news found with this ID");
          }
        } else {
          console.error("Invalid API response structure");
        }
      } catch (err) {
        console.log("Error fetching news:", err);
      }
    }
    if (id) fetchNewsById();
  }, [id]);

  if (!newsByIdData) {
    return (
      <Layout>
        <div className="w-full h-screen flex gap-5 px-24 py-10">
          <div className="w-full">
            <Skeleton count={1} height={600} />
          </div>
          <div className="w-1/2">
            <Skeleton count={1} height={600} />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full h-auto px-4 sm:px-24 py-10 font-sans bg-[#faf9ff]">
        <h3 className="text-[#A7B2C0] text-sm mb-5">
          News Listing Page
          <span className="text-[#40347D] font-semibold">
            <span className="text-[#A7B2C0] mx-1">{" > "}</span>Individual News
          </span>
        </h3>

        <div className="flex flex-wrap sm:flex-nowrap justify-between gap-6">
          <div className="w-[785px] h-auto py-2 shadow-md rounded-lg bg-white">
            <div className="w-full h-[446px] py-5">
              <img
                src={newsByIdData?.img_url}
                alt="poster"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h2 className="text-3xl font-bold mb-1">{newsByIdData?.title}</h2>
              <p className="text-sm text-[#8F81CE] mb-5">
                {newsByIdData?.created_at}, 8:00pm
              </p>
              <p className="text-base font-normal">
                {newsByIdData?.description}
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full sm:w-[250px] md:w-[300px] lg:w-[400px] xl:w-[437px] py-2">
            <button className="w-full h-12 mb-4 rounded-[6px] bg-[#40347C] text-white text-base font-semibold">
              Apply Now
            </button>
            <button className="w-full h-12 mb-8 rounded-[6px] border-[1px] border-[#D3CCF5] bg-gradient-to-br from-[#FFFFFF] to-[#F1EEFE] text-[#40347C] text-base font-semibold">
              Download Brochure
            </button>

            {/* Advertisement Banners */}
            <section className="flex justify-center mb-4 items-center w-full h-[106px] bg-[#DDC3FFCC] text-white text-center rounded-xl">
              <h2 className="text-sm">ADVERTISEMENT BANNER</h2>
            </section>

            <section className="flex justify-center mb-4 items-center w-full h-[106px] bg-[#96d7ffe0] text-white text-center rounded-xl">
              <h2 className="text-sm">ADVERTISEMENT BANNER</h2>
            </section>

            <section className="flex justify-center mb-8 items-center w-full h-[106px] bg-[#FFED91] text-white text-center rounded-xl">
              <h2 className="text-sm">ADVERTISEMENT BANNER</h2>
            </section>

            <div className="w-full md:w-[300px] lg:w-[400px] xl:w-[437px] shadow-md bg-white rounded-lg p-[14px]">
              <h3 className="text-[#40347D] font-bold text-xl italic">NEWS</h3>
              <ul>
                {newsDemo.map((news, index) => (
                  <li key={index}>
                    <TopNewsCard news={news} />
                    {index !== 2 && (
                      <div className="bg-gray-200 h-[2px] w-full rounded-lg"></div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
