import React from "react";
import BasicNewsCard from "./BasicNewsCard";

const SmallGridNewsCard = ({ news }) => {
  const { title, img_url, description, created_at } = news;

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <div className="w-full h-[350px] sm:w-[300px] md:w-[280px] lg:w-[308px] border-[1px] border-[#ECE8FF] bg-white p-3 rounded-lg flex flex-col gap-5">
      <div className="w-full h-[200px] sm:h-[220px] md:h-[233px] overflow-hidden rounded-md">
        <img
          src={img_url}
          alt="poster"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <BasicNewsCard
          title={truncateText(title, 50)}
          description={truncateText(description, 50)}
          created_at={created_at}
        />
      </div>
    </div>
  );
};

export default SmallGridNewsCard;
