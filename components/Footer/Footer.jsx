import {
  Map,
  Mail,
  Phone,
  Twitter,
  Facebook,
  Instagram,
  LinkedinIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Our Products", href: "#products" },
  { label: "Contact Us", href: "#contact" },
];

const FOOTER_SERVICES = [
  { label: "E-commerce Systems", href: "#" },
  { label: "Healthcare Solutions", href: "#" },
  { label: "Service Provider", href: "#" },
];

const Footer = () => {
  return (
    <>
      {/* Footer Content */}
      <footer className="bg-[#A72F30] text-white pt-12 pb-8 px-4 md:px-8 lg:px-16 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link href="/" className="shrink-0">
                <div className="bg-white rounded w-24 md:w-28 lg:w-32 transition-all duration-200 hover:scale-105">
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

              <p className="text-gray-300 mt-6 mb-6 text-sm leading-relaxed">
                Building the future of local commerce in Bangladesh with
                innovative, scalable digital solutions that empower businesses
                and communities.
              </p>

              {/* Social Media Links */}
              <div className="flex space-x-3 mt-8">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-400 hover:bg-blue-600 p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-400 hover:bg-blue-400 p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  aria-label="Twitter"
                >
                  <Twitter size={16} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-400 hover:bg-blue-700 p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={16} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-400 hover:bg-pink-600 p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-400 inline-block">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {NAV_LINKS?.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-400 inline-block">
                Our Services
              </h4>
              <ul className="space-y-3">
                {FOOTER_SERVICES?.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-green-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-400 inline-block">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Map className="text-blue-400 mt-1 mr-3 shrink-0" size={16} />
                  <span className="text-gray-300 text-sm leading-relaxed">
                    Jobeda Villa, Holding - 120, Mirzarpool, Muradpur,
                    Panchlaish, Chattogram, Bangladesh
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="text-green-400 mr-3 shrink-0" size={16} />
                  <a
                    href="tel:+8801719662995"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    +88 01719662995
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="text-yellow-400 mr-3 shrink-0" size={16} />
                  <a
                    href="mailto:notensionxyz@gmail.com"
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    notensionxyz@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} Notension Limited. All rights
                reserved.
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-service"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Cookie Policy
                </Link>
                <Link
                  href="/sitemap"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Sitemap
                </Link>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-gray-300 text-xs">
                Registered in Bangladesh | Company Registration: [Your Reg No.]
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
