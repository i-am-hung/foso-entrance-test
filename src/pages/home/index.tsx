import HeroSection from "@/components/product/HeroSection";

const HomePage = () => {
  return (
    <>
      {/* Hero banner */}
      <HeroSection />

      {/* Main content */}
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Trang Chủ</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <p>SUNFIL.</p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
