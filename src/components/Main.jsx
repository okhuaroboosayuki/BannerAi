import { useCallback, useEffect, useRef } from "react";
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
import { toast, ToastContainer } from "react-toastify";
import { toPng } from "html-to-image";

const Main = () => {
  const smInputRef = useRef(null);
  const bannerRef = useRef(null);

  const { state, dispatch } = useFormReducer();

  const { isLoading, name, email, profession, socialMedia, socialMediaLink, socialButtonClicked, socialMediaName, errors, generatedOutput, openModal } = state;

  useEffect(() => {
    if (socialButtonClicked && smInputRef.current) {
      smInputRef.current.focus();
    }
  }, [socialButtonClicked, socialMediaName]);

  const handleViewModal = (value) => {
    dispatch({ type: "modal", payload: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = handleValidation(state, dispatch);

    if (hasErrors) return;

    try {
      dispatch({ type: "loading", payload: true });
      toast.loading("Generating banner", { position: "top-center", autoClose: false });

      const result = await generateBanner(name, email, profession, socialMedia);
      console.log(result);
      toast.dismiss();

      dispatch({ type: "submit", payload: result });
      dispatch({ type: "modal", payload: true });
      console.log([
        { name: name },
        { email: email },
        { profession: profession },
        { socialMedia: socialMedia },
        { socialMediaLink: socialMediaLink },
        { socialButtonClicked: socialButtonClicked },
        { socialMediaName: socialMediaName },
        { errors: errors },
        { generatedOutput: generatedOutput },
        { openModal: openModal },
      ]);
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred. Please try again.", { position: "top-center" });
      console.error(error.message);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  };

  const handleDownload = useCallback(() => {
    console.log("Downloading banner");

    const bannerCanvas = bannerRef.current;
    if (!bannerCanvas) return;

    dispatch({ type: "loading", payload: true });
    toast.loading("Downloading banner", { position: "top-center", autoClose: false });

    toPng(bannerCanvas, { cacheBust: true, quality: 1 })
      .then((dataUrl) => {
        const link = document.createElement("a");

        const firstName = name.split(" ").splice(0, 1);
        const lastName = name.split(" ").splice(-1);

        if (!lastName) link.download = `${firstName}-banner.png`;
        if (lastName) link.download = `${firstName}-${lastName}-banner.png`;

        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error("An error occurred while downloading the banner", error);
        toast.error("An error occurred while downloading the banner", { position: "top-center" });
      })
      .finally(() => {
        toast.dismiss();
        dispatch({ type: "loading", payload: false });
      });
  }, [dispatch, name]);

  const handleReset = () => {
    dispatch({ type: "reset" });
    console.clear();
  };

  return (
    <main className="flex flex-col items-center justify-center w-full gap-9 sm:p-14 p-11">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-4xl font-bold sm:text-3xl text-Bluebell">Personalized Banners Designed for Your Profession</h1>
        <p className="text-lg text-Pewter">Transform Your Profile with Stunning Ai Banners</p>
      </div>

      <ToastContainer draggable />

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
            socialMedia={socialMedia}
            value={socialMedia[socialMediaName] ? socialMedia[socialMediaName] : socialMediaLink}
            ref={smInputRef}
            key={socialMediaName}
          />
        )}

        <Button
          type={!generatedOutput ? "submit" : "reset"}
          text={!generatedOutput ? "generate banner" : "reset"}
          className={!generatedOutput ? `pry-button ${generatedOutput || isLoading ? "bg-Bluebell" : ""}` : "button bg-red-700 text-white hover:bg-red-500"}
          isLoading={isLoading}
          onClick={!generatedOutput ? handleSubmit : handleReset}
          disabled={isLoading}
        />
      </Form>

      {openModal && generatedOutput && (
        <Modal>
          <span className="self-end cursor-pointer" onClick={() => handleViewModal(false)}>
            minimize modal
          </span>

          <Banner name={name} email={email} profession={profession} socialMedia={socialMedia} generatedOutput={generatedOutput} ref={bannerRef} />

          <div className="flex justify-center gap-8">
            <Button type={"reset"} text={"reset"} className={"button bg-red-700 text-white hover:bg-red-500"} onClick={handleReset} />
            <Button type={"button"} text={"edit"} className={"button bg-gray-500 text-white hover:bg-gray-600"} />
            <Button type={"button"} text={"download banner"} className={"pry-button"} onClick={handleDownload} isLoading={isLoading} disabled={isLoading} />
          </div>
        </Modal>
      )}
    </main>
  );
};

export default Main;
