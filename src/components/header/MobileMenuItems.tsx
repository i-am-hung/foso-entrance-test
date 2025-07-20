import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, Truck, RotateCw } from "lucide-react";
import { Link } from "react-router-dom";
import { categories, serviceItems } from "@/data/categories";

interface MobileMenuItemsProps {
  expandedCategories: string[];
  toggleCategory: (id: string) => void;
}

const MobileMenuItems = ({
  expandedCategories,
  toggleCategory,
}: MobileMenuItemsProps) => {
  return (
    <div className="pt-2">
      <div className="p-4 font-medium text-blue-600 border-b">
        Danh mục sản phẩm
      </div>

      {categories.map((category) => (
        <div key={category.id} className="border-b">
          <div
            className="flex items-center justify-between p-4"
            onClick={() => toggleCategory(category.id)}
          >
            <Link to={`/category/${category.id}`} className="flex-1">
              {category.name}
            </Link>
            <button className="p-1">
              <motion.div
                animate={{
                  rotate: expandedCategories.includes(category.id) ? 180 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={18} />
              </motion.div>
            </button>
          </div>

          <AnimatePresence>
            {expandedCategories.includes(category.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 pl-8 pr-4 overflow-hidden"
              >
                <div className="py-2">
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub.id}
                      to={`/category/${category.id}/${sub.id}`}
                      className="block py-2 text-sm hover:text-blue-600"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      <div className="border-b">
        <div className="p-4 font-medium text-blue-600">Danh mục khác</div>
        <div className="px-4 pb-4">
          <Link
            to="/about"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            Về Chúng Tôi
          </Link>
          <Link
            to="/blog"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            Bài Viết
          </Link>
          <Link
            to="/category"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            Catalog
          </Link>
          <Link
            to="/contact"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            Liên Hệ
          </Link>
        </div>
      </div>

      {/* Mobile Services */}
      <div className="mt-4 px-4">
        <h3 className="text-sm font-medium mb-3 text-blue-600 border-b pb-2">
          Dịch vụ của chúng tôi
        </h3>
        <div className="space-y-4 py-2">
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
  );
};

export default MobileMenuItems;
