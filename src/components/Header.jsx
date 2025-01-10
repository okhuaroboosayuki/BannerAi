import logo from "../assets/icons/bannerAi_96x96.png";

const Header = () => {
  return (
    <header className="w-full p-4 border-b-[0.5px] border-b-grey">
      <div className="flex items-center justify-center">
        <img src={logo} alt="logo icon" width={50} height={50} />
        <span className="text-3xl font-cabin-sketch">BannerAi</span>
      </div>
    </header>
  );
};

export default Header;
