import { toast } from "react-toastify";
import supabase from "../services/supabase";

/**
 * This hook is used to reset the state of the application, clear the local storage,
 * remove the uploaded image from Supabase storage (if applicable).
 *
 * @param {string|null} image - The URL or path of the uploaded image
 * @param {string|null} imageInputName - The name of the uploaded image file
 * @param {function} dispatchFn - The dispatch function
 * @returns {object} The handleReset function
 */

const useReset = (image, imageInputName, dispatchFn) => {
  const handleReset = () => {
    dispatchFn({ type: "reset" });
    localStorage.removeItem("generatedOutput");

    if (image) {
      const { error } = supabase.storage.from("image-store").remove(imageInputName);
      toast.error(error.message);
      console.log(error);
    }

    console.clear();
    toast.dismiss();
    toast.success("Reset successful!", { autoClose: 3000 });
  };

  return { handleReset };
};

export default useReset;
