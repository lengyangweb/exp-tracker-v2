'use client';

import React from "react";
import { recurringReducer, initialState } from "./recurring-reducer";
import { getRecurringExpenses } from "./recurring-api";

const RecurringContext = React.createContext();

const RecurringProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(recurringReducer, initialState);

  React.useEffect(() => {
    loadRecurringItems();
  }, []);

  const loadRecurringItems = async () => {
    dispatch({ type: "FETCH_RECURRING_EXPENSES_REQUEST" });
    try {
      const result = await getRecurringExpenses();
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

  const addRecurringItem = (item) => {
    setRecurringItems((prevItems) => [...prevItems, item]);
  };

  const removeRecurringItem = (itemId) => {
    setRecurringItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  const values = React.useMemo(
    () => ({
      ...state,
      loadRecurringItems,
      addRecurringItem,
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
 *  data: Array<import("./recurring-api").RecurringExpense>,
 *  loading: boolean,
 *  error: string | null,
 *  loadRecurringItems: () => void,
 *  addRecurringItem: (item: import("./recurring-api").RecurringExpense) => void,
 *  removeRecurringItem: (itemId: string) => void,
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