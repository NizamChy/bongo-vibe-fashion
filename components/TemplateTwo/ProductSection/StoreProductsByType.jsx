"use client";

import { STORE_ID } from "../../../utils/constant.js";
import StoreProductsSection from "./StoreProductsSection";
import { useStoreItems } from "./../../../hooks/fetchData/useStoreItems";

const StoreProductsByType = () => {
  const { useTypeByStoreId } = useStoreItems();

  const { data: allTypesByStore } = useTypeByStoreId(STORE_ID);

  return (
    <>
      {allTypesByStore?.map((type) => (
        <StoreProductsSection key={type?._id?.toString()} type={type} />
      ))}
    </>
  );
};

export default StoreProductsByType;
