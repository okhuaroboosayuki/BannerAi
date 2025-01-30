import PropTypes from "prop-types";

const Modal = ({ children }) => {
  return <div className="absolute top-0 left-0 z-50 flex flex-col items-center w-full min-h-screen py-20 justify-evenly px-60 bg-Silvermist/90">{children}</div>;
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
