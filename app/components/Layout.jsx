"use client";

import React, { useState } from "react";
import Header from "./shared/Header";

export default function Layout({ children }) {
  const [searchquery, setSearchQuery] = useState("");

  const handleInputSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="w-full">
      <div className="flex font-sans justify-between items-center px-4 sm:px-24 shadow-lg shadow-gray-100 bg-white z-20 relative">
        <Header
          searchQuery={searchquery}
          handleInputSearch={handleInputSearch}
        />
      </div>
      <main className="w-full">
        {React.cloneElement(children, { searchquery })}
      </main>
    </div>
  );
}
