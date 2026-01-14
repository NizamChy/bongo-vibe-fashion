"use client";

import StoreProducts from "./StoreProducts";
import { STORE_ID } from "../../../utils/constant.js";
import { useStoreItems } from "./../../../hooks/fetchData/useStoreItems";

const StoreProductsSection = ({ type }) => {
  const { usePopularProductsByStore } = useStoreItems();

  const {
    data: productByStoreId,
    isLoading: isLoadingProductInfo,
    isError: isProductInfoError,
  } = usePopularProductsByStore(type?.type_info?._id, STORE_ID);

  return (
    <>
      <StoreProducts
        title={type?.type_info?.type_name}
        productInfo={productByStoreId}
        isLoading={isLoadingProductInfo}
        isError={isProductInfoError}
      />
    </>
  );
};

export default StoreProductsSection;
