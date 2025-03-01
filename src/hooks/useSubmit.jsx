import { toast } from "react-toastify";
import { handleValidation } from "../utils";
import { generateBanner } from "../services/generateBanner";

const useSubmit = (state, dispatchFn, profession, editable) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = handleValidation(state, dispatchFn);

    if (hasErrors) return;

    try {
      dispatchFn({ type: "loading", payload: true });
      toast.loading("Generating banner", { position: "top-center", autoClose: false });

      // check if editable is true and there is a generated output in local storage
      const generatedOutputInLocalStorage = JSON.parse(localStorage.getItem("generatedOutput"));
      if (editable && generatedOutputInLocalStorage) {
        dispatchFn({ type: "submit", payload: generatedOutputInLocalStorage });
        dispatchFn({ type: "modal", payload: true });
        dispatchFn({ type: "loading", payload: false });
        dispatchFn({ type: "edit", payload: !editable });
        return;
      }

      const result = await generateBanner(profession);

      dispatchFn({ type: "submit", payload: result });

      // store result in local storage
      localStorage.setItem("generatedOutput", JSON.stringify(result));

      dispatchFn({ type: "edit", payload: !editable });
      dispatchFn({ type: "modal", payload: true });
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred. Please try again.", { position: "top-center", autoClose: false });
      console.error(error.message);
    } finally {
      toast.dismiss();
      dispatchFn({ type: "loading", payload: false });
    }
  };

  return { handleSubmit };
};

export default useSubmit;
