import { forwardRef, useEffect } from "react";
import { PropTypes } from "prop-types";
import { socialIconsWithWhiteBg, otherIcons } from "../../../assets/icons";

const CreativeBanner = forwardRef(({ name, email, profession, socialMedia, generatedOutput, image }, ref) => {
  const getIcon = (platform) => {
    const iconEntry = socialIconsWithWhiteBg.find((icon) => icon.platform === platform);
    return iconEntry ? iconEntry.icon : null;
  };

  const socialMediaWithWebSite = socialMedia.filter((medium) => Object.keys(medium).includes("website"));

  const socialMediaWithoutWebSite = socialMedia.filter((medium) => !Object.keys(medium).includes("website"));

  const arrowRight = otherIcons.find((icon) => icon.name === "arrowRight")?.icon;

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
      <div className="self-center w-full h-full border transition-smooth portrait:hidden landscape:flex" style={{ backgroundColor: generatedOutput[0].colors.generalBgColor }}>
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
          <div className="flex flex-col items-center justify-around flex-1 w-full gap-5 p-9">
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
              <p className="w-[50%] capitalize flex items-center h-full">{profession}</p>

              <img src={arrowRight} alt="arrow facing the right hand side" />

              {socialMediaWithWebSite &&
                socialMediaWithWebSite.map((entry) => {
                  const platform = Object.keys(entry)[0];
                  const website = entry[platform];

                  return (
                    <p key={entry} className="flex items-center h-full lowercase">
                      {website}
                    </p>
                  );
                })}
            </div>
          </div>

          {/* image area */}
          <div className="h-full">
            <img src={image} alt="profile" className="object-cover w-full h-full" />
          </div>
        </div>
      </div>
      <p className="w-full text-lg text-center portrait:block landscape:hidden">This banner is best viewed in landscape mode. Please rotate your device.</p>
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
