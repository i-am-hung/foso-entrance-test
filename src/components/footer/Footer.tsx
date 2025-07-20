import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative text-[#1F2937]">
      <img
        src="/images/footer.jpg"
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />
      <div className="absolute inset-0 bg-white/30" />

      <div className="relative container mx-auto px-4 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Company Info */}
          <div className="space-y-3 lg:col-span-5">
            <h2 className="text-xl font-bold text-[#003366] uppercase tracking-wide">
              VIET HUNG AUTO PRODUCTION TRADING JOINT STOCK COMPANY
            </h2>
            <p className="text-base">
              <span className="font-semibold">Tax code:</span> 0305094228
            </p>
            <p className="text-base">
              <span className="font-semibold">Address:</span> 13 Nghia Thuc,
              Ward 05, District 5, Ho Chi Minh City, Viet Nam.
            </p>
            <p className="text-base">
              <span className="font-semibold">Phone number:</span> 0283 760 7607
            </p>
            <p className="text-base">
              <span className="font-semibold">Opening hour:</span> 09:00 – 22:00
              from Mon – Fri
            </p>
            {/* Bộ Công Thương badge */}
            <img
              src="/images/bocongthuong.png"
              alt="Đã thông báo Bộ Công Thương"
              className="h-12 w-auto mt-6"
            />
          </div>

          {/* Sitemap */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-5 text-[#003366]">
              Sitemap
            </h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-600 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/article"
                  className="hover:text-blue-600 transition-colors"
                >
                  Article
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-blue-600 transition-colors"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-5 text-[#003366]">Legal</h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-blue-600 transition-colors flex items-center before:content-['—'] before:mr-2"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie"
                  className="hover:text-blue-600 transition-colors flex items-center before:content-['—'] before:mr-2"
                >
                  Cookie policy
                </Link>
              </li>
              <li>
                <Link
                  to="/delivery"
                  className="hover:text-blue-600 transition-colors flex items-center before:content-['—'] before:mr-2"
                >
                  Delivery policy
                </Link>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className="hover:text-blue-600 transition-colors flex items-center before:content-['—'] before:mr-2"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold mb-5 text-[#003366]">
              Download App
            </h3>
            <div className="space-y-4">
              <a href="#" className="block">
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/vi_badge_web_generic.png"
                  alt="Get it on Google Play"
                  className="h-12 w-auto"
                />
              </a>
              <a href="#" className="block">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-12 w-auto"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <hr className="my-10 border-slate-200" />

        {/* Language selector & Copyright */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-sm">
          {/* Language */}
          <div className="flex items-center gap-2 order-2 lg:order-1">
            <img
              src="https://flagcdn.com/w20/vn.png"
              alt="VI"
              className="w-5 h-5"
            />
            <span>VI</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>

          {/* Copyright */}
          <p className="order-1 lg:order-2 text-center">
            &copy; {new Date().getFullYear()} SUNFIL - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
