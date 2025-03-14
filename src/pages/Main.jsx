import { useEffect, useRef } from "react";
import { handleInputChange, truncateFilename } from "../utils";
import { ToastContainer } from "react-toastify";
import { Button, Form, Input, Modal, SocialMediaField } from "../components";
import { useAddImage, useDownload, useEdit, useFormReducer, useReset, useSubmit, useViewModal } from "../hooks";
import cancelIcon from "../assets/icons/icons8-cancel-red.svg";

const Main = () => {
  const smInputRef = useRef(null);
  const bannerRef = useRef(null);
  const imageInputRef = useRef(null);

  const { state, dispatch } = useFormReducer();

  const { isLoading, name, email, profession, image, imageInputName, socialMedia, socialMediaLink, socialButtonClicked, socialMediaName, errors, generatedOutput, openModal, editable } = state;

  useEffect(() => {
    if (socialButtonClicked && smInputRef.current) {
      smInputRef.current.focus();
    }
  }, [socialButtonClicked, socialMediaName]);

  const { handleViewModal } = useViewModal(dispatch, openModal);

  const { handleSubmit } = useSubmit(state, dispatch, profession, editable);

  const { handleDownload } = useDownload(bannerRef, name, dispatch);

  const { handleEdit } = useEdit(dispatch, editable);

  const { handleReset } = useReset(image, imageInputName, dispatch);

  const { handleAddImage, clearImageInput } = useAddImage(imageInputRef, dispatch, image, imageInputName);

  return (
    <main className="flex flex-col items-center justify-center w-full gap-6 py-5 sm:px-14 px-11">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-4xl font-bold sm:text-3xl text-Bluebell">Personalized Banners Designed for Your Profession</h1>
        <p className="text-lg text-Pewter">Transform Your Profile with Stunning Banners</p>
      </div>

      <ToastContainer draggable />

      <Form>
        <div className="flex flex-col items-center justify-center w-full gap-3 sm:flex-row">
          <Input
            type={"text"}
            placeholder={"John Doe"}
            name={"name"}
            onChange={(e) => handleInputChange("name", e.target.value, errors, dispatch)}
            value={name}
            customWidth={"sm:w-[245px] w-full"}
            errors={errors}
            editable={editable}
          />

          <Input
            type={"email"}
            placeholder={"johndoe@email.com"}
            name={"email"}
            onChange={(e) => handleInputChange("email", e.target.value, errors, dispatch)}
            value={email}
            customWidth={"sm:w-[245px] w-full"}
            errors={errors}
            editable={editable}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-3 sm:flex-row">
          <Input
            type={"text"}
            placeholder={"Sales Specialist"}
            name={"profession"}
            onChange={(e) => handleInputChange("profession", e.target.value, errors, dispatch)}
            value={profession}
            customWidth={"sm:w-[245px] w-full"}
            errors={errors}
            editable={editable}
          />

          <div className="flex flex-col items-center w-full gap-1 sm:w-fit">
            <label htmlFor="image" className="self-start capitalize">
              image <span className="text-xs">(optional)</span>
            </label>

            <div
              className={`flex items-center justify-between border-Silvermist input sm:w-[245px] w-full text-sm text-gray-400 ${!editable ? "bg-gray-200 cursor-not-allowed" : ""}`}
              title="*jpg, *jpeg, *png, or *webp">
              <button
                type="button"
                className={`${imageInputName !== "choose image" ? "lowercase" : "capitalize"} ${!editable ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={handleAddImage}
                disabled={!editable || isLoading}>
                {truncateFilename(imageInputName, 15)}
                <input type="file" name="image" id="image" className="hidden" accept="image/*" ref={imageInputRef} />
              </button>

              <button
                className={image || imageInputName !== "choose image" ? `block ${!editable ? "cursor-not-allowed" : "cursor-pointer"}` : "hidden"}
                onClick={editable ? clearImageInput : undefined}
                disabled={!editable || isLoading}>
                <img src={cancelIcon} alt="clear input icon" width={20} height={20} />
              </button>
            </div>
          </div>
        </div>

        <>
          <div className="grid grid-cols-2 gap-3 px-3 sm:grid-cols-4 h-[200px] sm:h-fit overflow-y-scroll scrollbar-hide w-full sm:w-fit">
            {["facebook", "linkedin", "X (twitter)", "instagram", "github", "behance", "dribble", "youtube", "website"].map((platform) => (
              <SocialMediaField key={platform} platform={platform} socialMedia={socialMedia} dispatch={dispatch} socialMediaName={socialMediaName} editable={editable} />
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
          <Button type={"submit"} text={"generate banner"} className={"blue-button mt-3 sm:mt-0"} isLoading={isLoading} onClick={handleSubmit} disabled={isLoading} />
        ) : (
          <div className={`grid sm:grid-cols-2 sm:w-[500px] w-full gap-3 grid-cols-1 place-items-center`}>
            <Button
              type={!editable ? "button" : "submit"}
              text={!editable ? "view results" : "view new results"}
              className={"blue-button"}
              onClick={!editable ? handleViewModal : handleSubmit}
              isLoading={isLoading}
              disabled={isLoading}
            />
            <Button type={"button"} text={"edit"} className={`grey-button ${!editable ? "" : "cursor-not-allowed"}`} onClick={editable ? undefined : handleEdit} disabled={editable} />
            <Button type={"reset"} text={"reset"} className={"red-button"} onClick={handleReset} />
          </div>
        )}
      </Form>

      {openModal && generatedOutput && (
        <Modal
          name={name}
          email={email}
          image={image}
          profession={profession}
          socialMedia={socialMedia}
          generatedOutput={generatedOutput}
          bannerRef={bannerRef}
          isLoading={isLoading}
          onViewModal={handleViewModal}
          onDownload={handleDownload}
        />
      )}
      {/* <SimpleBanner name={name} email={email} profession={profession} socialMedia={socialMedia} generatedOutput={generatedOutput} ref={bannerRef} />

          <div className="justify-center gap-4 lg:gap-8 landscape:flex portrait:hidden sm:-mt-16 lg:mt-0">
            <Button type={"button"} text={"hide results"} className={"white-button"} onClick={handleViewModal} />
            <Button type={"button"} text={"download banner"} className={"blue-button"} onClick={handleDownload} isLoading={isLoading} disabled={isLoading} />
          </div>
        </Modal>
      )} */}
    </main>
  );
};

export default Main;
