import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-[#F4F6F8]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
