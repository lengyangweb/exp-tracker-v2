/**
 * @typedef {{
 *  data: Array<import("@/app/types/history").History>,
 *  loading: boolean,
 *  error: string | null,
 * }} BudgetingState
 * 
 * @typedef {"FETCHING" | "FETCH_SUCCESS" | "FETCH_FAILED" | "UPDATE"| "CREATE" | "DELETE"} ActionType types for managing budgeting expenses state.
 * 
 * @typedef {{
 *  type: ActionType,
 *  payload?: any,
 * }} BudgetingAction
 */

/**@type {BudgetingState} */
export const initialState = {
  data: [],
  loading: true,
  error: null,
}

/**
 * Reducer function for managing budgeting expenses state.
 * @param {BudgetingState} state - The current state of budgeting expenses.
 * @param {BudgetingAction} action - The action to be processed.
 * @returns {BudgetingState} The updated state after processing the action.
 */
export const budgetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHING":
      return { 
        ...state, 
        loading: true, 
        error: null 
      };
    case "FETCH_SUCCESS":
      return { 
        ...state, 
        loading: false, 
        data: action.payload 
      };
    case "FETCH_FAILURE":
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };
    case "CREATE":
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    case "DELETE":
      return {
        ...state,
        data: state.data.filter(expense => expense.id !== action.payload),
      };
    case "UPDATE":
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