
/**
 * Format comma
 * @param {*} string 
 * @returns {number}
 */
export const commatedNumber = (number) => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
