import PropTypes from "prop-types";

const SocialMediaField = ({ platform }) => {
  return (
    <div className="flex items-center w-full sm:w-[116px] justify-center gap-2 px-[5px] py-[10.5px] cursor-pointer bg-Whisper rounded-md buttonWithSVG-hover">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15px" height="15px" fillRule="evenodd" fill="#565E6C">
        <path fillRule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z" />
      </svg>
      <span className="cursor-pointer text-Pewter">{platform}</span>
    </div>
  );
};

SocialMediaField.propTypes = {
  platform: PropTypes.string,
};

export default SocialMediaField;
