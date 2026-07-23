import { useCallback, useEffect, useMemo, useState } from "react";
import { ComboBox } from "../combo-box";
import { useLoadRecurring } from "@/app/recurring/use-load-recurring";
import { getNextOccurrence, sortExpensesByNextOccurrence } from "@/utils/recurring";
import { ComboboxItem } from "../../ui/combobox";
import { Item, ItemContent, ItemDescription, ItemTitle } from "../../ui/item";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * @typedef {Object} RecurringItemOption
 * @property {string} label The label of the option (Title)
 * @property {string} value The value of the option (ID)
 * @property {string} nextOccurrence The next occurrence date of the option
 */

/**
 * @param {{ item: RecurringItemOption }} params 
 * @returns {import("react").JSX.Element}
 */
function RecurringItem({ item }) {
  const nextOccurrenceDate = new Date(item.nextOccurrence).toDateString();

  return (
    <ComboboxItem key={item.value ?? item.label} value={item}>
      <Item size="xs" className="p-0">
        <ItemContent>
          <ItemTitle className="whitespace-nowrap">{item.label}</ItemTitle>
          <ItemDescription className="text-xs">
            Next Occurence: {nextOccurrenceDate}
          </ItemDescription>
        </ItemContent>
      </Item>
    </ComboboxItem>
  );
}

/**
 * @param {{
 *    onSelected: (r: import("@/app/types/reocurring").Recurring) => void;
 * }} props
 * @returns {import("react").JSX.Element} 
 */
export function RecurringComboBox({ onSelected }) {
  const { recurring, isLoading } = useLoadRecurring();
  const [data, setData] = useState([]);

  const dataAsNextOccurrence = useMemo(() => {
    if (!recurring || recurring.length === 0) return [];
    return sortExpensesByNextOccurrence(
      recurring.map((expense) => ({
        ...expense,
        nextOccurrence: getNextOccurrence(expense.startDate, expense.frequency),
      })),
    );
  }, [recurring]);

  useEffect(() => {
    const formatted = dataAsNextOccurrence
      .map((item) => ({ 
        label: item.title, 
        value: item.id,
        nextOccurrence: item.nextOccurrence,
      }));

    setData(formatted);
  }, [dataAsNextOccurrence])

  const onValueChange = useCallback((/**@type {RecurringItemOption} */ option) => {
    if (!option) {
      onSelected?.(null);
      return;
    }

    const selected = dataAsNextOccurrence.find((row) => row.id === option.value);
    onSelected?.(selected ?? null);
  }, [dataAsNextOccurrence, onSelected]);

  if (isLoading) {
    return (
      <div className="p-4 border rounded-md bg-neutral-100/50">
        <Skeleton className="h-6 w-full" />
      </div>
    );
  }

  return (
    <ComboBox
      data={data}
      placeholder="Select a recurring"
      ItemComponent={RecurringItem}
      onValueChange={onValueChange}
    />
  )
}