import PropTypes from "prop-types";

const Form = ({ children }) => {
  return <form className="flex flex-col items-center w-full gap-5">{children}</form>;
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Form;
