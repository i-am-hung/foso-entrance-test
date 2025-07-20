import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Clock, Truck, RotateCw, ChevronRight } from "lucide-react";
import { categories, serviceItems } from "@/data/categories";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const NavigationBar = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (!hoveredCategory && categories.length > 0) {
      setHoveredCategory(categories[0].id);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setHoveredCategory(null);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .menu-container:hover .navigation-menu-content,
      .navigation-menu-content:hover {
        opacity: 1 !important;
        transform: translateY(0) !important;
        pointer-events: auto !important;
      }
      .menu-container:hover .navigation-menu-trigger[data-state="closed"] > span {
        transform: rotate(180deg);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const currentCategory = categories.find((c) => c.id === hoveredCategory);
  const hasFeatured = !!currentCategory?.featuredProducts?.length;

  return (
    <div className="bg-white relative z-30 hidden lg:block border-b pb-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div
            className="menu-container group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-[#0155C6] text-white rounded-lg transition-colors hover:!bg-blue-700 hover:!text-white data-[state=open]:!bg-blue-700 data-[state=open]:!text-white">
                    <div className="flex items-center">
                      <Menu className="mr-2" size={20} />
                      <span className="font-medium">Danh Mục Sản Phẩm</span>
                    </div>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="w-[900px] max-w-screen-lg shadow-lg navigation-menu-content">
                    <div className="flex">
                      {/* Categories */}
                      <div className="w-64 flex-shrink-0  pl-2 overflow-y-auto">
                        <ul>
                          {categories.map((category) => (
                            <li
                              key={category.id}
                              className={`group flex items-center gap-3 py-3 px-3 rounded-md rounded-r-none cursor-pointer transition-colors ${
                                hoveredCategory === category.id
                                  ? "bg-[#F4F6F8] text-blue-600 font-semibold"
                                  : "bg-white text-gray-700 hover:bg-[#F4F6F8] hover:text-blue-600"
                              }`}
                              onMouseEnter={() =>
                                setHoveredCategory(category.id)
                              }
                            >
                              <Link
                                to={`/category/${category.id}`}
                                className="flex items-center w-full"
                                onClick={(e) => e.preventDefault()}
                              >
                                {/* Icon placeholder */}
                                <span className="w-8 h-8 flex-shrink-0 rounded-full bg-white border border-slate-200 grid place-items-center mr-3 overflow-hidden">
                                  {category.image ? (
                                    <img
                                      src={category.image}
                                      alt={category.name}
                                      className="w-full h-full object-contain"
                                    />
                                  ) : (
                                    <img
                                      src="/logo.png"
                                      className="w-4 h-4 opacity-0"
                                    />
                                  )}
                                </span>

                                <span className="flex-1 text-sm truncate">
                                  {category.name}
                                </span>
                                <ChevronRight
                                  size={16}
                                  className="text-gray-400 group-hover:text-blue-600"
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Subcategories and Products */}
                      <AnimatePresence mode="wait">
                        {hoveredCategory && (
                          <motion.div
                            key={hoveredCategory}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                            className="w-[640px] p-6 bg-[#F4F6F8]"
                          >
                            {currentCategory && (
                              <>
                                <div className="mb-6">
                                  {/* Subcategories */}
                                  <div className="grid grid-cols-3 gap-4">
                                    {currentCategory?.subcategories
                                      .slice(0, 6)
                                      .map((sub) => (
                                        <Link
                                          key={sub.id}
                                          to={`/category/${hoveredCategory}/${sub.id}`}
                                          className="flex items-center bg-white border border-slate-200 rounded-lg p-3 hover:border-blue-600 transition-colors min-h-[72px] w-full"
                                        >
                                          {sub.image ? (
                                            <img
                                              src={sub.image}
                                              alt={sub.name}
                                              className="w-14 h-14 object-contain mr-3 flex-shrink-0"
                                            />
                                          ) : (
                                            <div className="w-14 h-14 mr-3 flex-shrink-0 rounded bg-slate-100" />
                                          )}
                                          <span className="text-sm font-medium truncate">
                                            {sub.name}
                                          </span>
                                        </Link>
                                      ))}
                                  </div>
                                </div>

                                {hasFeatured && (
                                  <>
                                    <hr className="border-t border-slate-200 my-6" />

                                    <div>
                                      <div className="flex items-center justify-between mb-3">
                                        <h1 className="text-lg font-bold ">
                                          Sản phẩm nổi bật
                                        </h1>
                                        <Link
                                          to="#"
                                          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                                        >
                                          Xem tất cả <ChevronRight size={14} />
                                        </Link>
                                      </div>
                                      <div className="flex gap-4 overflow-x-auto pb-2">
                                        {currentCategory?.featuredProducts
                                          ?.slice(0, 6)
                                          .map((product) => (
                                            <Link
                                              to={`/san-pham/${product.id}`}
                                              key={product.id}
                                              className="w-44 flex-shrink-0 rounded-xl bg-white border border-slate-200 p-4 hover:shadow-lg transition-shadow"
                                            >
                                              <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-24 w-full object-contain mb-3"
                                              />
                                              <h5 className="text-sm font-semibold leading-5 line-clamp-2 mb-1">
                                                {product.name}
                                              </h5>
                                              <p className="text-[#E30000] font-bold">
                                                {product.price.toLocaleString(
                                                  "vi-VN"
                                                )}{" "}
                                                đ
                                              </p>
                                              <p className="text-xs text-slate-400 line-through">
                                                {(
                                                  product.price * 1.1
                                                ).toLocaleString("vi-VN")}{" "}
                                                đ
                                              </p>
                                            </Link>
                                          ))}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 ml-4">
            <ul className="flex items-center justify-start flex-nowrap">
              <li className="whitespace-nowrap">
                <Link
                  to="/about"
                  className="block py-2.5 px-4 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Về Chúng Tôi
                </Link>
              </li>
              <li className="whitespace-nowrap">
                <Link
                  to="/blog"
                  className="block py-2.5 px-4 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Bài Viết
                </Link>
              </li>
              <li className="whitespace-nowrap">
                <Link
                  to="/category"
                  className="block py-2.5 px-4 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Catalog
                </Link>
              </li>
              <li className="whitespace-nowrap">
                <Link
                  to="/contact"
                  className="block py-2.5 px-4 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <div className="hidden xl:flex items-center space-x-6 ml-auto">
            {serviceItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center text-xs text-gray-700"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  {index === 0 ? (
                    <Clock size={16} className="text-blue-600" />
                  ) : index === 3 ? (
                    <RotateCw size={16} className="text-blue-600" />
                  ) : (
                    <Truck size={16} className="text-blue-600" />
                  )}
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
