"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { slugify } from "../../utils/slugify";
import { FASHION_IMAGE_URL } from "../../api-endpoints/secret";

import { useDispatch } from "react-redux";
import { handleProductReducer } from "../../redux/productReducer.js";

const ProductCards = ({ product }) => {
  const params = useParams();
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
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link
        href={`/view-product/${slugify(product?.product_title_eng)}_${
          product?._id
        }`}
        onClick={() => handleProductClick(product)}
      >
        <div className="block">
          <div className="aspect-3/4 bg-gray-100 relative">
            <img
              src={
                product?.web_image
                  ? `${FASHION_IMAGE_URL}/${product?.web_image}`
                  : "/png/dummyImage.png"
              }
              alt={product?.product_title_eng}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
              {product?.product_title_eng}
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              {product?.brand_info?.brand_name}
            </p>
            <div className="flex justify-between items-center">
              <span className="font-medium">
                ৳{product?.sale_price?.toFixed(2)}
              </span>
              {product?.sale_price < product?.max_retail_price && (
                <span className="text-sm text-gray-500 line-through">
                  ৳{product?.max_retail_price?.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCards;
