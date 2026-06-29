
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