import { useReducer } from "react";

const useFormReducer = () => {
  const initialState = {
    isLoading: false,
    name: "",
    email: "",
    profession: "",
    socialMediaName: "",
    socialMediaLink: "",
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
    const formNotFilled = !state.name || !state.email || !state.profession || state.socialMedia.length === 0;

    switch (action.type) {
      case "loading":
        return { ...state, isLoading: !formNotFilled };
      case "name":
        return { ...state, name: action.payload };
      case "email":
        return { ...state, email: action.payload };
      case "profession":
        return { ...state, profession: action.payload };
      case "socialMediaLink":
        return { ...state, socialMediaLink: action.payload };
      case "socialButtonClicked":
        return { ...state, socialButtonClicked: state.socialMediaName === action.payload ? false : true, socialMediaName: state.socialMediaName === action.payload ? "" : action.payload, socialMediaLink: state.socialMediaName !== action.payload ? "" : state.socialMediaLink };
      case "addSocialMedia":
        return { ...state, socialMedia: [...state.socialMedia, { [state.socialMediaName]: state.socialMediaLink }], socialButtonClicked: false, socialMediaName: "", socialMediaLink: "" };
      case "error":
        return { ...state, errors: { ...state.errors, [action.payload.name]: action.payload.error } };
      case "submit": {
        return { ...state, isLoading: false, name: "", email: "", profession: "", socialMedia: [], socialMediaLink: "", socialMediaName: "", socialButtonClicked: false, errors: { name: "", email: "", profession: "", socialMedia: "" } };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};

export default useFormReducer;
