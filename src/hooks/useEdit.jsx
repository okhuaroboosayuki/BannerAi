/**
 * This hook is used to handle the edit state of the component.
 * @param {function} dispatchFn - The dispatch function
 * @param {boolean} editable - The editable state
 * @returns {object} The handleEdit function
 */

const useEdit = (dispatchFn, editable) => {
  const handleEdit = () => {
    dispatchFn({ type: "edit", payload: !editable });
  };

  return { handleEdit };
};

export default useEdit;
