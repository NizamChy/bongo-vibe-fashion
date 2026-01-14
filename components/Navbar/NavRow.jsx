"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { slugify } from "../../utils/slugify";
import { FASHION_IMAGE_URL } from "../../api-endpoints/secret";

const NavRow = ({
  isWhite = false,
  navItems,
  activeMenu,
  setActiveMenu,
  hoveredCategory,
  setHoveredCategory,
}) => {
  return (
    <ul className="hidden lg:flex gap-2 2xl:gap-6 font-medium h-full">
      {navItems?.map((navItem) => (
        <li
          key={navItem?.type_id}
          className="h-full flex items-center group"
          onMouseEnter={() => setActiveMenu(navItem?.type_name)}
          onMouseLeave={() => {
            setActiveMenu(null);
            setHoveredCategory(null);
          }}
        >
          <Link
            href="#"
            onClick={() => setActiveMenu(null)}
            className={`group flex items-center text-sm py-2 cursor-pointer px-2 transition-colors ${
              isWhite ? "text-gray-800" : "text-white"
            } hover:text-primary`}
          >
            {navItem?.type_name}
            <ChevronDown className="ml-1 text-xs transition-transform duration-300 group-hover:rotate-180" />
          </Link>

          {activeMenu === navItem?.type_name &&
            navItem?.categories?.length > 0 && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-250 xl:w-300 bg-white shadow-lg z-50">
                <div className="p-6 grid grid-cols-4 gap-6">
                  <div className="col-span-3 max-h-[50vh] overflow-y-auto">
                    <div className="columns-4 gap-8">
                      {navItem?.categories?.map((cat) => (
                        <div
                          key={cat?.category_id}
                          className="break-inside-avoid mb-4"
                          onMouseEnter={() => setHoveredCategory(cat)}
                          onMouseLeave={() => setHoveredCategory(null)}
                        >
                          <Link href="#" onClick={() => setActiveMenu(null)}>
                            <h3 className="font-bold text-sm text-primary capitalize">
                              {cat?.name}
                            </h3>
                          </Link>
                          <ul className="list-none p-0 m-0">
                            {cat?.subcategories?.map((subcat) => (
                              <li key={subcat?.id}>
                                <Link
                                  href={`/category/${slugify(
                                    navItem?.type_name
                                  )}_${cat?.type_id}_${slugify(cat?.name)}_${
                                    cat?.category_id
                                  }_${slugify(subcat?.name)}_${subcat?.id}`}
                                  onClick={() => setActiveMenu(null)}
                                  className="text-sm text-gray-800 hover:text-primary transition-all duration-300 capitalize"
                                >
                                  {subcat?.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-l border-gray-200 pl-6 col-span-1">
                    {hoveredCategory ? (
                      <>
                        <h3 className="font-bold text-base mb-3">Featured</h3>
                        <div className="group">
                          <div className="aspect-3/4 relative overflow-hidden rounded-lg mb-2">
                            {hoveredCategory?.category_img && (
                              <Image
                                src={`${FASHION_IMAGE_URL}/${hoveredCategory?.category_img}`}
                                alt={hoveredCategory?.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            )}
                          </div>
                          <p className="text-sm">{hoveredCategory?.name}</p>
                        </div>
                      </>
                    ) : (
                      navItem?.featured?.image && (
                        <>
                          <h3 className="font-bold text-base mb-3">Featured</h3>
                          <div className="group">
                            <div className="aspect-3/4 relative overflow-hidden rounded-lg mb-2">
                              <Image
                                src={`${FASHION_IMAGE_URL}/${navItem?.featured?.image}`}
                                alt={navItem?.featured?.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <p className="text-sm">
                              {navItem?.featured?.title}
                            </p>
                          </div>
                        </>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
        </li>
      ))}
    </ul>
  );
};

export default NavRow;
