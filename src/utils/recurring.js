
  /**   * Calculate the next occurrence date based on start date and frequency
   * @param {Date} startDate - The start date of the expense
   * @param {string} frequency - The frequency of the expense
   * @return {Date} - The next occurrence date
   */
  export const getNextOccurrence = (startDate, frequency) => {
    const start = new Date(startDate);
    const now = new Date();
    let next = new Date(start);

    while (next <= now) {
      if (frequency === "daily") {
        next.setDate(next.getDate() + 1);
      } else if (frequency === "weekly") {
        next.setDate(next.getDate() + 7);
      } else if (frequency === "monthly") {
        next.setMonth(next.getMonth() + 1);
      } else if (frequency === "yearly") {
        next.setFullYear(next.getFullYear() + 1);
      }
    }

    return next;
  };

  /**   
   * Sort expenses by their next occurrence date
   * 
   * @param {import('../app/types/reocurring').Recurring[]} expenses - The array of expense objects
   * @return {Array} - The sorted array of expense objects
   */
  export const sortExpensesByNextOccurrence = (expenses) => {
    return expenses.sort((a, b) => a.nextOccurrence - b.nextOccurrence);
  };