import PropTypes from "prop-types";

const Form = ({ children }) => {
  return (
    <form className="flex flex-col items-center w-full h-full gap-7 sm:gap-5" onSubmit={(e) => e.preventDefault()}>
      {children}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func,
};
export default Form;
