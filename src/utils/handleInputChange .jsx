export const handleInputChange = (field, value, errors, dispatch) => {
  dispatch({ type: field, payload: value });

  // Clear the error for this field if it exists
  if (errors[field]) {
    dispatch({
      type: "error",
      payload: { name: field, error: "" },
    });
  }
};
