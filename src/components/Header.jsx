import logo from "../assets/icons/bannerAi_96x96.png";

const Header = () => {
  return (
    <header className="w-full p-4 border-b-[0.5px] border-b-gray-200 flex justify-between items-center">
      <div className="flex items-center justify-center ml-8">
        <img src={logo} alt="logo icon" width={50} height={50} />
        <span className="text-3xl cursor-default font-cabin-sketch">BannerAi</span>
        {/* <span className="text-3xl cursor-default font-cabin-sketch">BannerCraft</span> */}
      </div>
    </header>
  );
};

export default Header;
