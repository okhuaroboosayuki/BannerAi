import PropTypes from "prop-types";

const Input = ({ type, placeholder, name, value, socialMediaLink, onChange, dispatch, errors }) => {
  const isSocialMedia = ["facebook", "linkedin", "instagram", "X", "github", "behance", "dribble", "youtube", "website"].includes(name);

  const displayNameToKey = {
    "full name": "name",
    email: "email",
    profession: "profession",
  };

  const errorKey = displayNameToKey[name];

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
          className={errors[errorKey] ? "text-input border-red-600" : "border-Silvermist text-input"}
          onChange={onChange}
          value={value}
        />
        {errors[errorKey] && <p className="error">{errors[errorKey]}</p>}
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
        className={socialMediaLink ? "socialMedia-input border-Silvermist transition-smooth" : "socialMedia-input border-red-600"}
        value={value}
      />

      <span
        className={`px-3 py-[9.5px] capitalize rounded-md bg-Whisper text-Pewter hover:text-black transition-smooth border cursor-pointer`}
        onClick={() => socialMediaLink && dispatch({ type: "addSocialMedia" })}>
        add
      </span>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  socialMediaLink: PropTypes.string,
  dispatch: PropTypes.func,
  errors: PropTypes.object,
};

export default Input;
