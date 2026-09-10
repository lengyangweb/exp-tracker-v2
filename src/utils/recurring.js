
  const advanceOccurrence = (date, frequency) => {
    const next = new Date(date);

    if (frequency === "daily") {
      next.setDate(next.getDate() + 1);
    } else if (frequency === "weekly") {
      next.setDate(next.getDate() + 7);
    } else if (frequency === "monthly") {
      next.setMonth(next.getMonth() + 1);
    } else if (frequency === "yearly") {
      next.setFullYear(next.getFullYear() + 1);
    } else {
      return null;
    }

    return next;
  };

  /**   * Calculate the next occurrence date based on start date and frequency
   * @param {Date} startDate - The start date of the expense
   * @param {string} frequency - The frequency of the expense
   * @return {Date} - The next occurrence date
   */
  export const getNextOccurrence = (startDate, frequency) => {
    const start = new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let next = new Date(start);

    while (next < today) {
      next = advanceOccurrence(next, frequency);
      if (!next) return null;
    }

    return next;
  };

  /**
   * Get all occurrences remaining in the current calendar month.
   * @param {import('../app/types/reocurring').Recurring[]} expenses
   * @param {Date} [referenceDate]
   * @return {Array<import('../app/types/reocurring').Recurring & { occurrenceDate: Date }>}
   */
  export const getRemainingOccurrencesInMonth = (expenses, referenceDate = new Date()) => {
    const monthStart = new Date(referenceDate);
    monthStart.setHours(0, 0, 0, 0);

    const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 1);
    const occurrences = [];

    expenses.forEach((expense) => {
      let occurrence = new Date(expense.startDate);
      const endDate = expense.endDate ? new Date(expense.endDate) : null;

      while (occurrence < monthStart) {
        occurrence = advanceOccurrence(occurrence, expense.frequency);
        if (!occurrence) return;
      }

      while (occurrence < monthEnd && (!endDate || occurrence <= endDate)) {
        occurrences.push({ ...expense, occurrenceDate: new Date(occurrence) });
        occurrence = advanceOccurrence(occurrence, expense.frequency);
        if (!occurrence) return;
      }
    });

    return occurrences.sort((a, b) => a.occurrenceDate - b.occurrenceDate);
  };

  /**   
   * Sort expenses by their next occurrence date
   * 
   * @param {import('../app/types/reocurring').Recurring[]} expenses - The array of expense objects
   * @return {Array<import('../app/types/reocurring').Recurring>} - The sorted array of expense objects
   */
  export const sortExpensesByNextOccurrence = (expenses) => {
    return expenses.sort((a, b) => a.nextOccurrence - b.nextOccurrence);
  };