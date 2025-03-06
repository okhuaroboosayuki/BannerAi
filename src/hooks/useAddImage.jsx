import { truncateFilename } from "../utils";

const useAddImage = (imageInputRef, dispatchFn) => {
  const handleAddImage = () => {
    imageInputRef.current.click();

    const handleFileChange = (e) => {
      const file = e.target.files[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        const shortFileName = truncateFilename(file.name, 15);

        dispatchFn({ type: "image", payload: imageUrl });
        dispatchFn({ type: "imageInputName", payload: shortFileName });
      }

      imageInputRef.current.value = null;
      imageInputRef.current.removeEventListener("change", handleFileChange);
    };

    imageInputRef.current.addEventListener("change", handleFileChange);
  };

  const clearImageInput = () => {
    dispatchFn({ type: "image", payload: "" });
    dispatchFn({ type: "imageInputName", payload: "choose image" });
  };

  return { handleAddImage, clearImageInput };
};

export default useAddImage;
