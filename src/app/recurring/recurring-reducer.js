/**
 * @typedef {{
 *  data: Array<import("./recurring-api").RecurringExpense>,
 *  loading: boolean,
 *  error: string | null,
 * }} RecurringState
 * 
 * @typedef {"FETCH_RECURRING_EXPENSES_REQUEST" | "FETCH_RECURRING_EXPENSES_SUCCESS" | "FETCH_RECURRING_EXPENSES_FAILURE"} ActionType types for managing recurring expenses state.
 * 
 * @typedef {{
 *  type: ActionType,
 *  payload?: any,
 * }} RecurringAction
 */

import { sortExpensesByNextOccurrence } from "@/utils/recurring";

/**@type {RecurringState} */
export const initialState = {
  data: [],
  loading: true,
  error: null,
}

/**
 * Reducer function for managing recurring expenses state.
 * @param {RecurringState} state - The current state of recurring expenses.
 * @param {RecurringAction} action - The action to be processed.
 * @returns {RecurringState} The updated state after processing the action.
 */
export const recurringReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_RECURRING_EXPENSES_REQUEST":
      return { 
        ...state, 
        loading: true, 
        error: null 
      };
    case "FETCH_RECURRING_EXPENSES_SUCCESS":
      return { 
        ...state, 
        loading: false, 
        data: action.payload 
      };
    case "FETCH_RECURRING_EXPENSES_FAILURE":
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };
    default:
      return state;
  }
};