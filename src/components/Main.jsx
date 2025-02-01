import { useEffect, useRef } from "react";
import useFormReducer from "../hooks/useFormReducer.jsx";
import { generateBanner } from "../services/gemini-service.js";
import { handleInputChange } from "../utils/handleInputChange .jsx";
import { handleValidation } from "../utils/handleValidation.jsx";
import Button from "./Button";
import Form from "./form/Form";
import Input from "./form/Input";
import SocialMediaField from "./form/SocialMediaField";
import Banner from "./modal/banners/Banner.jsx";
import Modal from "./modal/Modal.jsx";
import { ToastContainer } from "react-toastify";

const Main = () => {
  const smInputRef = useRef(null);

  const { state, dispatch } = useFormReducer();

  const { isLoading, name, email, profession, socialMedia, socialMediaLink, socialButtonClicked, socialMediaName, errors, generatedOutput } = state;

  useEffect(() => {
    if (socialButtonClicked && smInputRef.current) {
      smInputRef.current.focus();
    }
  }, [socialButtonClicked, socialMediaName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = handleValidation(state, dispatch);

    if (hasErrors) return;

    try {
      dispatch({ type: "loading", payload: true });

      const result = await generateBanner(name, email, profession, socialMedia);
      console.log(result);

      dispatch({ type: "submit", payload: result });
      console.log([name, email, profession, socialMedia, socialMediaLink, socialButtonClicked, socialMediaName, errors, generatedOutput]);
      dispatch({ type: "loading", payload: false });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
    console.log([name, email, profession, socialMedia, socialMediaLink, socialButtonClicked, socialMediaName, errors, generatedOutput]);
  };

  return (
    <main className="flex flex-col items-center justify-center w-full gap-9 sm:p-14 p-11">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-4xl font-bold sm:text-3xl text-Bluebell">Personalized Banners Designed for Your Profession</h1>
        <p className="text-lg text-Pewter">Transform Your Profile with Stunning Ai Banners</p>
      </div>

      <ToastContainer />

      <Form dispatch={handleSubmit}>
        <div className="flex gap-3">
          <Input
            type={"text"}
            placeholder={"John Doe"}
            name={"name"}
            onChange={(e) => handleInputChange("name", e.target.value, errors, dispatch)}
            value={name}
            customWidth={"sm:w-[245px] w-full"}
            errors={errors}
            generatedOutput={generatedOutput}
          />

          <Input
            type={"email"}
            placeholder={"johndoe@email.com"}
            name={"email"}
            onChange={(e) => handleInputChange("email", e.target.value, errors, dispatch)}
            value={email}
            customWidth={"sm:w-[245px] w-full"}
            errors={errors}
            generatedOutput={generatedOutput}
          />
        </div>

        <Input
          type={"text"}
          placeholder={"Sales Specialist"}
          name={"profession"}
          onChange={(e) => handleInputChange("profession", e.target.value, errors, dispatch)}
          value={profession}
          customWidth={"sm:w-[500px] w-full"}
          errors={errors}
          generatedOutput={generatedOutput}
        />

        <>
          <div className="grid grid-cols-2 gap-3 px-3 sm:grid-cols-4 h-[200px] sm:h-fit overflow-y-scroll scrollbar-hide">
            {["facebook", "linkedin", "X (twitter)", "instagram", "github", "behance", "dribble", "youtube", "website"].map((platform) => (
              <SocialMediaField key={platform} platform={platform} socialMedia={socialMedia} dispatch={dispatch} socialMediaName={socialMediaName} generatedOutput={generatedOutput} />
            ))}
          </div>
        </>

        {socialButtonClicked && (
          <Input
            type={"text"}
            placeholder={socialMediaName !== "website" ? `${socialMediaName} username` : `${socialMediaName} url`}
            width="325px"
            name={socialMediaName}
            onChange={(e) => dispatch({ type: "socialMediaLink", payload: e.target.value })}
            dispatch={dispatch}
            socialMediaLink={socialMediaLink}
            value={socialMedia[socialMediaName] ? socialMedia[socialMediaName] : socialMediaLink}
            ref={smInputRef}
            key={socialMediaName}
          />
        )}

        <Button type={"submit"} text={"generate banner"} className={"pry-button"} isLoading={isLoading} onClick={handleSubmit} />

        {generatedOutput && (
          <Modal>
            <Banner name={name} email={email} profession={profession} socialMedia={socialMedia} generatedOutput={generatedOutput} />

            <div className="flex justify-center gap-8">
              <Button type={"reset"} text={"reset"} className={"secondary-button"} onClick={handleReset} />
              <Button type={"button"} text={"download banner"} className={"pry-button"} />
            </div>
          </Modal>
        )}
      </Form>
    </main>
  );
};

export default Main;
