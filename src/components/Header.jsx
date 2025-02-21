import logo from "../assets/icons/bannerAi_96x96.png";
import useFormReducer from "../hooks/useFormReducer";

const Header = () => {
  const { state, dispatch } = useFormReducer();

  const { generatedOutput } = state;

  return (
    <header className="w-full p-4 border-b-[0.5px] border-b-grey flex justify-between items-center">
      <div className="flex items-center justify-center">
        <img src={logo} alt="logo icon" width={50} height={50} />
        <span className="text-3xl cursor-default font-cabin-sketch">BannerAi</span>
        {/* <span className="text-3xl cursor-default font-cabin-sketch">BannerCraft</span> */}
      </div>

      {generatedOutput && (
        <button onClick={() => dispatch({ type: "modal", payload: true })} className="capitalize">
          view banner
        </button>
      )}
    </header>
  );
};

export default Header;
