
/**
 * Format comma
 * @param {string} number 
 * @returns {string} formatted number with commas
 */
export const commatedNumber = (number) => {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
