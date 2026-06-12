
/**
 * Format comma
 * @param {string} number 
 * @returns {string} formatted number with commas
 */
export const commatedNumber = (number) => {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Capitalize the first letter of a string
 * @param {string} str 
 * @returns {string} capitalized string
 */
export const capitalize = (str) => {
  const strings = str.split(' ');
  for (let i = 0; i < strings.length; i++) {
    strings[i] = strings[i].charAt(0).toUpperCase() + strings[i].slice(1);
  }
  return strings.join(' ');
};