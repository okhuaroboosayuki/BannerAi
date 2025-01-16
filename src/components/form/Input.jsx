import PropTypes from "prop-types";

const Input = ({ type, placeholder, name, value, onChange, dispatch, errors }) => {
  const isNotSocialMedia = name !== "facebook" && name !== "twitter" && name !== "instagram" && name !== "linkedin" && name !== "github" && name !== "behance" && name !== "dribble" && name !== "youtube" && name !== "X" && name !== "website";

  const displayNameToKey = {
    "full name": "name",
    email: "email",
    profession: "profession",
    "social media": "socialMedia",
  };

  const errorKey = displayNameToKey[name];

  if (isNotSocialMedia)
    return (
      <div className="flex flex-col items-center w-full gap-1 capitalize sm:w-fit">
        <label htmlFor={name} className="self-start">
          {name}
        </label>
        <input type={type} name={name} id={name} placeholder={placeholder} className={errors[errorKey] ? "text-input border-red-600" : "border-Silvermist text-input"} onChange={onChange} value={value} />
        {errors[errorKey] && <p className="error">{errors[errorKey]}</p>}
      </div>
    );

  return (
    <div className="flex items-center gap-2">
      <input type={type} name={name} id={name} placeholder={placeholder} onChange={onChange} className={"scoialMedia-input transition-smooth"} value={value} />

      <span className="px-3 py-[9.5px] capitalize rounded-md bg-Whisper text-Pewter hover:text-black transition-smooth border cursor-pointer" onClick={() => dispatch({ type: "addSocialMedia" })}>
        add
      </span>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  socialButtonClicked: PropTypes.bool,
  dispatch: PropTypes.func,
  errors: PropTypes.object,
};

export default Input;
