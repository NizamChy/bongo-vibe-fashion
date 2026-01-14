import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-content">
      <DotLottieReact
        src="https://lottie.host/83ecd8f7-1aed-426d-895b-d2fcbdb013f1/CEgON642qn.lottie"
        loop
        autoplay
        className="size-36"
      />
    </div>
  );
};

export default Loader;
