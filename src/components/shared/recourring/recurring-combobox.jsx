import { useCallback, useMemo } from "react";
import { ComboBox } from "../combo-box";
import { useLoadRecurring } from "@/app/recurring/use-load-recurring";
import { getNextOccurrence, sortExpensesByNextOccurrence } from "@/utils/recurring";
import { ComboboxItem } from "../../ui/combobox";
import { Item, ItemContent, ItemDescription, ItemTitle } from "../../ui/item";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * @typedef {import("@/app/types/reocurring").Recurring & {
 *   label: string;
 *   value: string;
 *   nextOccurrence: Date | null;
 * }} RecurringItemOption
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
 *    popupContainer?: import("react").RefObject<HTMLElement | null>;
 * }} props
 * @returns {import("react").JSX.Element} 
 */
export function RecurringComboBox({ onSelected, popupContainer }) {
  const { recurring, isLoading } = useLoadRecurring();

  const data = useMemo(() => {
    if (!recurring || recurring.length === 0) return [];
    return sortExpensesByNextOccurrence(
      recurring.map((expense) => ({
        ...expense,
        category: expense.category,
        label: expense.title,
        value: expense.id,
        nextOccurrence: getNextOccurrence(expense.startDate, expense.frequency),
      })),
    );
  }, [recurring]);

  const onValueChange = useCallback((/**@type {RecurringItemOption} */ option) => {
    if (!option) {
      onSelected?.(null);
      return;
    }

    onSelected?.(option);
  }, [onSelected]);

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
      popupContainer={popupContainer}
    />
  )
}