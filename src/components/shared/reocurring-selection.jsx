import { useEffect, useState } from "react";
import { Combobox } from "./combobox";
import { SelectItem } from "../ui/select";
import { capitalize } from "@/utils/utils";
import { getNextOccurrence } from "@/utils/recurring";
import { randomUUID } from 'crypto';

/**
 * A component that displays a list of recurring items in a select dropdown.
 * 
 * @param {{ list: import("@/app/types/reocurring").Recurring[] }} props 
 * @returns {import("react").JSX.Element}
 */
export function StructuredRecurringSelection({ list = [] }) {
  const [options, setOptions] = useState(/**@type {ComboboxOption[]} */ []);
  
  useEffect(() => {
    setOptions(
      list.map((item) => ({
        value: item.id,
        label: item.title,
        data: item
      }))
    );
  }, [list]);

  return (
    <>
      {options.map((option) => (
        <SelectItem className="cursor-pointer" key={option.value} value={option}>
          <div className="flex flex-col">
            <span>{option.label}</span>
            {option.data.nextOccurrence && (
              <span className="text-[12px] text-muted-foreground">
                Next: {new Date(option.data.nextOccurrence).toLocaleDateString()}
              </span>
            )}
          </div>
        </SelectItem>
      ))}
    </>
  );
}

/**
 * A component that displays a list of recurring items in a select dropdown.
 * 
 * @param {{
 *  selected: string, 
 *  onSelected: (value: string) => void 
 * }} props
 * @returns {JSX.Element}
 */
export const RecurringSelection = ({ selected, onSelected }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [recurringList, setRecurringList] = useState(
    /**@type {import('../../app/types/reocurring').Recurring[]} */
    []
  );

  useEffect(() => {
    async function getRecurringList() {
      try {
        const response = await fetch('/api/reocurring');
        if (!response.ok) {
          throw new Error('Failed to fetch recurring list');
        }

        /**@type {import('../../app/types/reocurring').Recurring[]} */
        const data = await response.json();
        // Handle the data as needed

        setRecurringList(data.map(item => {
          item.nextOccurrence = getNextOccurrence(item.startDate, item.frequency);
          return item;
        }));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recurring list:', error);
      }
    }

    getRecurringList();
  }, [])

  if (isLoading) {
    return <div className="p-4 border rounded-md bg-neutral-100/50">Loading recurring options...</div>;
  }

  return (
    <>
      <Combobox
        placeholder="Select a recurring option"
        StructuredSelection={
          <StructuredRecurringSelection list={recurringList || []} />
        }
        onValueChange={onSelected}
        value={selected}
      />
    </>
  );
}
