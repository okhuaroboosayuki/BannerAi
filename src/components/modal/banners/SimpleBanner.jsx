import PropTypes from "prop-types";
import { socialIcons, otherIcons } from "../../../assets/icons";
import emailIcon from "../../../assets/icons/icons8-email-50.png";
import { forwardRef, useEffect } from "react";

const SimpleBanner = forwardRef(({ name, email, profession, socialMedia, generatedOutput }, ref) => {
  const getIcon = (platform) => {
    const iconEntry = socialIcons.find((icon) => icon.platform === platform);
    return iconEntry ? iconEntry.icon : null;
  };

  const socialMediaWithWebSite = socialMedia.filter((medium) => Object.keys(medium).includes("website"));

  const socialMediaWithoutWebSite = socialMedia.filter((medium) => !Object.keys(medium).includes("website"));

  const firstName = name.split(" ").splice(0, 1);

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
        <div className="flex flex-col items-start justify-center w-1/4 gap-3 px-8 py-5" style={{ backgroundColor: generatedOutput[0].colors.socialMediaBgColor }}>
          {socialMediaWithoutWebSite.map((entry, index) => {
            const platform = Object.keys(entry)[0];
            const username = entry[platform];
            const icon = getIcon(platform);

            return (
              <div key={index} className="flex items-center justify-center gap-3 text-sm" style={{ color: generatedOutput[0].colors.socialMediaTextColor }}>
                {icon && (
                  <div className="p-[3px] bg-white rounded-md">
                    <img src={icon} alt={`${platform}'s icon`} height={25} width={25} />
                  </div>
                )}
                <span style={{ fontFamily: generatedOutput[0].fontFamily.declaration }}>{username}</span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between flex-1 w-full px-5 py-5" style={{ fontFamily: generatedOutput[0].fontFamily.declaration }}>
          <div className="flex flex-col items-start justify-between w-full h-full gap-2">
            {/* name and profession area */}
            <div className="flex flex-col items-start gap-1">
              <h1
                className="font-extrabold capitalize"
                style={{ color: generatedOutput[0].colors.nameColor, fontSize: generatedOutput[0].fontSize.heading, fontFamily: generatedOutput[0].fontFamily.declaration }}>
                hi, I&apos;m {firstName}
              </h1>

              <p
                className="font-medium capitalize"
                style={{ color: generatedOutput[0].colors.professionColor, fontSize: generatedOutput[0].fontSize.textFontSize, fontFamily: generatedOutput[0].fontFamily.declaration }}>
                {profession}
              </p>
            </div>

            {/* email and social media area */}
            <div className="flex items-center justify-between h-full gap-3 text-sm">
              <div className="flex items-center justify-center gap-1 text-sm" style={{ color: generatedOutput[0].colors.textColor }}>
                <div className="p-[3px] bg-transparent rounded-md">
                  <img src={emailIcon} alt="email icon" width={15} height={15} />
                </div>

                <span style={{ fontFamily: generatedOutput[0].fontFamily.declaration }}>{email}</span>
              </div>

              {socialMediaWithWebSite &&
                socialMediaWithWebSite?.map((website, index) => {
                  const platform = Object.keys(website)[0];
                  const url = website[platform];
                  const icon = getIcon(platform);
                  return (
                    <div
                      key={index}
                      style={{ fontFamily: generatedOutput[0].fontFamily.declaration, fontSize: generatedOutput[0].fontSize.textFontSize, color: generatedOutput[0].colors.textColor }}
                      className="flex items-center gap-1">
                      {icon && (
                        <div className="p-[3px] bg-white rounded-md">
                          <img src={icon} alt={`${platform}'s icon`} height={15} width={15} />
                        </div>
                      )}
                      <span className="text-sm" style={{ fontFamily: generatedOutput[0].fontFamily.declaration }}>
                        {url}
                      </span>
                    </div>
                  );
                })}
            </div>

            {/* quote area */}
            <div className="flex items-center justify-center">
              <em
                className={`text-sm before:content-['"'] after:content-['"'] before:text-2xl after:text-2xl before:mr-0.5 after:ml-0.5`}
                style={{
                  color: generatedOutput[0].quote.textColor,
                  fontFamily: generatedOutput[0].fontFamily.declaration,
                }}>
                {generatedOutput[0].quote.text}
              </em>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full gap-4">
            {otherIcons
              .sort(() => Math.random() - 0.5)
              .map((icon) => (
                <div key={icon.name} className={`flex w-full items-center ${icon.name === "hashtag" || icon.name === "mail" || icon.name === "splash" ? "justify-center" : "justify-end"}`}>
                  <img src={icon.icon} alt={icon.name} width={20} height={20} />
                </div>
              ))}
          </div>
        </div>
      </div>
      <p className="w-full text-lg portrait:block landscape:hidden text-center">This banner is best viewed in landscape mode. Please rotate your device.</p>
    </div>
  );
});

SimpleBanner.displayName = "SimpleBanner";

SimpleBanner.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  profession: PropTypes.string,
  socialMedia: PropTypes.arrayOf(PropTypes.object),
  generatedOutput: PropTypes.arrayOf(
    PropTypes.shape({
      colors: PropTypes.shape({
        generalBgColor: PropTypes.string.isRequired,
        nameColor: PropTypes.string.isRequired,
        professionColor: PropTypes.string.isRequired,
        socialMediaBgColor: PropTypes.string.isRequired,
        socialMediaTextColor: PropTypes.string.isRequired,
        textColor: PropTypes.string.isRequired,
      }).isRequired,
      fontFamily: PropTypes.shape({
        declaration: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      }).isRequired,
      fontSize: PropTypes.shape({
        heading: PropTypes.string.isRequired,
        textFontSize: PropTypes.string.isRequired,
      }).isRequired,
      quote: PropTypes.shape({
        text: PropTypes.string.isRequired,
        textColor: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default SimpleBanner;
