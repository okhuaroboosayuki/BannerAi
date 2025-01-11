import PropTypes from "prop-types";

const Input = ({ type, placeholder, name }) => {
  const isText = type === "text";

  return (
    <div className={`flex ${isText ? "flex-col" : "flex-row"} items-start gap-1 capitalize`}>
      {isText && <label htmlFor={name}>{name}</label>}
      <input type={type} name={name} id={name} placeholder={placeholder} className={isText ? "text-input" : ""} />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string,
};

export default Input;
