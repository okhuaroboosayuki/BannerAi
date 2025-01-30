import PropTypes from "prop-types";
// import { createElement } from "react";
// import { createRoot } from "react-dom/client";

import { socialIcons } from "../../../assets/icons";
import { useEffect } from "react";

const Banner = ({ name, email, profession, socialMedia, generatedOutput }) => {
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
      // const parser = new DOMParser();
      // const doc = parser.parseFromString(linkString, "text/html");
      // const linkHref = doc.querySelector("link").getAttribute("href");

      // Create a new link element
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = linkString;

      // Add it to the head
      document.head.appendChild(link);

      // Cleanup function to remove the link when the component unmounts
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [generatedOutput]);

  return (
    <div className="w-full p-5 bg-white/50 h-[300px]">
      <div className="flex self-center w-full h-full border transition-smooth" style={{ backgroundColor: generatedOutput[0].colors.generalBgColor }}>
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
          {/* name and profession area */}
          <div className="flex flex-col items-start justify-between flex-1 w-full">
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 24" strokeWidth={2} stroke="currentColor" className="w-20 h-4 ml-2">
                <line x1="0" y1="12" x2="80" y2="12" stroke="currentColor" strokeWidth="2" />
                <polyline points="80,6 90,12 80,18" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* email and social media area */}
          <div className="flex flex-col items-start h-full justify-between gap-3">
            <div className="flex items-center justify-center gap-3 text-sm" style={{ color: generatedOutput[0].colors.textColor }}>
              <span style={{ fontFamily: generatedOutput[0].fontFamily.declaration, fontSize: generatedOutput[0].fontSize.textFontSize }}>{email}</span>
            </div>

            {socialMediaWithWebSite?.map((website, index) => {
              const platform = Object.keys(website)[0];
              const url = website[platform];
              return (
                <p key={index} style={{ fontFamily: generatedOutput[0].fontFamily.declaration, fontSize: generatedOutput[0].fontSize.textFontSize }}>
                  {url}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

Banner.propTypes = {
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

// const Banner = ({ generatedOutput }) => {
//   const convertToNode = (string) => {
//     const template = document.createElement("template");
//     template.innerHTML = string.trim(); // Parses the string as HTML
//     return Array.from(template.content.childNodes).map((node, index) => createElement(node.nodeName.toLowerCase(), { key: index }, node.textContent || node.innerHTML));
//   };

//   return (
//     <div className="w-full p-5 bg-white/50 h-[300px]" id="banner">
//       {convertToNode(generatedOutput)}
//     </div>
//   );
// };

// Banner.propTypes = {
//   generatedOutput: PropTypes.string.isRequired,
// };

export default Banner;
