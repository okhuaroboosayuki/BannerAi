/**
 * This hook is used to toggle the modal state.
 * @param {function} dispatchFn - The dispatch function
 * @param {boolean} openModal - The openModal state
 * @returns {object} The handleViewModal function
 */

const useViewModal = (dispatchFn, openModal) => {
  const handleViewModal = () => {
    dispatchFn({ type: "modal", payload: !openModal });
  };

  return { handleViewModal };
};

export default useViewModal;
