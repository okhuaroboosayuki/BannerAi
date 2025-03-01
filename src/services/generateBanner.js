import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const schema = {
  description: "color palettes, quote, font sizes, & font family based on profession",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      colors: {
        type: SchemaType.OBJECT,
        properties: {
          textColor: {
            type: SchemaType.STRING,
            description: "text color hex code",
            nullable: false,
          },
          nameColor: {
            type: SchemaType.STRING,
            description: "name color hex code",
            nullable: false,
          },
          professionColor: {
            type: SchemaType.STRING,
            description: "profession color hex code",
            nullable: false,
          },
          generalBgColor: {
            type: SchemaType.STRING,
            description: "general background color hex code",
            nullable: false,
          },
          socialMediaBgColor: {
            type: SchemaType.STRING,
            description: "social media background color hex code",
            nullable: false,
          },
          socialMediaTextColor: {
            type: SchemaType.STRING,
            description: "social media text color hex code",
            nullable: false,
          },
        },
        required: ["textColor", "nameColor", "professionColor", "generalBgColor", "socialMediaBgColor", "socialMediaTextColor"],
      },
      fontFamily: {
        type: SchemaType.OBJECT,
        properties: {
          link: {
            type: SchemaType.STRING,
            description: "google font document head links",
            nullable: false,
          },
          declaration: {
            type: SchemaType.STRING,
            description: "font family value",
            nullable: false,
          },
        },
        required: ["link", "declaration"],
      },
      fontSize: {
        type: SchemaType.OBJECT,
        properties: {
          textFontSize: {
            type: SchemaType.STRING,
            description: "text font size",
            nullable: false,
          },
          heading: {
            type: SchemaType.STRING,
            description: "heading font size",
            nullable: false,
          },
        },
        required: ["textFontSize", "heading"],
      },
      quote: {
        type: SchemaType.OBJECT,
        properties: {
          text: {
            type: SchemaType.STRING,
            description: "Inspirational quote based on profession",
            nullable: false,
          },
          textColor: {
            type: SchemaType.STRING,
            description: "Color of the quote text in HEX format",
            nullable: false,
          },
        },
        required: ["text", "textColor"],
      },
    },
    required: ["colors", "fontFamily", "fontSize", "quote"],
  },
};

/**
 * Generates a banner based on the profession provided using Google Generative AI
 * @param {string} profession - The profession
 * @returns {Promise<object>} The generated banner
 */

export const generateBanner = async (profession) => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You are a skilled design assistant specializing in branding and visual aesthetics. Your role is to:
    1. Select an appropriate color palette for the user's profession, ensuring the colors are vibrant, complementary, and suitable for creating visually captivating social media profile banners. The "socialMediaBgColor" must always be black or a dark shade of any color, and the "socialMediaTextColor" must always be white or whatever color that contrasts with the "socialMediaBgColor". All colors must be represented as valid HEX codes.
    2. Choose a suitable font family from "fonts.google.com" that aligns with the tone and aesthetic of the profession. Provide the necessary embed links for integration into a document head.
    3. Specify font sizes in "rem" for the text and heading, ensuring they are proportionate and readable for a social media banner.
    4. Write an inspiring and motivational quote tailored to the user's profession, keeping it professional. The "quote text" must be a dark shade of any color that blends well with the "generalBgColor". The quote can be a famous saying, a personal motto, a reflection of the profession's values, a call to action, a greek proverb, a quote from a famous person, or any other inspirational message. Do not include any personal information, specific names, or authorship in the quote.`,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const prompt = `Based on the profession "${profession}" provided, generate:
  1. A **color palette** with the following properties:
     - "textColor": Suitable for text elements.
     - "nameColor": Distinct and vibrant, suitable for names.
     - "professionColor": Reflective of the profession's tone.
     - "generalBgColor": Harmonious with other colors, suitable for the background.
     - "socialMediaBgColor": Always black or a dark shade of any color.
     - "socialMediaTextColor": Always white or whatever color that contrasts with the "socialMediaBgColor".
  
  2. A **font family**:
     - Include the embed link from "fonts.google.com" for integration.
     - Provide the font-family declaration value for CSS usage.
  
  3. **Font sizes**:
     - "textFontSize": For general text, specified in "rem."
     - "heading": For headings, specified in "rem."
  
  4. An **inspirational quote** tailored to the profession, designed to motivate and resonate with individuals in that field.
      - "textColor": A dark shade of any color that blends well with the "generalBgColor".
  
  Ensure all elements are cohesive, visually appealing, and tailored for use in a professional social media profile banner.`;

  const result = await model.generateContent(prompt);

  return JSON.parse(result.response.text());
};
