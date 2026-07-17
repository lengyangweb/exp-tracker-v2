'use client';

import React from "react";
import { budgetingReducer, initialState } from "./use-budget-reducer";

const BudgetingContext = React.createContext();

const BUDGET_KEY = 'budget-list';

const BudgetingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(budgetingReducer, initialState);

  /**
   * Fetches recurring expenses from the API and updates the state accordingly.
   */
  const loadBudgetingItems = async () => {
    dispatch({ type: "FETCHING" });
    try {
      let result = localStorage.getItem(BUDGET_KEY);
      if (result) result = JSON.parse(result);
      if (!result) result = [];

      dispatch({ 
        type: "FETCH_SUCCESS", 
        payload: result 
      });
    } catch (error) {
      dispatch({ 
        type: "FETCH_FAILED", 
        payload: error.message 
      });
    }
  }

  /**
   * Adds a new recurring item.
   * @param {import("@/app/types/recurring").Recurring} item 
   */
  const addBudgetingItem = async (item) => {
    dispatch({ type: "SET_SUBMITTING", payload: true });
    try {
      let budgetList = state.data;
      const newItem = { id: crypto.randomUUID(), ...item }
      budgetList = [ newItem, ...budgetList ];

      localStorage.setItem(BUDGET_KEY, JSON.stringify(budgetList));
      dispatch({ type: "CREATE", payload: newItem });
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
      let budgetList = state.data;
      if (budgetList.length) {
        budgetList = budgetList.map((row) => 
          row.id === id ? { ...row, ...updatedData } : row);
      } else {
        budgetList = [];
      }

      localStorage.setItem(BUDGET_KEY, JSON.stringify(budgetList));
      dispatch({ type: 'UPDATE', payload: { id, ...updatedData } });
    } catch (error) {
      throw new Error("Failed to update budgeting item: " + error.message);
    }
  };

  /**
   * Removes a recurring item.
   * @param {string} id 
   */
  const removeBudgetingItem = (id) => {
      let budgetList = state.data;

      if (budgetList.length) {
        budgetList = budgetList.filter((row) => row.id !== id);
      } else {
        budgetList = [];
      }

      try {
        localStorage.setItem(BUDGET_KEY, JSON.stringify(budgetList));
        dispatch({ type: "DELETE", payload: id });
      } catch (error) {
        throw new Error('Failed to remove budgeting item: ' + error.message);
      }
  }; 

  /** Clear budgeting list */
  function clearBudgetList() {
    localStorage.removeItem(BUDGET_KEY);
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