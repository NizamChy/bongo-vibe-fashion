"use client";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const banners = [
  {
    id: 1,
    title: "Winter Collection",
    subtitle: "Up to 40% Off",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    // Alternative winter options:
    // "https://images.unsplash.com/photo-1541441446568-26db4be26778?w=2000&q=80"
    // "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=2000&q=80"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Trending Styles",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    // Alternative fashion options:
    // "https://images.unsplash.com/photo-1445205170230-053b83016050?w=2000&q=80"
    // "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=2000&q=80"
  },
  {
    id: 3,
    title: "Exclusive Deals",
    subtitle: "Limited Time Offer",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    // Alternative shopping/deals options:
    // "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=2000&q=80"
    // "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=2000&q=80"
  },
  {
    id: 4,
    title: "New Arrivals",
    subtitle: "Trending Styles",
    image:
      //   "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      // Alternative fashion options:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=2000&q=80",
    // "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=2000&q=80"
  },
  {
    id: 5,
    title: "Exclusive Deals",
    subtitle: "Limited Time Offer",
    image:
      //   "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      // Alternative shopping/deals options:
      "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=2000&q=80",
    // "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=2000&q=80"
  },
];

const BannerSlider = () => {
  return (
    <section className="py-10 px-4 md:px-8 bg-linear-to-br from-[#B6C0D9] via-[#EFC7C7] to-[#A7C4DC]">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={2}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
        }}
        className="max-w-7xl mx-auto"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-[260px] md:h-[320px] rounded-2xl overflow-hidden group">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 text-white">
                <h2 className="text-2xl md:text-3xl font-bold">
                  {banner.title}
                </h2>
                <p className="mt-2 text-sm md:text-base">{banner.subtitle}</p>

                <button className="mt-4 w-fit bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BannerSlider;
