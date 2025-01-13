import PropTypes from "prop-types";

const Input = ({ type, placeholder, name, display = "none" }) => {
  const isNotSocialMedia = name !== "facebook" && name !== "twitter" && name !== "instagram" && name !== "linkedin" && name !== "github" && name !== "behance" && name !== "dribble" && name !== "youtube" && name !== "X" && name !== "website";

  if (isNotSocialMedia)
    return (
      <div className="flex flex-col items-center w-full gap-1 capitalize sm:w-fit">
        <label htmlFor={name} className="self-start">
          {name}
        </label>
        <input type={type} name={name} id={name} placeholder={placeholder} className={"text-input"} />
      </div>
    );

  return <input type={type} name={name} id={name} placeholder={placeholder} className={"text-input transition-smooth"} style={{ display }} />;
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.string,
  display: PropTypes.string,
};

export default Input;
