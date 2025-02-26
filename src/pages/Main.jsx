import { useCallback, useEffect, useRef } from "react";
import useFormReducer from "../hooks/useFormReducer.jsx";
import { generateBanner } from "../services/generateBanner.js";
import { handleInputChange, handleValidation } from "../utils";
import { toast, ToastContainer } from "react-toastify";
import { toPng } from "html-to-image";
import { Button, Form, Input, Modal, SimpleBanner, SocialMediaField } from "../components";

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

  useEffect(() => {
    if (openModal) document.body.style.overflow = "hidden";
    if (!openModal) document.body.style.overflow = "auto";
  }, [openModal]);

  const handleViewModal = () => {
    dispatch({ type: "modal", payload: !openModal });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = handleValidation(state, dispatch);

    if (hasErrors) return;

    try {
      dispatch({ type: "loading", payload: true });
      toast.loading("Generating banner", { position: "top-center", autoClose: false });

      const result = await generateBanner(name, email, profession, socialMedia);
      toast.dismiss();

      dispatch({ type: "submit", payload: result });

      // store result in local storage
      localStorage.setItem("generatedOutput", JSON.stringify(result));

      dispatch({ type: "modal", payload: true });
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred. Please try again.", { position: "top-center" });
      console.error(error.message);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  };

  const handleDownload = useCallback(() => {
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
        toast.error("An error occurred while downloading the banner", { position: "top-center" });
        console.error(error);
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
    <main className={`flex flex-col items-center justify-center w-full gap-6 sm:p-14 p-11 ${openModal ? "" : "mt-20 sm:mt-16"}`}>
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-4xl font-bold sm:text-3xl text-Bluebell">Personalized Banners Designed for Your Profession</h1>
        <p className="text-lg text-Pewter">Transform Your Profile with Stunning Banners</p>
      </div>

      <ToastContainer draggable />

      <Form dispatch={handleSubmit}>
        <div className="flex flex-col items-center justify-center sm:flex-row gap-3 w-full">
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
          <div className="grid grid-cols-2 gap-3 px-3 sm:grid-cols-4 h-[200px] sm:h-fit overflow-y-scroll scrollbar-hide w-full sm:w-fit">
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

        {!generatedOutput ? (
          <Button type={"submit"} text={"generate banner"} className={"blue-button mt-3"} isLoading={isLoading} onClick={handleSubmit} disabled={isLoading} />
        ) : (
          <div className="flex md:flex-row flex-col items-center justify-center gap-3 sm:w-[500px] w-full">
            <Button type={"button"} text={"view results"} className={"blue-button"} onClick={handleViewModal} />
            <Button type={"button"} text={"edit"} className={"grey-button"} />
            <Button type={"reset"} text={"reset"} className={"red-button"} onClick={handleReset} />
          </div>
        )}
      </Form>

      {openModal && generatedOutput && (
        <Modal>
          <SimpleBanner name={name} email={email} profession={profession} socialMedia={socialMedia} generatedOutput={generatedOutput} ref={bannerRef} />

          <div className="justify-center gap-4 lg:gap-8 landscape:flex portrait:hidden">
            <Button type={"button"} text={"hide results"} className={"white-button"} onClick={handleViewModal} />
            <Button type={"button"} text={"download banner"} className={"blue-button"} onClick={handleDownload} isLoading={isLoading} disabled={isLoading} />
          </div>
        </Modal>
      )}
    </main>
  );
};

export default Main;
