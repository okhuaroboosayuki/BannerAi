import Form from "./form/Form";
import Input from "./form/Input";
import SocialMediaField from "./form/SocialMediaField";

const Main = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full gap-9 sm:p-14 p-11">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-4xl font-bold sm:text-3xl text-Bluebell">Personalized Banners Designed for Your Profession</h1>
        <p className="text-lg text-Pewter">Transform Your Profile with Stunning Ai Banners</p>
      </div>

      <Form>
        <Input type={"text"} placeholder={"John Doe"} name={"full name"} />
        <Input type={"email"} placeholder={"johndoe@email.com"} name={"email"} />
        <Input type={"text"} placeholder={"Sales Specialist"} name={"profession"} />

        <div className="grid grid-cols-2 gap-3 px-3 sm:grid-cols-4 h-[200px] sm:h-fit overflow-y-scroll scrollbar-hide">
          <SocialMediaField platform={"facebook"} />
          <SocialMediaField platform={"linkedin"} />
          <SocialMediaField platform={"instagram"} />
          <SocialMediaField platform={"X"} />
          <SocialMediaField platform={"github"} />
          <SocialMediaField platform={"behance"} />
          <SocialMediaField platform={"dribble"} />
          <SocialMediaField platform={"youtube"} />
          <SocialMediaField platform={"website"} />
        </div>

        <Input type={"text"} placeholder={"Enter Username"} width="325px" name={"X"} />

        <button type="submit" className="button">
          generate banner
        </button>
      </Form>
    </main>
  );
};

export default Main;
