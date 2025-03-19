import { forwardRef, useEffect } from "react";
import { PropTypes } from "prop-types";
import { socialIconsWithWhiteBg } from "../../../assets/icons";

const CreativeBanner = forwardRef(({ name, email, profession, socialMedia, generatedOutput, image }, ref) => {
  const getIcon = (platform) => {
    const iconEntry = socialIconsWithWhiteBg.find((icon) => icon.platform === platform);
    return iconEntry ? iconEntry.icon : null;
  };

  const socialMediaWithWebSite = socialMedia.filter((medium) => Object.keys(medium).includes("website"));

  const socialMediaWithoutWebSite = socialMedia.filter((medium) => !Object.keys(medium).includes("website"));

  const firstName = name.split(" ")[0];

  useEffect(() => {
    if (generatedOutput && generatedOutput[0]?.fontFamily.link) {
      // Extract the link string and parse it
      const linkString = generatedOutput[0]?.fontFamily.link;

      // Create a new link element
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = linkString;
      link.crossOrigin = "anonymous";

      // Add it to the head
      document.head.appendChild(link);

      // Cleanup function to remove the link when the component unmounts
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [generatedOutput]);

  return (
    <div className="w-full p-5 bg-white/50 h-[300px] flex flex-col items-center justify-center" ref={ref}>
      <div className="self-center w-full h-full border transition-smooth hidden min-[900px]:flex" style={{ backgroundColor: generatedOutput[0].colors.generalBgColor }}>
        {/* social media area */}
        <div className="flex flex-col items-start justify-center w-1/4 gap-3 px-3 py-5" style={{ backgroundColor: generatedOutput[0].colors.socialMediaBgColor }}>
          {socialMediaWithoutWebSite
            .sort(() => Math.random() - 0.5)
            .map((entry, index) => {
              const platform = Object.keys(entry)[0];
              const username = entry[platform];
              const icon = getIcon(platform);

              return (
                <div key={index} className="flex items-center justify-start w-full gap-3 text-sm" style={{ color: generatedOutput[0].colors.socialMediaTextColor }}>
                  {icon && <img src={icon} alt={`${platform}'s icon`} height={30} width={30} />}

                  <span style={{ fontFamily: generatedOutput[0].fontFamily.declaration }} className="flex items-center w-full h-full">
                    {username.toLowerCase()}
                  </span>
                </div>
              );
            })}
        </div>

        {/* main area */}
        <div className="flex justify-between w-full">
          <div className="flex flex-col items-center justify-around flex-1 w-full xl:gap-5 p-3 lg:p-5 xl:p-9">
            {/* name & email */}
            <div className="flex items-center justify-between w-full gap-8">
              <h1
                className="flex flex-col items-start gap-2 text-6xl font-extrabold capitalize"
                style={{ color: generatedOutput[0].colors.textColor, fontFamily: generatedOutput[0].fontFamily.declaration }}>
                I&apos;m <br />
                {firstName}
              </h1>

              <div className="self-end" style={{ color: generatedOutput[0].colors.textColor }}>
                {email}
              </div>
            </div>

            {/* profession & website */}
            <div className="flex items-center self-start justify-between w-full gap-2" style={{ color: generatedOutput[0].colors.textColor, fontFamily: generatedOutput[0].fontFamily.declaration }}>
              <p className="w-fit capitalize flex items-center h-full">{profession}</p>

              <div className="flex items-center justify-center w-[25%]">
                <div className="relative w-full h-full">
                  <div className="absolute left-0 w-full lg:w-[80%] xl:w-[72%] h-[0.5px] bg-[#333] translate-y-[-50%]"></div>
                  <div className="absolute w-3 right-0 lg:right-4 xl:right-8 bottom-[3.5px] rotate-45 h-[1px] bg-[#333]"></div>
                  <div className="absolute w-3 right-0 lg:right-4 xl:right-8 top-[4px] -rotate-45 h-[1px] bg-[#333]"></div>
                </div>
              </div>

              {socialMediaWithWebSite &&
                socialMediaWithWebSite.map((entry) => {
                  const platform = Object.keys(entry)[0];
                  const website = entry[platform];

                  return (
                    <p key={entry} className="flex items-center h-full lowercase w-fit font-extrabold">
                      {website}
                    </p>
                  );
                })}
            </div>
          </div>

          {/* image area */}
          <div className="h-full">
            <img src={image} alt="profile" className="object-cover xl:w-full h-full" />
          </div>
        </div>
      </div>
      <p className="w-full text-lg text-center block min-[900px]:hidden">This banner is best viewed in a wider screen.</p>
    </div>
  );
});

CreativeBanner.displayName = "CreativeBanner";

CreativeBanner.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
  socialMedia: PropTypes.array.isRequired,
  generatedOutput: PropTypes.array.isRequired,
};

export default CreativeBanner;
