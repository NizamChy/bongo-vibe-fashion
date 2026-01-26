"use client";

import Link from "next/link";
import Image from "next/image";
import Searchbar from "./Searchbar";
import CategoryNav from "./CategoryNav";
import { useSelector } from "react-redux";
import Sidebar from "./../Sidebar/Sidebar";
import CartDrawer from "../Cart/CartDrawer";
import LoginDropdown from "./LoginDropdown";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import CommonModal from "../CommonModal/CommonModal";
import { Heart, ShoppingCart, User, Menu } from "lucide-react";
import LoginModalDetails from "../LoginSection/LoginModalDetails";
import { useUser } from "./../../hooks/fetchData/useUser";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [hovered, setHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropDownState, setDropDownState] = useState(false);

  const dropDownMenuRef = useRef();
  const { cartItems } = useCart();
  const { handleUserLogout } = useUser();

  const pathname = usePathname();
  const isHomeRoute = pathname === "/" ? true : false;

  const userInfo = useSelector((state) => state.user.userInfo);
  const favouriteFashionItems = useSelector(
    (state) => state.userChoice.favouriteFashionItems,
  );

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  function getFirstWord(str) {
    if (typeof str !== "string" || str.trim() === "") {
      return "";
    }
    const words = str.trim().split(" ");
    return words[0];
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogin = () => {
    openModal();
  };

  const handleLogout = () => {
    handleUserLogout();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeDropDown = (e) => {
      if (
        dropDownMenuRef.current &&
        !dropDownMenuRef.current.contains(e.target)
      ) {
        setDropDownState(false);
      }
    };
    document.addEventListener("mousedown", closeDropDown);
    return () => {
      document.removeEventListener("mousedown", closeDropDown);
    };
  }, []);

  const isWhite = scrolled || hovered || !isHomeRoute;

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="fixed top-0 left-0 w-full z-50"
      >
        <header
          className={`transition-all duration-300
          ${isWhite ? "bg-white shadow-md" : "bg-transparent"}
        `}
        >
          <nav className="max-w-7xl mx-auto flex items-center justify-between px-6">
            {/* <Link href="/" className="flex items-center gap-2">
              <span
                className={`text-2xl font-bold transition-colors
                ${isWhite ? "text-black" : "text-white"}
              `}
              >
                LOGO
              </span>
            </Link> */}

            <button
              onClick={toggleSidebar}
              className={`lg:hidden cursor-pointer transition-colors
                ${isWhite ? "text-black" : "text-white"}
              `}
            >
              <Menu />
            </button>

            <Link href="/" className="shrink-0">
              <div className="w-24 md:w-28 lg:w-32 transition-all duration-200 hover:scale-105">
                <Image
                  width={256}
                  height={80}
                  src="/images/logo/fashion-logo.png"
                  alt="fashion logo"
                  className="object-contain w-full h-auto"
                  priority
                />
              </div>
            </Link>

            <div className="hidden md:block">
              <Searchbar isWhite={isWhite} />
            </div>

            <div
              className={`flex items-center gap-4 transition-colors
              ${isWhite ? "text-gray-800" : "text-white"}
            `}
            >
              <Link href="/wishlist">
                <button className="cursor-pointer relative">
                  <Heart />

                  {favouriteFashionItems?.length > 0 && (
                    <span className="absolute -top-1 -right-3 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {favouriteFashionItems?.length || 0}
                    </span>
                  )}
                </button>
              </Link>

              {!userInfo?._id ? (
                <button onClick={handleLogin} className="cursor-pointer">
                  <User />
                </button>
              ) : (
                <>
                  <LoginDropdown
                    userInfo={userInfo}
                    getFirstWord={getFirstWord}
                    handleLogout={handleLogout}
                    dropDownState={dropDownState}
                    dropDownMenuRef={dropDownMenuRef}
                    setDropDownState={setDropDownState}
                  />
                </>
              )}

              <button onClick={toggleCart} className="cursor-pointer relative">
                <ShoppingCart />

                {cartItems?.length > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems?.length || 0}
                  </span>
                )}
              </button>
            </div>
          </nav>

          <CategoryNav isWhite={isWhite} />
        </header>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <CommonModal isOpen={isModalOpen} onClose={closeModal}>
        <LoginModalDetails onClose={closeModal} type="login" />
      </CommonModal>
    </>
  );
};

export default Navbar;
