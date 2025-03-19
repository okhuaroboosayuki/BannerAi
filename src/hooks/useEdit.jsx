/**
 * This hook is used to handle the edit state of the component.
 *
 * @param {function} dispatchFn - The dispatch function used to update the component's state.
 * @param {boolean} editable - The current editable state of the component.
 *
 * @returns {object} An object containing the `handleEdit` function, which toggles the editable state.
 */

const useEdit = (dispatchFn, editable) => {
  const handleEdit = () => {
    dispatchFn({ type: "edit", payload: !editable });
  };

  return { handleEdit };
};

export default useEdit;
