import { PropTypes } from "prop-types";

const Button = ({ type, text, className, isLoading, onClick, disabled }) => {
  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {isLoading ? "loading..." : text}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.any,
  onClick: PropTypes.func,
};

export default Button;
