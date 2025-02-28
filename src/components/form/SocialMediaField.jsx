import PropTypes from "prop-types";
import { toast } from "react-toastify";

const SocialMediaField = ({ platform, dispatch, socialMediaName, socialMedia, editable }) => {
  const isSameName = socialMediaName === platform;
  const hasPlatformKey = socialMedia.some((item) => Object.keys(item).includes(platform)); // Check if platform key exists
  const platformHasValue = socialMedia.some((item) => item[platform]); // Check if platform has a value

  const socialMediaEqualToFive = socialMedia.length === 5;

  const handleSocialMediaClick = () => {
    if (socialMediaEqualToFive && !hasPlatformKey) {
      toast.error("You can only add up to 5 social media platforms.", { autoClose: 3000 });
      return;
    }

    if (!editable) return;

    dispatch({ type: "socialButtonClicked", payload: platform });
  };

  return (
    <div
      className={`flex items-center w-full sm:w-[116px] justify-center gap-2 px-[5px] py-[10.5px] rounded-md ${
        hasPlatformKey && platformHasValue !== "" // Check if platform has a value and key exists to determine the color of the button
          ? `border border-Bluebell hover:border-DeepBlue ${!editable ? "cursor-not-allowed bg-gray-300" : "cursor-pointer bg-Whisper"}`
          : `${!editable ? "bg-gray-400 border-gray-300 cursor-not-allowed" : "bg-gray-200 cursor-pointer buttonWithSVG-hover"}`
      }`}
      onClick={() => handleSocialMediaClick()}
      role="button"
      tabIndex="0">
      {!isSameName ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15px" height="15px" fillRule="evenodd" fill={hasPlatformKey ? "#5068E2" : "#565E6C"}>
          <path fillRule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill={hasPlatformKey ? "#5068E2" : "#565E6C"}>
          <path d="M200-440v-80h560v80H200Z" />
        </svg>
      )}
      <span className={hasPlatformKey ? "text-Bluebell" : `${!editable ? "text-gray-700" : "text-Pewter"}`}>{platform}</span>
    </div>
  );
};

SocialMediaField.propTypes = {
  platform: PropTypes.string,
  dispatch: PropTypes.func,
  socialMediaName: PropTypes.string,
  socialMedia: PropTypes.array,
  editable: PropTypes.bool,
};

export default SocialMediaField;
