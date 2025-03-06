/**
 * Truncate the filename to a specified length.
 *
 * @param {string} filename - The filename to truncate.
 * @param {number} maxLength - The maximum length of the filename.
 * @returns {string} The truncated filename.
 */

export const truncateFilename = (filename, maxLength) => {
  if (!filename) {
    return "";
  }

  const parts = filename.split(".");
  if (parts.length < 2) {
    return filename;
  }

  const extension = parts.pop(); // Remove and store the extension
  let baseName = parts.join("."); // Recombine the base name if there were multiple dots.

  if (baseName.length > maxLength) {
    baseName = baseName.substring(0, maxLength) + "..."; // Truncate and add ellipsis
  }

  return `${baseName}.${extension}`;
};
