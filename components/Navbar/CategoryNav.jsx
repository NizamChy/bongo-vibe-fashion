"use client";

import NavRow from "./NavRow";
import { useState } from "react";
import { STORE_ID } from "../../utils/constant";
import { useStoreItems } from "../../hooks/fetchData/useStoreItems";
import { generateStoreNavItems } from "../../utils/generateStoreNavItems";

const CategoryNav = ({ isWhite = false }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const storeId = STORE_ID;

  const { useTypeByStoreId, useCategoryByStoreId, useSubCategoryByStoreId } =
    useStoreItems();

  const { data: allTypesByStore } = useTypeByStoreId(storeId);
  const { data: allCategoriesByStore } = useCategoryByStoreId(storeId);
  const { data: allSubCategoriesByStore } = useSubCategoryByStoreId(storeId);

  const storeNavItems =
    allTypesByStore && allCategoriesByStore && allSubCategoriesByStore
      ? generateStoreNavItems(
          allTypesByStore,
          allCategoriesByStore,
          allSubCategoriesByStore
        )
      : null;

  if (!storeNavItems || storeNavItems?.length === 0) return null;

  return (
    <div className="lg:min-h-10 hidden lg:block">
      <div className="w-full">
        <div className="flex justify-center items-center">
          <NavRow
            isWhite={isWhite}
            navItems={storeNavItems}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            hoveredCategory={hoveredCategory}
            setHoveredCategory={setHoveredCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
