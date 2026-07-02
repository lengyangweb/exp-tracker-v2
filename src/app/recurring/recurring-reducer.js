/**
 * @typedef {{
 *  data: Array<import("./recurring-api").RecurringExpense>,
 *  loading: boolean,
 *  error: string | null,
 * }} RecurringState
 * 
 * @typedef {"FETCH_RECURRING_EXPENSES_REQUEST" | "FETCH_RECURRING_EXPENSES_SUCCESS" | "FETCH_RECURRING_EXPENSES_FAILURE" | "UPDATE_RECURRING_EXPENSE"| "ADD_RECURRING_EXPENSE" | "REMOVE_RECURRING_EXPENSE"} ActionType types for managing recurring expenses state.
 * 
 * @typedef {{
 *  type: ActionType,
 *  payload?: any,
 * }} RecurringAction
 */

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
    case "ADD_RECURRING_EXPENSE":
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case "REMOVE_RECURRING_EXPENSE":
      return {
        ...state,
        data: state.data.filter(expense => expense.id !== action.payload),
      };
    case "UPDATE_RECURRING_EXPENSE":
      return {
        ...state,
        data: state.data.map(expense => 
          expense.id === action.payload.id ? { ...expense, ...action.payload } : expense
        ),
      };
    default:
      return state;
  }
};