'use client';

import React from "react";
import { budgetingReducer, initialState } from "./use-budget-reducer";

const BudgetingContext = React.createContext();

const BudgetingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(budgetingReducer, initialState);

  /**
   * Fetches the current month's budget from the API and updates the state accordingly.
   */
  const loadBudgetingItems = async () => {
    dispatch({ type: "FETCHING" });
    try {
      const currentDate = new Date();
      const month = currentDate.toISOString().slice(0, 7);
      const year = currentDate.getFullYear();
      const response = await fetch(`/api/budgets?month=${month}&year=${year}`);

      if (!response.ok) {
        throw new Error('Unable to fetch budget');
      }

      const result = await response.json();
      dispatch({ type: "FETCH_SUCCESS", payload: result ? [result] : [] });
    } catch (error) {
      dispatch({ type: "FETCH_FAILED", payload: error.message });
    }
  };

  /**
   * Adds a new recurring item.
   * @param {import("@/app/types/recurring").Recurring} item 
   */
  const addBudgetingItem = async (item) => {
    dispatch({ type: "SET_SUBMITTING", payload: true });
    try {
      const currentDate = new Date();
      const month = currentDate.toISOString().slice(0, 7);
      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: item.amount,
          month,
          year: currentDate.getFullYear(),
          currency: 'USD',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to save budget');
      }

      const savedBudget = await response.json();
      dispatch({ type: "CREATE", payload: savedBudget });
      return savedBudget;
    } catch (error) {
      throw new Error("Failed to add budgeting item: " + error.message);
    }
  };

  /**
   * Updates a recurring item.
   * @param {string} id 
   * @param {import("@/app/types/recurring").Recurring} updatedData 
   */
  const updateBudgetingItem = async (id, updatedData) => {
    try {
      const currentDate = new Date();
      const response = await fetch(`/api/budgets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: updatedData.amount,
          month: currentDate.toISOString().slice(0, 7),
          year: currentDate.getFullYear(),
          currency: 'USD',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update budget');
      }

      const updatedBudget = await response.json();
      dispatch({ type: 'UPDATE', payload: updatedBudget });
      return updatedBudget;
    } catch (error) {
      throw new Error("Failed to update budgeting item: " + error.message);
    }
  };

  /**
   * Removes a recurring item.
   * @param {string} id 
   */
  const removeBudgetingItem = (id) => {
    try {
      dispatch({ type: "DELETE", payload: id });
    } catch (error) {
      throw new Error('Failed to remove budgeting item: ' + error.message);
    }
  };

  /** Clear budgeting list */
  function clearBudgetList() {
    dispatch({ type: 'CLEAR' });
  }

  const values = React.useMemo(
    () => ({
      ...state,
      loadBudgetingItems,
      addBudgetingItem,
      updateBudgetingItem,
      removeBudgetingItem,
      clearBudgetList
    }),
    [state]
  );

  return (
    <BudgetingContext.Provider value={values}>
      {children}
    </BudgetingContext.Provider>
  );
};

/**
 * A custom hook to access the BudgetingContext.
 * @throws Will throw an error if used outside of a BudgetingProvider.
 * @returns {{
 *  data: Array<import("@/app/types/history").History>,
 *  loading: boolean,
 *  error: string | null,
 *  loadBudgetingItems: () => Promise<void>,
 *  addBudgetingItem: (item: import("@/app/types/history").History) => void,
 *  updateBudgetingItem: (id: string, updatedData: import("@/app/types/history").History) => void,
 *  removeBudgetingItem: (id: string) => void,
 *  clearBudgetList: () => void
 * }}
 */
const useBudgeting = () => {
  const context = React.useContext(BudgetingContext);
  if (!context) {
    throw new Error(
      "useBudgeting must be used within a BudgetingProvider"
    );
  }
  return context;
};

export { BudgetingContext, BudgetingProvider, useBudgeting };