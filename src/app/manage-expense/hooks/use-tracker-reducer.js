/**
 * @typedef {{
 *  data: import("@/app/types/tracker").Tracker[],
 *  loading: boolean,
 *  error: string | null,
 * }} TrackerState
 * 
 * @typedef {"FETCH_START"|"FETCH_SUCCESS"|"FETCH_FAILED"|"ADD_TRACKER"|"REMOVE_TRACKER"|"UPDATE_TRACKER"} ActionType
 * 
 * @typedef {{
 *  type: ActionType,
 *  payload?: any,
 * }} TrackerAction
 */

/**@type {TrackerState} */
export const initialState = {
  data: [],
  loading: true,
  error: null,
}

/**
 * Reducer function for managing tracker state.
 * @param {TrackerState} state - The current state of tracker.
 * @param {TrackerAction} action - The action to be processed.
 * @returns {TrackerState} The updated state after processing the action.
 */
export const recurringReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_START":
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
    case "FETCH_FAILED":
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };
    case "ADD_TRACKER":
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    case "REMOVE_TRACKER":
      return {
        ...state,
        data: state.data.filter(tracker => tracker.id !== action.payload),
      };
    case "UPDATE_TRACKER":
      return {
        ...state,
        data: state.data.map(tracker => 
          tracker.id === action.payload.id ? { ...tracker, ...action.payload } : tracker
        ),
      };
    default:
      return state;
  }
};