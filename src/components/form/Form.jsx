import PropTypes from "prop-types";

const Form = ({ dispatch, children }) => {
  return (
    <form className="flex flex-col items-center w-full h-full gap-5" onSubmit={dispatch}>
      {children}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func,
};
export default Form;
