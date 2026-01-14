"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import { slugify } from "../../../utils/slugify.js";
import { FASHION_IMAGE_URL } from "./../../../api-endpoints/secret";
import { handleProductReducer } from "../../../redux/productReducer.js";

const MensProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleProductClick = (product) => {
    dispatch(
      handleProductReducer({
        type: "SAVE_CURRENT_PRODUCT_DETAILS",
        data: product,
      })
    );
  };

  return (
    <Link
      href={`/view-product/${slugify(product?.product_title_eng)}_${
        product?._id
      }`}
      onClick={() => handleProductClick(product)}
      className="group cursor-pointer"
    >
      <div className="relative aspect-3/4 overflow-hidden bg-gray-100 mb-4 rounded-t-2xl">
        <Image
          src={
            product?.web_image
              ? `${FASHION_IMAGE_URL}/${product?.web_image}`
              : "/images/png/dummyImage.png"
          }
          alt={product?.product_title_eng}
          fill
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-2xl"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product?.max_retail_price > product?.sale_price && (
            <div className="bg-white text-red-600 text-xs px-2 py-1 rounded-lg">
              {Math.round(
                (1 - product?.sale_price / product?.max_retail_price) * 100
              )}
              % OFF
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full"
        >
          <Heart className="w-5 h-5" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
          <button className="w-full bg-white/75 backdrop-blur-lg text-black hover:bg-gray-100 py-1 rounded-lg cursor-pointer">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="space-y-1">
        {/* <p className="text-sm text-gray-500">
          {product?.category_info?.category_name}
        </p> */}
        <h3 className="line-clamp-1">{product?.product_title_eng}</h3>
        <div className="flex items-center gap-2">
          <span>৳{product?.sale_price}</span>
          {product?.max_retail_price > product?.sale_price && (
            <span className="text-gray-400 line-through text-sm">
              ৳{product?.max_retail_price}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MensProductCard;
