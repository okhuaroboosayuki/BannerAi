import PropTypes from "prop-types";

const Modal = ({ children }) => {
  return (
    <div className="absolute top-0 left-0 z-50 flex flex-col items-center w-full h-full py-5 xl:h-screen portrait:justify-start lg:py-10 md:px-8 lg:px-28 xl:py-20 justify-evenly xl:px-60 bg-Silvermist/90">
      {children}
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
