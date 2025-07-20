import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const hotDeals = products.filter((p) => p.isHotDeal);

  const handleScroll = (dir: "prev" | "next") => {
    const container = carouselRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth;
    container.scrollBy({
      left: dir === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0%,transparent_70%)]" />

        <span className="absolute left-0 top-0 sm:top-6 md:top-8 z-20 inline-flex items-center pl-6 pr-8 py-2 bg-gradient-to-r from-[#FFF5CC] to-[#FFD666] text-[#7A0916] text-lg font-bold uppercase shadow rounded-r-full">
          MỚI CỰC HOT!
        </span>

        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 px-6 sm:px-12 pt-14 sm:pt-20 md:pt-24 pb-10 container mx-auto">
          <div className="text-center sm:text-left max-w-xl z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 text-white drop-shadow text-shadow-lg stroke-3 !stroke-black">
              TẢI APP NHẬN QUÀ
            </h2>

            <p className="text-2xl sm:text-3xl md:text-4xl mb-6 text-[#FFD666]">
              Tích điểm ngay trên app <span className="font-bold">SUNFIL1</span>
              <br />
              <span className="italic">*100K = 10 điểm</span>
            </p>

            <Button className="text-[#7A0916] bg-[#FFD666] hover:bg-[#ffca32] px-6 py-2 rounded-full shadow-md font-semibold">
              Tải ngay
            </Button>
          </div>

          <div className="relative flex-shrink-0 w-3/4 sm:w-1/2 lg:w-1/2 -mr-6 sm:-mr-10 md:-mr-20 max-w-none mt-6 sm:mt-0">
            <img
              src="/images/liquid.png"
              alt="Liquid"
              className="absolute inset-0 w-full h-full object-contain -rotate-[390.51deg] scale-x-[-1]"
            />
            <img
              src="/images/hero.png"
              alt="Hero Illustration"
              className="relative block w-9/12 h-auto mx-auto sm:mx-0 object-contain"
            />
          </div>
        </div>

        {hotDeals.length > 0 && (
          <div className="relative mt-8 pb-10 px-6 sm:px-12">
            <div
              ref={carouselRef}
              className="overflow-x-auto scroll-smooth flex gap-4 pb-2 snap-x snap-mandatory pl-2 sm:pl-4 pr-2 sm:pr-4"
            >
              {hotDeals.map((p) => (
                <div
                  key={p.id}
                  className="min-w-[180px] max-w-[180px] snap-start"
                >
                  <ProductCard product={p} className="w-full" />
                </div>
              ))}
            </div>

            <Button
              size="icon"
              variant="secondary"
              onClick={() => handleScroll("prev")}
              className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow z-10 rounded-full"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              onClick={() => handleScroll("next")}
              className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow z-10 rounded-full"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </Button>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default HeroSection;
