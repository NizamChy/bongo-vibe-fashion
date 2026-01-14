"use client";

import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { STORE_ID } from "../../../utils/constant.js";
import { useStoreItems } from "./../../../hooks/fetchData/useStoreItems";

const Hero = () => {
  const storeId = STORE_ID;

  const { useStoreInfo } = useStoreItems();
  const { data: storeInfo, isLoading } = useStoreInfo(storeId);

  // if (isLoading) return null;

  return (
    <section className="relative h-screen w-full">
      <Image
        src="/images/hero-banner.webp"
        alt="Hero Banner"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/10" />

      {!isLoading && (
        <div className="relative z-10 h-full flex items-center justify-end container mx-auto">
          <div className="max-w-7xl px-6 border-2 border-dashed border-gray-200 p-10 rounded-2xl bg-black/20">
            <div className="max-w-xl text-white relative">
              <h1 className="text-xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
                {/* {storeInfo?.shop_name} */}
                Bongo Vibe
              </h1>

              <p className="text-sm md:text-xl font-semibold max-w-lg flex gap-1 items-start mb-2">
                <span>
                  <Phone />
                </span>
                <span>{storeInfo?.contact_no}</span>
              </p>

              <p className="text-sm md:text-base font-medium md:mb-8 max-w-lg flex gap-1 items-start">
                <span>
                  <MapPin />
                </span>
                <span className="line-clamp-3 md:line-clamp-none text-justify">
                  {storeInfo?.shop_address}
                </span>
              </p>

              <button className="absolute -bottom-16 md:-bottom-24 left-1/3 mt-8 bg-white text-[#A72F30] px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition cursor-pointer">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
