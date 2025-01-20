import React from "react";

const BasicNewsCard = ({ title, description, created_at }) => {
  return (
    <div className="w-[284px] flex flex-col">
      <h3 className="text-sm text-[#1A1A1A] font-medium">{title}</h3>
      <h2 className="text-xs text-[#1A1A1A] text-[#090920B2] text-opacity-70 mb-3">
        {description}
      </h2>

      <h2 className="text-[#B4B7C1] text-[13px]">⏱️ {created_at}</h2>
    </div>
  );
};

export default BasicNewsCard;
