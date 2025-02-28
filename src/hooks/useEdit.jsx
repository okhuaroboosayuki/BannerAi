const useEdit = (dispatchFn, editable) => {
  const handleEdit = () => {
    dispatchFn({ type: "edit", payload: !editable });
  };

  return { handleEdit };
};

export default useEdit;
