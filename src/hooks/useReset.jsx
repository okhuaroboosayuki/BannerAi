/**
 * This hook is used to reset the state of the application and clear the local storage.
 * @param {function} dispatchFn - The dispatch function
 * @returns {object} The handleReset function
 */

const useReset = (dispatchFn) => {
  const handleReset = () => {
    dispatchFn({ type: "reset" });
    localStorage.removeItem("generatedOutput");
    console.clear();
  };

  return { handleReset };
};

export default useReset;
