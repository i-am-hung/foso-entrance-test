import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = "" }) => {
  return (
    <nav
      className={`text-sm text-gray-600 ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link to="/" className="text-gray-500 hover:text-gray-600">
            Trang chủ
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight size={14} className="text-gray-400" />
              <li>
                {isLast || !item.to ? (
                  <span className="text-blue-500 hover:text-blue-600 font-medium">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.to}
                    className="text-gray-500 hover:text-gray-600"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
