import { validateEmail } from "./validateEmail";

/**
 * Validates form fields and dispatches errors if validation fails.
 *
 * @param {Object} state - The current state of the form.
 * @param {Function} dispatch - The dispatch function for updating state.
 * @returns {boolean} - Returns `true` if any errors are found, otherwise `false`.
 */

export const handleValidation = (state, dispatch) => {
  const fields = [
    {
      name: "name",
      value: state.name,
      rules: [{ check: (val) => val.trim() !== "", message: "Name is required." }],
    },
    {
      name: "email",
      value: state.email,
      rules: [
        { check: (val) => val.trim() !== "", message: "Email is required." },
        { check: (val) => validateEmail(val), message: "A valid email is required." },
      ],
    },
    {
      name: "profession",
      value: state.profession,
      rules: [{ check: (val) => val.trim() !== "", message: "Profession is required." }],
    },
    {
      name: "socialMedia",
      value: state.socialMedia,
      rules: [{ check: (val) => val.length > 0, message: "At least one social media platform is required." }],
    },
  ];

  let hasErrors = false;

  fields.forEach(({ name, value, rules }) => {
    rules.forEach((rule) => {
      if (!rule.check(value)) {
        hasErrors = true;
        dispatch({
          type: "error",
          payload: { name, error: rule.message },
        });
      }
    });
  });

  return hasErrors;
};
