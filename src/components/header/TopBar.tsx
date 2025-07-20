import { Download } from "lucide-react";
import RotatingMessage from "./RotatingMessage";

const TopBar = () => {
  const messages = [
    'Nhập mã <span class="font-bold text-yellow-300">NEWBIE</span> giảm ngay 10% cho lần đầu mua hàng.',
    'Miễn phí vận chuyển cho đơn hàng từ <span class="font-bold text-yellow-300">500K</span>.',
    'Khuyến mãi <span class="font-bold text-yellow-300">SALE 50%</span> cho tất cả lõi lọc.',
    'Tặng quà khi mua các sản phẩm <span class="font-bold text-yellow-300">Karofi</span>.',
  ];

  return (
    <div
      className="text-white py-1.5"
      style={{
        background:
          "linear-gradient(90deg, #0F5ED6 0%, #0D57C6 25%, #37CFFF 50%, #0D57C6 75%, #0F5ED6 100%)",
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center flex-grow max-w-md">
          <div className="text-xs md:text-sm w-full">
            <RotatingMessage messages={messages} interval={5000} />
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <div className="text-xs md:text-sm flex items-center">
            <span className="sr-only md:not-sr-only md:mr-1">Hotline:</span>
            <a
              href="tel:0283 760 7607"
              className="font-bold hover:underline whitespace-nowrap"
            >
              0283 760 7607
            </a>
          </div>
          <div className="text-xs md:text-sm border-l border-blue-400 pl-2 md:pl-4 hidden sm:block">
            <button className="flex items-center gap-1">
              <Download />
              <span className="hidden md:inline">Tải ứng dụng</span>
              <span className="md:hidden">App</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
