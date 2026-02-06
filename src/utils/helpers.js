/**
 * Replace character at specific index in a string
 * @param {string} str - Original string
 * @param {number} index - Index to replace at
 * @param {string} replacement - Replacement string
 * @returns {string} Modified string
 */
const replaceAt = (str, index, replacement) => {
  return str.substring(0, index) + replacement + str.substring(index + replacement.length);
};

module.exports = { replaceAt };
