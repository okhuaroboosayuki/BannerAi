import { PropTypes } from "prop-types";

const Button = ({ type, text, className, isLoading, onClick }) => {
  return (
    <button type={type} className={className} onClick={onClick} disabled={isLoading}>
      {isLoading ? "loading..." : text}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
