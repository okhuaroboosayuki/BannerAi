import { useReducer } from "react";

const useFormReducer = () => {
  const initialState = {
    isLoading: false,
    name: "",
    email: "",
    profession: "",
    image: "",
    imageInputName: "choose image",
    socialMediaName: "",
    socialMediaLink: "",
    generatedOutput: null,
    socialMedia: [],
    socialButtonClicked: false,
    openModal: false,
    editable: true,
    errors: {
      name: "",
      email: "",
      profession: "",
      socialMedia: "",
    },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "loading":
        return { ...state, isLoading: action.payload };
      case "name":
        return { ...state, name: action.payload };
      case "email":
        return { ...state, email: action.payload };
      case "profession":
        return { ...state, profession: action.payload };
      case "image":
        return { ...state, image: action.payload };
      case "imageInputName":
        return { ...state, imageInputName: action.payload };
      case "socialMediaLink":
        return { ...state, socialMediaLink: action.payload };
      case "modal":
        return { ...state, openModal: action.payload };
      case "socialButtonClicked": {
        const existingPlatform = state.socialMedia.find((item) => Object.keys(item).includes(action.payload));
        return {
          ...state,
          socialButtonClicked: state.socialMediaName !== action.payload,
          socialMediaName: state.socialMediaName === action.payload ? "" : action.payload,
          socialMediaLink: state.socialMediaName !== action.payload && existingPlatform ? existingPlatform[action.payload] : "",
          errors: { ...state.errors, socialMedia: "" },
        };
      }
      case "addSocialMedia": {
        const newSocialMedia = { [state.socialMediaName]: state.socialMediaLink };
        const existingPlatformIndex = state.socialMedia.findIndex((item) => Object.keys(item)[0] === state.socialMediaName);

        let updatedSocialMedia;
        if (existingPlatformIndex !== -1) {
          // Platform exists, either update or delete
          if (state.socialMediaLink) {
            // Update if link is not empty
            updatedSocialMedia = state.socialMedia.map((item, index) => (index === existingPlatformIndex ? newSocialMedia : item));
          } else {
            // Delete if link is empty
            updatedSocialMedia = state.socialMedia.filter((_, index) => index !== existingPlatformIndex);
          }
        } else {
          // Platform doesn't exist, add new
          updatedSocialMedia = [...state.socialMedia, newSocialMedia];
        }

        return {
          ...state,
          socialMedia: updatedSocialMedia,
          socialButtonClicked: false,
          socialMediaName: "",
          socialMediaLink: "",
          errors: { ...state.errors, socialMedia: "" },
        };
      }
      case "error":
        return { ...state, errors: { ...state.errors, [action.payload.name]: action.payload.error } };
      case "submit": {
        return {
          ...state,
          errors: { name: "", email: "", profession: "", socialMedia: "", image: "" },
          generatedOutput: action.payload,
        };
      }
      case "edit":
        return { ...state, editable: action.payload };
      case "reset": {
        return {
          ...state,
          name: "",
          email: "",
          profession: "",
          image: "",
          imageInputName: "choose image",
          socialMediaName: "",
          socialMediaLink: "",
          generatedOutput: null,
          socialMedia: [],
          socialButtonClicked: false,
          openModal: false,
          editable: true,
          errors: {
            name: "",
            email: "",
            profession: "",
            image: "",
            socialMedia: "",
          },
        };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};

export default useFormReducer;
