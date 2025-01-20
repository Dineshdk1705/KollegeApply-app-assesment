import React from "react";
import BasicNewsCard from "./BasicNewsCard";

const FeaturedNews = () => {
  return (
    <div className="w-full space-y-4 h-auto xl:h-[180px] border-[1px] border-[#E3960082] bg-[#FFFDF9] rounded-lg p-6">
      <h3 className="flex justify-between items-center text-[#E0AD4C] font-bold text-xl italic">
        FEATURED NEWS
        <span className="">
          <img src="/icons/arrow3.svg" alt="poster" />
        </span>
      </h3>
      <ul className="flex flex-wrap xl:flex-nowrap justify-start sm:gap-6 gap-4">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <li key={index} className="w-full sm:w-auto">
              <BasicNewsCard
                title="What is the latest program that you are offering in your institute..."
                description="Lucknow Public College of Professional Studies..."
                created_at={"23 Dec 2020"}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FeaturedNews;
