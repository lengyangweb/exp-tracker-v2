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
  return (
    <div className="w-full">
      <Select value={selectedOption} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
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
  );
}
