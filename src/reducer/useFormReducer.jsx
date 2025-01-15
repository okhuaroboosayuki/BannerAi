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
  };

  const reducer = (state, action) => {
    switch (action.type) {
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
      case "submit":
        return { ...state, payload: action.payload, name: "", email: "", profession: "", socialMedia: [], socialMediaLink: "", socialButtonClicked: false, socialMediaName: "" };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};

export default useFormReducer;
