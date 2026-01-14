import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import ReduxProvider from "../redux/ReduxProvider";
import QueryProvider from "../Provider/QueryProvider";
import { CartProvider } from "../context/CartContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Bongo Vibe",
  description: "Grow with your new style.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} antialiased`}>
        <>
          <ReduxProvider>
            <QueryProvider>
              <CartProvider>
                <Toaster />
                <Navbar />
                {children}
                <Footer />
              </CartProvider>
            </QueryProvider>
          </ReduxProvider>
        </>
      </body>
    </html>
  );
}
