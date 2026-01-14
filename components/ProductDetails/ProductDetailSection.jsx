"use client";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import ProductInfo from "./ProductInfo";
import { FiHeart } from "react-icons/fi";
import ImageGallery from "./ImageGallery";
import CartDrawer from "../Cart/CartDrawer";
import ProductDetails from "./ProductDetails";
import { usePathname } from "next/navigation";
import { MdLocationOn } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { slugify } from "../../utils/slugify.js";
import { useCart } from "../../context/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { FASHION_IMAGE_URL } from "../../api-endpoints/secret.js";
import { handleUserChoiceReducer } from "../../redux/userChoiceReducer.js";

const ProductDetailSection = () => {
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  const pathname = usePathname();
  const { addToCart } = useCart();

  const dispatch = useDispatch();

  const { currentProductDetails } = useSelector((state) => state.product);
  const product = currentProductDetails;
  const colorsArray = product?.colors?.split(",");
  const sizesArray = product?.sizes?.split(",");

  const [selectedImage, setSelectedImage] = useState(
    product?.images_by_color?.[0] || product?.web_image
  );

  const favouriteFashionItems = useSelector(
    (state) => state.userChoice.favouriteFashionItems
  );

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (
      product?.sizes !== "null" &&
      product?.sizes !== "" &&
      product?.sizes !== "undefined" &&
      sizesArray?.length > 0 &&
      !selectedSize
    ) {
      toast.dismiss();
      toast("Please select a size!", {
        icon: "ℹ️",
        style: {
          border: "1px solid #2C3E50",
          padding: "10px",
          color: "#2C3E50",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
      return;
    }

    addToCart(product, quantity, selectedSize, selectedImage);

    toast.dismiss();
    toast.success(`${product?.product_title_eng} added to cart!`, {
      style: {
        border: "1px solid #2C3E50",
        padding: "10px",
        color: "#2C3E50",
      },
    });
    toggleCart();
  };

  const toggleWishlist = (e, productId, product) => {
    e.preventDefault();

    if (favouriteFashionItems?.find((product) => product?._id === productId)) {
      removeFromReducer({
        productId: productId,
      });
    } else {
      addToReducer({
        itemInfo: [product],
      });
    }
  };

  const addToReducer = (itemInfo) => {
    dispatch(
      handleUserChoiceReducer({
        type: "ADD_TO_FAVOURITE_FASHION_ITEMS",
        data: itemInfo,
      })
    );
    toast.dismiss();
    toast.success("💖 পণ্যটি আপনার ফেভারিট লিস্টের অন্তর্ভূক্ত করা হল!", {
      style: {
        border: "1px solid #FC8F1E",
      },
      iconTheme: {
        primary: "#FC8F1E",
        secondary: "#FFFAEE",
      },
    });
  };

  const removeFromReducer = (Info) => {
    dispatch(
      handleUserChoiceReducer({
        type: "REMOVE_FROM_FAVOURITE_FASHION_ITEMS",
        data: Info,
      })
    );
    toast.dismiss();
    toast("পণ্যটি আপনার ফেভারিট লিস্ট থেকে বাদ দেওয়া হল!", {
      style: {
        border: "1px solid #FC8F1E",
      },
      icon: "🗑️",
      iconTheme: {
        primary: "#FC8F1E",
        secondary: "#FFFAEE",
      },
    });
  };

  return (
    <>
      <Head>
        <title>
          {product?.name} | {product?.brand} - Fashion Store
        </title>
        <meta name="description" content={product?.description} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-[42%]">
            {/* <ImageGallery product={product} /> */}

            <ImageGallery product={product} selectedImage={selectedImage} />
          </div>

          <div className="md:w-1/2">
            <ProductInfo product={product} />

            {/* Select Product Image Section */}
            {product?.images_by_color?.length > 0 && (
              <div className="my-4">
                <h3 className="text-lg font-semibold mb-2">Select Variant</h3>

                <div className="flex gap-3 flex-wrap">
                  {product?.images_by_color?.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`relative border-2 rounded-md overflow-hidden ${
                        selectedImage === img
                          ? "border-indigo-500"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={`${FASHION_IMAGE_URL}/${img}`}
                        alt={`Product image ${index + 1}`}
                        className="w-16 h-16 object-cover"
                      />

                      {/* ✔ Corner checkmark (bottom-right) */}
                      {selectedImage === img && (
                        <div className="absolute bottom-1 right-1 bg-indigo-500 text-white rounded-full p-1 shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product?.sizes !== "null" &&
              product?.sizes !== "" &&
              product?.sizes !== "undefined" &&
              sizesArray?.length > 0 && (
                <div className="my-3">
                  <h3 className="text-lg font-semibold mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizesArray?.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-1 border ${
                          selectedSize === size
                            ? "bg-black text-white border-black"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            <div className="my-3">
              <h3 className="text-lg font-semibold mb-2">Quantity</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="px-3 py-1 border border-gray-300 rounded-l-md hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-t border-b border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={(e) => toggleWishlist(e, product?._id, product)}
                  className={`p-2 rounded-lg flex justify-center items-center gap-1 px-3 py-1 border border-gray-300 hover:bg-gray-100 ${
                    favouriteFashionItems?.find(
                      (item) => item?._id === product?._id
                    )
                      ? "text-red-500 bg-white/90"
                      : "text-gray-400 bg-white/70 hover:text-red-500"
                  }`}
                >
                  <FiHeart
                    className={`text-lg ${
                      favouriteFashionItems?.find(
                        (item) => item?._id === product?._id
                      )
                        ? "fill-current"
                        : ""
                    }`}
                  />
                  <span className="text-deepGray text-xs sm:text-sm md:text-base">
                    {favouriteFashionItems?.find(
                      (item) => item?._id === product?._id
                    )
                      ? "Added to Wishlist"
                      : "Add to Wishlist"}
                  </span>
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-8 flex items-center justify-center flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 lg:px-12 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaShoppingCart /> Add to Cart
            </button>

            <ProductDetails product={product} />
          </div>
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default ProductDetailSection;
