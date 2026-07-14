'use client';

import React from "react";
import { budgetingReducer, initialState } from "./use-budget-reducer";

const BudgetingContext = React.createContext();

const BudgetingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(budgetingReducer, initialState);

  /**
   * Fetches recurring expenses from the API and updates the state accordingly.
   */
  const loadBudgetingItems = async () => {
    dispatch({ type: "FETCHING" });
    try {
      let result = localStorage.getItem('budget-list');
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
      let budgetList = localStorage.getItem('budget-list');
      if (budgetList) budgetList = JSON.parse(budgetList);
      if (!budgetList) budgetList = [];

      const newItem = { id: crypto.randomUUID(), ...item }
      budgetList = [ newItem, ...budgetList ];

      localStorage.setItem('budget-list', JSON.stringify(budgetList));
      dispatch({ type: "CREATE", payload: newItem });
    } catch (error) {
      throw new Error("Failed to add budgeting item: " + error.message);
    }
  };

  /**
   * Updates a recurring item.
   * @param {string} itemId 
   * @param {import("@/app/types/recurring").Recurring} updatedData 
   */
  const updateBudgetingItem = async (itemId, updatedData) => {

  };

  /**
   * Removes a recurring item.
   * @param {string} itemId 
   */
  const removeBudgetingItem = async (itemId) => {

  };  

  const values = React.useMemo(
    () => ({
      ...state,
      loadBudgetingItems,
      addBudgetingItem,
      updateBudgetingItem,
      removeBudgetingItem,
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
 *  addBudgetingItem: (item: import("@/app/types/history").History) => Promise<void>,
 *  updateBudgetingItem: (itemId: string, updatedData: import("@/app/types/history").History) => Promise<void>,
 *  removeBudgetingItem: (itemId: string) => Promise<void>,
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