import { useEffect, useState } from 'react';
import { SelectItem } from "../../ui/select";

/**
 * A component that displays a list of recurring items in a select dropdown.
 * 
 * @param {{ list: import("@/app/types/reocurring").Recurring[] }} props 
 * @returns {import("react").JSX.Element}
 */
export function StructureSelection({ list = [] }) {
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
    <div className="w-full">
      {options.map((option) => (
        <SelectItem 
          className="cursor-pointer" 
          key={option.value} 
          value={option.value}
        >
          <div className="flex flex-col">
            <span>{option.label}</span>
            {/* {option.data.nextOccurrence && (
              <span className="text-[12px] text-muted-foreground">
                Next: {new Date(option.data.nextOccurrence).toLocaleDateString()}
              </span>
            )} */}
          </div>
        </SelectItem>
      ))}
    </div>
  );
}