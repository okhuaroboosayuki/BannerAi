import supabase from "../services/supabase";

/**
 * Custom hook to handle adding and clearing images.
 *
 * @param {object} imageInputRef - A React ref object attached to the file input element.
 * @param {function} dispatchFn - The dispatch function used to update the application state.
 * @param {object} state - The application state object, containing `image` (File or URL) and `imageInputName` (string).
 * @param {string|null} uuid - A unique identifier used for naming the uploaded image file in Supabase storage.
 *
 * @returns {object} An object containing the `handleAddImage`, `clearImageInput`, and `cleanUp` functions.
 */

const useAddImage = (imageInputRef, dispatchFn, state, uuid) => {
  const handleFileChange = (e) => {
    const containsURL = state.image instanceof File;

    const file = e.target.files[0];

    if (!file) {
      if (!containsURL) deleteImageFromDB();
      cleanUp();
      return;
    }

    if (state.imageInputName !== "choose image" && !containsURL) {
      deleteImageFromDB();
    }

    if (file) {
      dispatchFn({ type: "image", payload: file });
      dispatchFn({ type: "imageInputName", payload: file.name });
      cleanUp();
    }
  };

  function cleanUp() {
    imageInputRef.current.value = null;
    imageInputRef.current.removeEventListener("change", handleFileChange);
  }

  async function deleteImageFromDB() {
    const { error } = await supabase.storage.from("image-store").remove([`${state.imageInputName}-${uuid}`]);
    console.log(uuid);
    if (error) console.error(error);
  }

  const handleAddImage = () => {
    imageInputRef.current.click();
    imageInputRef.current.addEventListener("change", handleFileChange);
  };

  const clearImageInput = async () => {
    const containsURL = state.image instanceof File;

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
