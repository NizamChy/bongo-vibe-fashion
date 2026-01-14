"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ALL_TYPES } from "../../utils/constant";

const Searchbar = ({ isWhite = false }) => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const [selectedType, setSelectedType] = useState(ALL_TYPES[0]?.type_id || "");

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (selectedType && searchText.trim().length > 2) {
      router.push(
        `/search-product?query=${searchText}&type_id=${selectedType}`
      );
    }
  };

  return (
    <div className="flex justify-center items-center px-4">
      <div className="w-full max-w-xl">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center bg-transparent shadow-md rounded-full overflow-hidden border border-gray-300"
        >
          {/* Dropdown */}
          <select
            className={`bg-transparent px-4 py-2 text-sm focus:outline-none cursor-pointer border-r border-gray-300 ${
              isWhite ? "text-gray-700" : "text-white"
            }`}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {ALL_TYPES?.map((item) => (
              <option key={item?.type_id} value={item?.type_id}>
                {item?.type_name}
              </option>
            ))}
          </select>

          {/* Search Input */}
          <input
            type="search"
            className={`flex-1 px-4 py-2 bg-transparent text-sm focus:outline-none ${
              isWhite
                ? "text-gray-700 placeholder:text-gray-800"
                : "text-white placeholder:text-white"
            }`}
            placeholder="Search items..."
            autoComplete="off"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {/* Search Button */}
          <button
            type="submit"
            className="me-1.5 px-4 py-1 bg-[#A72F30] hover:bg-[#8e2222] text-white text-sm font-medium rounded-full transition-all"
          >
            <Search />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Searchbar;
