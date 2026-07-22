'use client';

import React from "react";
import * as recurringApi from "./recurring-api";
import { recurringReducer, initialState } from "./recurring-reducer";

const RecurringContext = React.createContext();

const RecurringProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(recurringReducer, initialState);

  /**
   * Fetches recurring expenses from the API and updates the state accordingly.
   */
  const loadRecurringItems = async () => {
    dispatch({ type: "FETCH_RECURRING_EXPENSES_REQUEST" });
    try {
      const result = await recurringApi.getRecurringExpenses();
      dispatch({ 
        type: "FETCH_RECURRING_EXPENSES_SUCCESS", 
        payload: result 
      });
    } catch (error) {
      dispatch({ 
        type: "FETCH_RECURRING_EXPENSES_FAILURE", 
        payload: error.message 
      });
    }
  }

  /**
   * Adds a new recurring item.
   * @param {import("@/app/types/recurring").Recurring} item 
   */
  const addRecurringItem = async (item) => {
    dispatch({ type: "SET_SUBMITTING", payload: true });
    try {
      const newItem = await recurringApi.addRecurringExpense(item);
      dispatch({ type: "ADD_RECURRING_EXPENSE", payload: newItem });
    } catch (error) {
      throw new Error("Failed to add recurring item: " + error.message);
    }
  };

  /**
   * Updates a recurring item.
   * @param {string} itemId 
   * @param {import("@/app/types/recurring").Recurring} updatedData 
   */
  const updateRecurringItem = async (itemId, updatedData) => {
    dispatch({ type: "SET_SUBMITTING", payload: true });
    try {
      const updatedItem = await recurringApi.updateRecurringExpense(itemId, updatedData);
      if (!updatedItem) throw new Error("No updated item returned from API");
      dispatch({ type: "UPDATE_RECURRING_EXPENSE", payload: { id: itemId, ...updatedData } });
    } catch (error) {
      throw new Error("Failed to update recurring item: " + error.message);
    }
  };

  /**
   * Removes a recurring item.
   * @param {string} itemId 
   */
  const removeRecurringItem = async (itemId) => {
    try {
      const success = await recurringApi.removeRecurringExpense(itemId);
      if (!success) throw new Error("Failed to remove recurring item");
      dispatch({ type: "REMOVE_RECURRING_EXPENSE", payload: itemId });
    } catch (error) {
      throw new Error("Failed to remove recurring item: " + error.message);
    }
  };  

  const values = React.useMemo(
    () => ({
      ...state,
      loadRecurringItems,
      addRecurringItem,
      updateRecurringItem,
      removeRecurringItem,
    }),
    [state]
  );

  return (
    <RecurringContext.Provider value={values}>
      {children}
    </RecurringContext.Provider>
  );
};

/**
 * A custom hook to access the RecurringContext.
 * @throws Will throw an error if used outside of a RecurringProvider.
 * @returns {{
 *  data: Array<import("../types/reocurring").Recurring>,
 *  loading: boolean,
 *  error: string | null,
 *  loadRecurringItems: () => Promise<void>,
 *  addRecurringItem: (item: import('@/app/types/recurring').Recurring) => Promise<void>,
 *  updateRecurringItem: (itemId: string, updatedData: import('@/app/types/recurring').Recurring) => Promise<void>,
 *  removeRecurringItem: (itemId: string) => Promise<void>,
 * }}
 */
const useRecurring = () => {
  const context = React.useContext(RecurringContext);
  if (!context) {
    throw new Error(
      "useRecurring must be used within a RecurringProvider"
    );
  }
  return context;
};

export { RecurringContext, RecurringProvider, useRecurring };