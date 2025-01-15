import PropTypes from "prop-types";

const SocialMediaField = ({ platform, dispatch, socialMediaName, socialMedia }) => {
  const isSameName = socialMediaName === platform;
  const hasPlatformKey = socialMedia.some((item) => Object.keys(item).includes(platform));

  return (
    <div
      className={`flex items-center w-full sm:w-[116px] justify-center gap-2 px-[5px] py-[10.5px] ${hasPlatformKey ? "cursor-not-allowed border border-Bluebell" : "cursor-pointer bg-Whisper buttonWithSVG-hover"}  rounded-md `}
      onClick={hasPlatformKey ? () => "" : () => dispatch({ type: "socialButtonClicked", payload: platform })}>
      {!isSameName ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15px" height="15px" fillRule="evenodd" fill={hasPlatformKey ? "blue" : "#565E6C"}>
          <path fillRule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#565E6C">
          <path d="M200-440v-80h560v80H200Z" />
        </svg>
      )}
      <span className={hasPlatformKey ? "text-Bluebell" : "text-Pewter"}>{platform}</span>
    </div>
  );
};

SocialMediaField.propTypes = {
  platform: PropTypes.string,
  dispatch: PropTypes.func,
  socialMediaName: PropTypes.string,
  socialMedia: PropTypes.array,
};

export default SocialMediaField;
