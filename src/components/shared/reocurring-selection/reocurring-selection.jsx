import { Combobox } from "../combobox";
import { useEffect, useMemo, useState } from "react";
import { getNextOccurrence, sortExpensesByNextOccurrence } from "@/utils/recurring";
import { StructureSelection } from "./structured-selection";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * A component that displays a list of recurring items in a select dropdown.
 * 
 * @param {{
 *  selected: import('@/app/types/reocurring').Recurring | null;
 *  onSelected: (value: import('@/app/types/reocurring').Recurring | null) => void 
 * }} props
 * @returns {JSX.Element}
 */
export const RecurringSelection = ({ selected, onSelected }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRecurring, setSelectedRecurring] = useState('');
  const [recurringList, setRecurringList] = useState(
    /**@type {import('@/app/types/reocurring').Recurring[]} */
    []
  );

  useMemo(() => {
    async function getRecurringList() {
      try {
        const response = await fetch('/api/reocurring');
        if (!response.ok) {
          throw new Error('Failed to fetch recurring list');
        }

        /**@type {import('@/app/types/reocurring').Recurring[]} */
        const data = await response.json();
        // Handle the data as needed
        const dataAsNextOccurrence = sortExpensesByNextOccurrence(
          data.map(item => ({
            ...item,
            nextOccurrence: getNextOccurrence(item.startDate, item.frequency)
          }))
        );
        setRecurringList(dataAsNextOccurrence);
      } catch (error) {
        console.error('Error fetching recurring list:', error);
      } finally {
        setIsLoading(false);
      }
    }

    getRecurringList();
  }, []);

  useEffect(() => {
    setSelectedRecurring(selected?.id || '');
  }, [selected]);

  /**
   * Handles the selection of a recurring option.
   * @param {string} value - The ID of the selected recurring option.
   */
  function handleSelectedOption(value) {
    onSelected?.(recurringList.find(item => item.id === value));
    setSelectedRecurring(value);
  }

  if (isLoading) {
    return (
      <div className="p-4 border rounded-md bg-neutral-100/50">
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Combobox
        placeholder="Select a recurring option"
        StructuredSelection={
          <StructureSelection list={recurringList || []} />
        }
        value={selectedRecurring}
        onValueChange={handleSelectedOption}
      />
    </div>
  );
}
