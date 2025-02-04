import PropTypes from "prop-types";
import { forwardRef } from "react";
import { toast } from "react-toastify";

const Input = forwardRef(({ type, placeholder, name, value, socialMediaLink, socialMedia, onChange, dispatch, errors, generatedOutput, customWidth }, ref) => {
  const isSocialMedia = ["facebook", "linkedin", "instagram", "X (twitter)", "github", "behance", "dribble", "youtube", "website"].includes(name);

  const addSocialMedia = () => {
    const platformExists = socialMedia.find((item) => Object.keys(item).includes(name));

    if (!socialMediaLink) {
      if (platformExists) {
        dispatch({ type: "addSocialMedia" });
        toast.success(`Your ${name} ${name !== "website" ? "username" : "URL"} has been deleted successfully`, { autoClose: 3000 });
      } else {
        toast.error(`A ${name} ${name !== "website" ? "username" : "URL"} must be provided`, { autoClose: 3000 });
      }
    } else {
      dispatch({ type: "addSocialMedia" });
      const toastMessage = platformExists
        ? `Your ${name} ${name !== "website" ? "username" : "URL"} has been updated successfully`
        : `Your ${name} ${name !== "website" ? "username" : "URL"} has been added successfully`;
      const toastType = platformExists ? toast.info : toast.success;
      toastType(toastMessage, { autoClose: 3000 });
    }
  };

  const handleEnterKeyPress = (e) => {
    if (isSocialMedia) {
      if (e.key === "Enter") {
        e.preventDefault();
        addSocialMedia();
      }
    }
  };

  if (!isSocialMedia)
    return (
      <div className="flex flex-col items-center w-full gap-1 sm:w-fit">
        <label htmlFor={name} className="self-start capitalize">
          {name}
        </label>

        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className={errors[name] ? `input ${customWidth} border-red-600` : `border-Silvermist input ${customWidth}`}
          onChange={onChange}
          value={value}
          disabled={generatedOutput && true}
        />
      </div>
    );

  return (
    <div className="flex items-center gap-2">
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        ref={ref}
        className="socialMedia-input transition-smooth border-Silvermist"
        value={value}
        onKeyDown={handleEnterKeyPress}
      />

      <span className={`px-3 py-[9.5px] capitalize rounded-md bg-Whisper text-Pewter hover:text-black transition-smooth border cursor-pointer`} onClick={addSocialMedia}>
        {!socialMedia.find((item) => Object.keys(item).includes(name)) ? "add" : "update"}
      </span>
    </div>
  );
});

Input.displayName = "Input";

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  socialMediaLink: PropTypes.string,
  dispatch: PropTypes.func,
  errors: PropTypes.object,
  generatedOutput: PropTypes.any,
  customWidth: PropTypes.string,
  socialMedia: PropTypes.array,
};

export default Input;
