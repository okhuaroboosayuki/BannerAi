import supabase from "../services/supabase";

const useAddImage = (imageInputRef, dispatchFn, image, imageInputName) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      cleanUp();
      return;
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

  const handleAddImage = () => {
    imageInputRef.current.click();
    imageInputRef.current.addEventListener("change", handleFileChange);
  };

  const clearImageInput = async () => {
    const containsWebLink = image instanceof File;

    if (!containsWebLink) {
      const { error } = await supabase.storage.from("image-store").remove([imageInputName]);
      console.log("image cleared");
      if (error) console.log(error);

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
