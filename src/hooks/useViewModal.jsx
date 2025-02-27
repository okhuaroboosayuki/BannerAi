const useViewModal = (dispatchFn, openModal) => {
  const handleViewModal = () => {
    dispatchFn({ type: "modal", payload: !openModal });
  };

  return { handleViewModal };
};

export default useViewModal;
