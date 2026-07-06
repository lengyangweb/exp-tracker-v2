'use client';

import React from "react";
import * as trackerApi from '../tracker-api';
import { recurringReducer, initialState } from "./use-tracker-reducer";

const TrackerContext = React.createContext();

const TrackerProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(recurringReducer, initialState);

  /**
   * Fetches recurring expenses from the API and updates the state accordingly.
   */
  const loadTrackers = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const result = await trackerApi.get();
      dispatch({ type: 'FETCH_SUCCESS', payload: result });
    } catch (error) {
      console.error(`Something went wrong while fetching tracker items`, error);
      dispatch({ type: 'FETCH_FAILED', payload: error.message });
    }
  }

  /**
   * Adds a new recurring item.
   * @param {{ title: string }} item 
   */
  const addTracker = async (item) => {
    try {
      const result = await trackerApi.create(item);
      dispatch({ type: 'ADD_TRACKER', payload: result });
    } catch (error) {
      throw new Error('Failed to add new tracker.', error);
    }
  };

  /**
   * Updates a recurring item.
   * @param {string} itemId 
   * @param {import("@/app/types/recurring").Recurring} updatedData 
   */
  const updateTracker = async (itemId, updatedData) => {
    try {
      const result = await trackerApi.update(itemId, updatedData);
      if (!result) throw new Error('Unable to update tracker, try again.');
      dispatch({ 
        type: 'UPDATE_TRACKER', 
        payload: {
          id: itemId,
          ...updatedData
        } 
      })
    } catch (error) {
      throw new Error('Fail to update tracker', error);
    }
  };

  /**
   * Removes a recurring item.
   * @param {string} itemId 
   */
  const removeTracker = async (itemId) => {
    try {
      const result = await trackerApi.remove(itemId);
      if (!result) throw new Error('Unable to delete tracker, try again.');
      dispatch({ type: 'REMOVE_TRACKER', payload: itemId });
    } catch (error) {
      throw new Error('Failed to delete tracker', error);
    }
  };  

  const values = React.useMemo(
    () => ({
      ...state,
      loadTrackers,
      addTracker,
      updateTracker,
      removeTracker,
    }),
    [state]
  );

  return (
    <TrackerContext.Provider value={values}>
      {children}
    </TrackerContext.Provider>
  );
};

/**
 * A custom hook to access the TrackerContext.
 * @throws Will throw an error if used outside of a TrackerProvider.
 * @returns {{
 *  data: import("@/app/types/tracker").Tracker[],
 *  loading: boolean,
 *  error: string | null,
 *  loadTrackers: () => Promise<void>,
 *  addTracker: (item: import(import("@/app/types/tracker").Tracker)) => Promise<void>,
 *  updateTracker: (itemId: string, updatedData: import("@/app/types/tracker").Tracker) => Promise<void>,
 *  removeTracker: (itemId: string) => Promise<void>,
 * }}
 */
const useTracker = () => {
  const context = React.useContext(TrackerContext);
  if (!context) {
    throw new Error(
      "useTracker must be used within a RecurringProvider"
    );
  }
  return context;
};

export { TrackerContext, TrackerProvider, useTracker };