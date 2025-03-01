const useReset = (dispatchFn) => {
  const handleReset = () => {
    dispatchFn({ type: "reset" });
    localStorage.removeItem("generatedOutput");
    console.clear();
  };

  return { handleReset };
};

export default useReset;
