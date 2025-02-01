import { useReducer } from "react";

const useFormReducer = () => {
  const initialState = {
    isLoading: false,
    name: "",
    email: "",
    profession: "",
    socialMediaName: "",
    socialMediaLink: "",
    generatedOutput: null,
    socialMedia: [],
    socialButtonClicked: false,
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
      case "socialMediaLink":
        return { ...state, socialMediaLink: action.payload };
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
      case "addSocialMedia":
        return {
          ...state,
          socialMedia: [...state.socialMedia, { [state.socialMediaName]: state.socialMediaLink }],
          socialButtonClicked: false,
          socialMediaName: "",
          socialMediaLink: "",
          errors: { ...state.errors, socialMedia: "" },
        };
      case "error":
        return { ...state, errors: { ...state.errors, [action.payload.name]: action.payload.error } };
      case "submit": {
        return {
          ...state,
          errors: { name: "", email: "", profession: "", socialMedia: "" },
          generatedOutput: action.payload,
        };
      }
      case "reset": {
        return {
          ...state,
          name: "",
          email: "",
          profession: "",
          socialMediaName: "",
          socialMediaLink: "",
          generatedOutput: null,
          socialMedia: [],
          socialButtonClicked: false,
          errors: {
            name: "",
            email: "",
            profession: "",
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
