"use client";

import { useState } from "react";
import MensProductCard from "./MensProductCard";
import ProductCardSkeleton from "../../SkeletonLoading/ProductCardSkeleton";

const StoreProducts = ({ title, productInfo, isLoading, isError }) => {
  const [visibleProductsCount, setVisibleProductsCount] = useState(10);

  const handleViewMore = () => {
    setVisibleProductsCount((prevCount) => prevCount + 10);
  };

  const handleViewLess = () => {
    setVisibleProductsCount(10);
  };

  if (isLoading)
    return (
      <section className="lg:py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="min-h-8 lg:min-h-10 mb-3 rounded-md bg-gray-200 animate-pulse w-1/3 lg:w-1/4" />
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );

  if (!productInfo || productInfo?.length === 0) {
    return null;
  }

  const reversedProducts = [...productInfo]?.reverse();
  const displayedProducts = reversedProducts?.slice(0, visibleProductsCount);
  const hasMoreProducts = reversedProducts?.length > visibleProductsCount;

  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-[#F9F6F9] to-[#A7C4DC]">
      <div className="px-2">
        <h2 className="text-3xl md:text-4xl text-center mb-12">{title}</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {displayedProducts?.map((product) => (
            <MensProductCard key={product?._id?.toString()} product={product} />
          ))}
        </div>

        {reversedProducts?.length > 10 && (
          <div className="mt-12 text-center">
            {hasMoreProducts ? (
              <button
                onClick={handleViewMore}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
              >
                View More Products
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
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
              >
                View Less Products
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
      </div>
    </section>
  );
};

export default StoreProducts;
