import { useState } from "react";
import { Search, User, Menu as MenuIcon, X, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import MobileMenuItems from "./MobileMenuItems";
import { motion, AnimatePresence } from "framer-motion";
import CartIcon from "../cart/CartIcon";

const MainHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(
        expandedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="py-2 md:py-4 relative">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MenuIcon size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Logo */}
        <Link to="/" className="flex-shrink-0 mx-auto lg:mx-0 lg:mr-4">
          <img src="/images/logo.png" alt="SUNFIL" className="h-10 md:h-14" />
        </Link>

        {/* Mobile Cart */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            to="/cart"
            className="relative flex items-center justify-center"
            aria-label="Shopping cart"
          >
            <CartIcon />
          </Link>
        </div>

        {/* Search Bar Desktop */}
        <div className="hidden lg:flex flex-grow max-w-2xl relative mx-6">
          <div className="flex w-full border border-gray-300 rounded-full overflow-hidden  hover:shadow transition-shadow p-1">
            <input
              type="text"
              placeholder="Tìm sản phẩm"
              className="w-full py-2.5 px-5 focus:outline-none text-base"
            />
            <button
              className="bg-white px-4 flex items-center justify-center hover:text-blue-600"
              aria-label="Search with camera"
            >
              <Camera size={20} />
            </button>
            <button
              className="bg-blue-600 text-white py-2.5 px-5 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Right Menu Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Language Selector */}
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png"
                alt="VI"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="ml-1 font-medium text-sm">VI</span>
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 hover:text-blue-600"
          >
            <div className="relative">
              <CartIcon />
            </div>
            <span className="text-sm">Giỏ hàng</span>
          </Link>

          {/* Account */}
          <Link
            to="/account"
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <User className="text-gray-700" size={24} />
            <span className="text-sm">Tài khoản</span>
          </Link>
        </div>
      </div>

      {/* Mobile Search (Full width) */}
      <div className="mt-2 px-4 lg:hidden">
        <div className="flex w-full border border-gray-300 rounded-full overflow-hidden p-1">
          <input
            type="text"
            placeholder="Tìm sản phẩm"
            className="w-full py-2.5 px-4 text-sm focus:outline-none"
          />
          <button
            className="bg-white px-2 flex items-center justify-center hover:text-blue-600"
            aria-label="Search with camera"
          >
            <Camera size={18} />
          </button>
          <button
            className="bg-blue-500 text-white py-2.5 px-4 flex items-center justify-center hover:bg-blue-700 rounded-full"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={closeMenu}
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="bg-white h-full w-4/5 max-w-sm overflow-y-auto pt-4 pb-20 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Mobile Menu Header */}
                <div className="px-4 pb-4 border-b flex justify-between items-center">
                  <h3 className="font-bold">Menu</h3>
                  <button onClick={closeMenu}>
                    <X size={24} />
                  </button>
                </div>

                {/* Account in Mobile */}
                <Link
                  to="/account"
                  className="flex items-center gap-3 p-4 border-b"
                  onClick={closeMenu}
                >
                  <User className="text-gray-700" size={20} />
                  <span>Tài khoản</span>
                </Link>

                {/* Language in Mobile */}
                <div className="flex items-center gap-3 p-4 border-b">
                  <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-200">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png"
                      alt="VI"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm">Tiếng Việt</span>
                </div>

                {/* Mobile Menu Items */}
                <MobileMenuItems
                  expandedCategories={expandedCategories}
                  toggleCategory={toggleCategory}
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainHeader;
