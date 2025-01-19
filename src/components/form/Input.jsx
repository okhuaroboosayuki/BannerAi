import PropTypes from "prop-types";
import { forwardRef } from "react";

const Input = forwardRef(({ type, placeholder, name, value, socialMediaLink, onChange, dispatch, errors }, ref) => {
  const isSocialMedia = ["facebook", "linkedin", "instagram", "X (twitter)", "github", "behance", "dribble", "youtube", "website"].includes(name);

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
      <input type={type} name={name} id={name} placeholder={placeholder} onChange={onChange} ref={ref} className="socialMedia-input transition-smooth border-Silvermist" value={value} />

      <span
        className={`px-3 py-[9.5px] capitalize rounded-md bg-Whisper text-Pewter hover:text-black transition-smooth border cursor-pointer`}
        onClick={() =>
          !socialMediaLink
            ? dispatch({ type: "error", payload: { name: "socialMedia", error: `A ${name} ${name !== "website" ? "username" : "URL"} must be provided` } })
            : dispatch({ type: "addSocialMedia" })
        }>
        add
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
};

export default Input;
