import { useEffect, useMemo, useState } from "react";
import { TestComboBox } from "./test-combo-box";
import { useLoadRecurring } from "@/app/recurring/use-load-recurring";
import { getNextOccurrence, sortExpensesByNextOccurrence } from "@/utils/recurring";
import { ComboboxItem } from "../ui/combobox";
import { Item, ItemContent, ItemDescription, ItemTitle } from "../ui/item";

/**
 * 
 * @param {{
 *  items: {{label:string; value:string}}
 * }} param0 
 * @returns 
 */
function StructureItems(item) {
  return (
    <ComboboxItem key={item.label} value={item}>
      <div className="flex flex-col">
        <span>{item.label}</span>
        <span>{item}</span>
      </div>
    </ComboboxItem>
  );
}

export function RecurringTestComboBox() {
  const { recurring } = useLoadRecurring();
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

  return (
    <TestComboBox 
      data={data}
      placeholder="Select a recurring"
      renderItem={(item) => (
        <ComboboxItem key={item.value ?? item.label} value={item}>
              <Item size="xs" className="p-0">
                <ItemContent>
                  <ItemTitle className="whitespace-nowrap">
                    {item.label}
                  </ItemTitle>
                  <ItemDescription className='text-xs'>
                    Next Occurence: {new Date(item.nextOccurrence).toDateString()}
                  </ItemDescription>
                </ItemContent>
              </Item>
        </ComboboxItem>
      )}
    />
  )
}