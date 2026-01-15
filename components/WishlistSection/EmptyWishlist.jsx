import React from "react";
import Image from "next/image";

const EmptyWishlist = () => {
  return (
    <>
      <div className="min-h-[70vh] flex justify-center items-center">
        <div>
          <div className="max-w-md">
            <Image
              className="w-full"
              src="/images/empty-wishlist.webp"
              alt="empty-wishlist"
              height={500}
              width={750}
            />
          </div>

          <p className="text-2xl text-primary text-center font-medium">
            Your wishlist is empty!
          </p>
        </div>
      </div>
    </>
  );
};

export default EmptyWishlist;
