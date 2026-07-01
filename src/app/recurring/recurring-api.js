/**
 * Fetches all recurring expenses.
 * @returns {Promise<Array<import('@/app/types/reocurring').Recurring>>} - Returns a list of recurring expenses.
 */
export async function getRecurringExpenses() {
  try {
    const response = await fetch('/api/reocurring');
    if (!response.ok) {
      throw new Error('Failed to fetch recurring expenses');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching recurring expenses:', error);
    throw new Error('Failed to fetch recurring expenses');
  }
}

/**
 * Removes a recurring expense by its ID.
 * @param {string} id - The ID of the recurring expense to delete.
 * @returns {Promise<boolean>} - Returns true if the deletion was successful, false otherwise.
 */
export async function removeRecurringExpense(id) {
  try {
    const response = await fetch(`/api/reocurring/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete recurring expense');
    }

    return true; // Indicate successful deletion
  } catch (error) {
    console.error('Error deleting recurring expense:', error);
    return false; // Indicate failure
  }
}

/**
 * Adds a new recurring expense.
 * @param {*} expense - The recurring expense data to add.
 * @returns {Promise<Object>} - Returns the added expense data.
 */
export async function addRecurringExpense(expense) {
  try {
    const response = await fetch('/api/reocurring', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    });

    if (!response.ok) {
      throw new Error('Failed to add recurring expense');
    }

    return await response.json(); // Return the added expense data
  } catch (error) {
    console.error('Error adding recurring expense:', error);
    throw new Error('Failed to add recurring expense');
  }
}