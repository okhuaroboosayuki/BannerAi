const useReset = (dispatchFn) => {
  const handleReset = () => {
    dispatchFn({ type: "reset" });
    console.clear();
  };

  return { handleReset };
};

export default useReset;
