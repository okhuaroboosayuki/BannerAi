import { toast } from "react-toastify";
import { handleValidation } from "../utils";
import { generateBanner } from "../services/generateBanner";

const useSubmit = (state, dispatchFn, profession) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = handleValidation(state, dispatchFn);

    if (hasErrors) return;

    try {
      dispatchFn({ type: "loading", payload: true });
      toast.loading("Generating banner", { position: "top-center", autoClose: false });

      const result = await generateBanner(profession);
      toast.dismiss();

      dispatchFn({ type: "submit", payload: result });

      // store result in local storage
      localStorage.setItem("generatedOutput", JSON.stringify(result));

      dispatchFn({ type: "modal", payload: true });
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred. Please try again.", { position: "top-center" });
      console.error(error.message);
    } finally {
      dispatchFn({ type: "loading", payload: false });
    }
  };

  return { handleSubmit };
};

export default useSubmit;
