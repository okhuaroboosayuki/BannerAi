import { toast } from "react-toastify";
import { handleValidation } from "../utils";
import { generateBanner } from "../services/generateBanner";
import supabase from "../services/supabase";

/**
 * Custom hook to handle form submission and banner generation.
 *
 * @param {object} state - The form state object containing input values, including `image` (File or URL), `profession` (string), and `editable` (boolean).
 * @param {function} dispatchFn - The dispatch function used to update the application state.
 * @param {string|null} uuid - A unique identifier used for naming the uploaded image file.
 *
 * @returns {object} An object containing the `handleSubmit` function.
 */

const useSubmit = (state, dispatchFn, uuid) => {
  async function uploadImage() {
    const { error } = await supabase.storage.from("image-store").upload(`${state.image.name}-${uuid}`, state.image);
    console.log(uuid);

    if (error) {
      if (error.message === "The object exceeded the maximum allowed size") {
        dispatchFn({ type: "loading", payload: false });
        throw new Error("Image file too large. Must be less then 3MB");
      }

      if (error.message === "mime type image/svg+xml is not supported") {
        dispatchFn({ type: "loading", payload: false });
        throw new Error("File type not supported");
      }
    }

    const { data: url } = supabase.storage.from("image-store").getPublicUrl(`${state.image.name}-${uuid}`);

    dispatchFn({ type: "image", payload: url.publicUrl });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = handleValidation(state, dispatchFn);

    if (hasErrors) return;

    try {
      dispatchFn({ type: "loading", payload: true });
      toast.loading("Generating banner", { position: "top-center", autoClose: false });

      if (state.image instanceof File) await uploadImage();

      // check if editable is true and there is a generated output in local storage
      const generatedOutputInLocalStorage = JSON.parse(localStorage.getItem("generatedOutput"));
      if (state.editable && generatedOutputInLocalStorage) {
        dispatchFn({ type: "submit", payload: generatedOutputInLocalStorage });
        dispatchFn({ type: "modal", payload: true });
        dispatchFn({ type: "loading", payload: false });
        dispatchFn({ type: "edit", payload: !state.editable });
        toast.dismiss();
        return;
      }

      const result = await generateBanner(state.profession);

      dispatchFn({ type: "submit", payload: result });

      // store result in local storage
      localStorage.setItem("generatedOutput", JSON.stringify(result));

      dispatchFn({ type: "edit", payload: !state.editable });
      dispatchFn({ type: "modal", payload: true });
      toast.dismiss();
    } catch (error) {
      if (error instanceof TypeError && (error.message.includes("Failed to fetch") || error.message.includes("NetworkError") || error.message.includes("net::ERR_INTERNET_DISCONNECTED"))) {
        toast.dismiss();
        toast.error("Network error. Please check your internet connection and try again.", { autoClose: false });
        dispatchFn({ type: "loading", payload: false });
        return;
      } else {
        toast.dismiss();
        toast.error(error.message, { position: "top-center", autoClose: 3000 });
        console.error(error.message);
      }
    } finally {
      dispatchFn({ type: "loading", payload: false });
    }
  };

  return { handleSubmit };
};

export default useSubmit;
