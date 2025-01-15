import useFormReducer from "../reducer/useFormReducer.jsx";
import Button from "./Button";
import Form from "./form/Form";
import Input from "./form/Input";
import SocialMediaField from "./form/SocialMediaField";

const Main = () => {
  const { state, dispatch } = useFormReducer();

  const { name, email, profession, socialMedia, socialMediaLink, socialButtonClicked, socialMediaName } = state;

  return (
    <main className="flex flex-col items-center justify-center w-full gap-9 sm:p-14 p-11">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-4xl font-bold sm:text-3xl text-Bluebell">Personalized Banners Designed for Your Profession</h1>
        <p className="text-lg text-Pewter">Transform Your Profile with Stunning Ai Banners</p>
      </div>

      <Form
        dispatch={(e) => {
          e.preventDefault();
          dispatch({ type: "submit", payload: console.log(name, email, profession, socialMedia, socialMediaLink) });
        }}>
        <Input type={"text"} placeholder={"John Doe"} name={"full name"} onChange={(e) => dispatch({ type: "name", payload: e.target.value })} value={name} />

        <Input type={"email"} placeholder={"johndoe@email.com"} name={"email"} onChange={(e) => dispatch({ type: "email", payload: e.target.value })} value={email} />

        <Input type={"text"} placeholder={"Sales Specialist"} name={"profession"} onChange={(e) => dispatch({ type: "profession", payload: e.target.value })} value={profession} />

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
            onChange={(e) => dispatch({ type: "socialMediaLink", payload: e.target.value })}
            dispatch={dispatch}
            value={socialMediaLink}
            key={socialMediaName}
          />
        )}

        <Button text={"generate banner"} />
      </Form>
    </main>
  );
};

export default Main;
