import { useEffect, useRef } from "react";
import logo from "../assets/icons/bannerAi_96x96.png";
import useFormReducer from "../hooks/useFormReducer";

const Header = () => {
  const headerRef = useRef(null);

  const { state } = useFormReducer();
  const { openModal } = state;

  useEffect(() => {
    const header = headerRef.current;

    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      if (openModal) return header.classList.add("header-hidden");

      if (!openModal) {
        window.scrollY > lastScrollY ? header.classList.add("header-hidden") : header.classList.remove("header-hidden");
        lastScrollY = window.scrollY;
      }
    });
  }, [openModal]);

  return (
    <header className="fixed-header" ref={headerRef}>
      <div className="flex items-center justify-center ml-8">
        <img src={logo} alt="logo icon" width={50} height={50} />
        <span className="text-3xl cursor-default font-cabin-sketch">BannerAi</span>
        {/* <span className="text-3xl cursor-default font-cabin-sketch">BannerCraft</span> */}
      </div>
    </header>
  );
};

export default Header;
