import { useEffect, useState } from "react";
import { SelectValue } from "@radix-ui/react-select";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

/**
 * A combobox component that allows users to select an option from a list.
 *
 * @param {ComboboxProps} props
 * @returns {JSX.Element}
 */
export function Combobox({
  options,
  placeholder = "Select an option",
  selectedOption,
  preSelectedValue,
  onValueChange,
  StructuredSelection,
}) {
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (selectedOption?.value) {
      setSelectedValue(selectedOption.value);
    } 
    
    if (preSelectedValue?.value) {
      setSelectedValue(preSelectedValue.value);
    }

    console.log("Selected value:", selectedValue);
  }, [selectedOption, preSelectedValue]);

  const handleValueChange = (value) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 mt-4">
        <Select
          value={selectedValue}
          onValueChange={handleValueChange}
        >
          <SelectTrigger>
              <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {!StructuredSelection &&
              options &&
              options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            {StructuredSelection && StructuredSelection}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
