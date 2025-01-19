import { PropTypes } from "prop-types";

const Button = ({ text, isLoading }) => {
  return (
    <button type="submit" className="button">
      {isLoading ? "loading..." : text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

export default Button;
