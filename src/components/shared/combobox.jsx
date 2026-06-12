
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
  value,
  preSelectedValue,
  onValueChange,
  StructuredSelection
}) {

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-col gap-4 mt-4">
          <Select 
            defaultValue={preSelectedValue}
            onValueChange={onValueChange} 
            value={value}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {(!StructuredSelection && options) &&
                options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              { StructuredSelection && StructuredSelection }
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>
  );
}
