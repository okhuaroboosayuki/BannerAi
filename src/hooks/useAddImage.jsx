import supabase from "../services/supabase";

const useAddImage = (imageInputRef, dispatchFn, image, imageInputName) => {
  const containsURL = image instanceof File;

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      cleanUp();
      return;
    }

    if (imageInputName !== "choose image" && !containsURL) {
      deleteImageFromDB();
    }

    if (file) {
      dispatchFn({ type: "image", payload: file });
      dispatchFn({ type: "imageInputName", payload: file.name });
    }
  };

  function cleanUp() {
    imageInputRef.current.value = null;
    imageInputRef.current.removeEventListener("change", handleFileChange);
  }

  async function deleteImageFromDB() {
    const { error } = await supabase.storage.from("image-store").remove([imageInputName]);
    if (error) console.error(error);
  }

  const handleAddImage = () => {
    imageInputRef.current.click();
    imageInputRef.current.addEventListener("change", handleFileChange);
  };

  const clearImageInput = async () => {
    if (!containsURL) {
      deleteImageFromDB();

      dispatchFn({ type: "image", payload: "" });
      dispatchFn({ type: "imageInputName", payload: "choose image" });
      cleanUp();
      return;
    }

    dispatchFn({ type: "image", payload: "" });
    dispatchFn({ type: "imageInputName", payload: "choose image" });
    cleanUp();
  };

  return { handleAddImage, clearImageInput, cleanUp };
};

export default useAddImage;
