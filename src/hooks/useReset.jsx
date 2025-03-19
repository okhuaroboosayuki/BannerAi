import { toast } from "react-toastify";
import supabase from "../services/supabase";

/**
 * This hook is used to reset the state of the application, clear the local storage,
 * remove the uploaded image from Supabase storage (if applicable).
 *
 * @param {object} state - The application state object, containing `image` (URL or path) and `imageInputName`.
 * @param {function} dispatchFn - The dispatch function used to update the application state.
 * @param {string|null} uuid - The unique identifier associated with the uploaded image.
 *
 * @returns {object} An object containing the `handleReset` function.
 */

const useReset = (state, dispatchFn, uuid) => {
  const handleReset = () => {
    dispatchFn({ type: "reset" });
    localStorage.removeItem("generatedOutput");

    if (state.image) {
      const { error } = supabase.storage.from("image-store").remove([`${state.imageInputName}-${uuid}`]);

      if (error) {
        toast.error(error.message);
        console.log(error);
      }
    }

    toast.dismiss();
    toast.success("Reset successful!", { autoClose: 3000 });
  };

  return { handleReset };
};

export default useReset;
