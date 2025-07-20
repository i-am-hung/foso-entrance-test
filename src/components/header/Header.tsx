import { useEffect, useRef } from "react";
import TopBar from "./TopBar";
import MainHeader from "./MainHeader";
import NavigationBar from "./NavigationBar";

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateVar = () => {
      if (headerRef.current) {
        document.documentElement.style.setProperty(
          "--header-height",
          `${headerRef.current.offsetHeight}px`
        );
      }
    };
    updateVar();
    window.addEventListener("resize", updateVar);
    return () => window.removeEventListener("resize", updateVar);
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-white ">
      <TopBar />
      <MainHeader />
      <NavigationBar />
    </header>
  );
};

export default Header;
