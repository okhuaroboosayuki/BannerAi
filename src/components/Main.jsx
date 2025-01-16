import useFormReducer from "../reducer/useFormReducer.jsx";
import { handleInputChange } from "../utils/handleInputChange .jsx";
import { handleValidation } from "../utils/handleValidation.jsx";
import Button from "./Button";
import Form from "./form/Form";
import Input from "./form/Input";
import SocialMediaField from "./form/SocialMediaField";

const Main = () => {
  const { state, dispatch } = useFormReducer();

  const { isLoading, name, email, profession, socialMedia, socialMediaLink, socialButtonClicked, socialMediaName, errors } = state;

  const handleSubmit = (e) => {
    e.preventDefault();

    handleValidation(state, dispatch);

    const hasErrors = Object.values(state.errors).some((error) => error);

    if (!hasErrors) {
      dispatch({ type: "loading" });

      setTimeout(() => {
        // Complete submission and reset state

        const formFilled = name && email && profession && socialMedia.length > 0;

        if (formFilled) {
          // Submit the form
          console.log(name, email, profession, socialMedia, socialMediaLink, isLoading);
          dispatch({ type: "submit" });
        } else {
          console.log(name, email, profession, socialMedia, socialMediaLink, isLoading);
          console.error("Form is incomplete");
          dispatch({ type: "loading", payload: false });
        }
      }, 2000);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center w-full gap-9 sm:p-14 p-11">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-4xl font-bold sm:text-3xl text-Bluebell">Personalized Banners Designed for Your Profession</h1>
        <p className="text-lg text-Pewter">Transform Your Profile with Stunning Ai Banners</p>
      </div>

      <Form dispatch={handleSubmit}>
        <Input type={"text"} placeholder={"John Doe"} name={"full name"} onChange={(e) => handleInputChange("name", e.target.value, errors, dispatch)} value={name} errors={errors} />

        <Input type={"email"} placeholder={"johndoe@email.com"} name={"email"} onChange={(e) => handleInputChange("email", e.target.value, errors, dispatch)} value={email} errors={errors} />

        <Input type={"text"} placeholder={"Sales Specialist"} name={"profession"} onChange={(e) => handleInputChange("profession", e.target.value, errors, dispatch)} value={profession} errors={errors} />

        <div className="grid grid-cols-2 gap-3 px-3 sm:grid-cols-4 h-[200px] sm:h-fit overflow-y-scroll scrollbar-hide">
          {["facebook", "linkedin", "instagram", "X", "github", "behance", "dribble", "youtube", "website"].map((platform) => (
            <SocialMediaField key={platform} platform={platform} socialMedia={socialMedia} dispatch={dispatch} socialMediaName={socialMediaName} />
          ))}
        </div>

        {socialButtonClicked && (
          <Input
            type={"text"}
            placeholder={socialMediaName !== "website" ? `${socialMediaName} username` : `${socialMediaName} url`}
            width="325px"
            name={socialMediaName}
            onChange={(e) => handleInputChange("socialMediaLink", e.target.value, errors, dispatch)}
            dispatch={dispatch}
            value={socialMediaLink}
            key={socialMediaName}
          />
        )}

        <Button text={"generate banner"} isLoading={isLoading} />
      </Form>
    </main>
  );
};

export default Main;
