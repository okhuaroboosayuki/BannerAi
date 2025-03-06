const useAddImage = (imageInputRef, dispatchFn) => {
  const handleAddImage = () => {
    imageInputRef.current.click();

    const handleFileChange = (e) => {
      const file = e.target.files[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);

        dispatchFn({ type: "image", payload: imageUrl });
        dispatchFn({ type: "imageInputName", payload: file.name });
      }

      imageInputRef.current.value = null;
      imageInputRef.current.removeEventListener("change", handleFileChange);
    };

    imageInputRef.current.addEventListener("change", handleFileChange);
  };

  return { handleAddImage };
};

export default useAddImage;
