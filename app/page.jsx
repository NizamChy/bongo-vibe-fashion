import Hero from "../components/TemplateTwo/Hero/Hero";
import BannerSlider from "./../components/TemplateTwo/Slider/BannerSlider";
import ShopByCategory from "./../components/TemplateTwo/Category/ShopByCategory";
import StoreProductsByType from "./../components/TemplateTwo/ProductSection/StoreProductsByType";

const page = () => {
  return (
    <>
      <Hero />
      <ShopByCategory />
      <BannerSlider />
      <StoreProductsByType />
    </>
  );
};

export default page;
