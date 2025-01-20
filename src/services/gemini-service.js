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
        },
        required: ["textColor", "nameColor", "professionColor", "generalBgColor", "socialMediaBgColor"],
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
        type: SchemaType.STRING,
        description: "quote based on profession",
        nullable: false,
      },
    },
    required: ["colors", "fontFamily", "fontSize", "quote"],
  },
};

export const generateBanner = async (profession) => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You are a skilled design assistant specializing in branding and visual aesthetics. Your role is to select the most appropriate font family from "fonts.google.com," providing the necessary embed links for inclusion in the document head, and to curate a color palette typically associated with the user's profession for creating visually captivating designs. Additionally, craft an inspiring and motivational quote tailored to the user's profession, without including the author's name.`,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const prompt = `Based on the profession "${profession}" provided, generate a color palette, font sizes, and font family that matches it.`;

  const result = await model.generateContent(prompt);

  return JSON.parse(result.response.text());
};
