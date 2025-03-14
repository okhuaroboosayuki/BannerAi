/**
 * validateEmail checks if the email address provided is in a valid format
 * @param {string} email - the email address to be validated
 * @returns {boolean} true if the email is valid, false otherwise
 */

export const validateEmail = (email) => {
  const emailRegex = /^\S+@\S+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
