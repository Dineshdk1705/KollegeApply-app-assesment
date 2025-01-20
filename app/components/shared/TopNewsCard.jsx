import React from "react";

const TopNewsCard = ({ news }) => {
  const { title, description, img_url } = news;
  return (
    <div className="py-3 last:pb-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-5">
        <div className="w-full sm:w-[140px] flex-shrink-0">
          <img
            src={img_url}
            className="w-full sm:w-[140px] h-[120px] object-cover"
            alt="poster"
          />
        </div>

        <div className="w-full sm:w-[245px] flex flex-col">
          <h3 className="text-sm text-[#1A1A1A] font-medium line-clamp-2">
            {title}
          </h3>
          <h2 className="text-xs text-[#090920B2] text-opacity-70 mb-3 line-clamp-3">
            {description}
          </h2>
          <h2 className="text-[#B4B7C1] text-[13px]">⏱️ 27 Dec 2020</h2>
        </div>
      </div>
    </div>
  );
};

export default TopNewsCard;
