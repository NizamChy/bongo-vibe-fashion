"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Loader from "../../Loader/Loader";
import { slugify } from "./../../../utils/slugify";
import { FASHION_IMAGE_URL } from "./../../../api-endpoints/secret";
import { ALL_CATEGORIES, STORE_ID } from "../../../utils/constant.js";
import { useStoreItems } from "./../../../hooks/fetchData/useStoreItems";

const ShopByCategory = () => {
  const [visibleCategoriesCount, setVisibleCategoriesCount] = useState(8);

  const { useSubCategoryByStoreId } = useStoreItems();

  const { data: allSubCategoriesByStore, isLoading } =
    useSubCategoryByStoreId(STORE_ID);

  const handleViewMore = () => {
    setVisibleCategoriesCount((prevCount) => prevCount + 8);
  };

  const handleViewLess = () => {
    setVisibleCategoriesCount(8);
  };

  const displayedCategories = allSubCategoriesByStore?.slice(
    0,
    visibleCategoriesCount
  );
  const hasMoreCategories =
    allSubCategoriesByStore?.length > visibleCategoriesCount;

  if (isLoading) return <Loader />;

  if (!allSubCategoriesByStore || allSubCategoriesByStore?.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-linear-to-br from-[#A7C4DC] via-[#EFC7C7] to-[#B6C0D9]">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
          Shop by Category
        </h2>
        <p className="mt-3 text-gray-500">
          Find your style from our premium collections.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {displayedCategories?.map((category) => (
          <Link
            href={`/category/type_${category?.type_info}_category_${
              category?.category_info
            }_${slugify(category?.sub_category_info?.sub_category_name)}_${
              category?.sub_category_info?._id
            }`}
            key={category?._id.toString()}
            className="group relative rounded-3xl overflow-hidden shadow-xl aspect-square"
          >
            <Image
              src={`${FASHION_IMAGE_URL}/${category?.sub_category_info?.banner_type_1}`}
              alt={category?.sub_category_info?.sub_category_name}
              width={400}
              height={400}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition duration-300" />

            <div className="absolute inset-x-0 bottom-0 p-2 md:p-6 backdrop-blur-md bg-white/20 text-white">
              <h3 className="text-sm md:text-xl font-medium md:font-semibold text-center">
                {category?.sub_category_info?.sub_category_name}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {ALL_CATEGORIES?.length > 8 && (
        <div className="mt-12 text-center">
          {hasMoreCategories ? (
            <button
              onClick={handleViewMore}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              View More
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleViewLess}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              View Less
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default ShopByCategory;
