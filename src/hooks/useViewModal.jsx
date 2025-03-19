/**
 * This hook is used to toggle the modal state.
 *
 * @param {function} dispatchFn - The dispatch function used to update the modal's open state.
 * @param {boolean} openModal - The current open state of the modal.
 *
 * @returns {object} An object containing the `handleViewModal` function, which toggles the modal's open state.
 */

const useViewModal = (dispatchFn, openModal) => {
  const handleViewModal = () => {
    dispatchFn({ type: "modal", payload: !openModal });
  };

  return { handleViewModal };
};

export default useViewModal;
