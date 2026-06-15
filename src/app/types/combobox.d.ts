
/**
 * Props for the Combobox component.
 */
export interface ComboboxProps {
  options?: ComboboxOption[];
  placeholder?: string;
  preSelectedValue?: ComboboxOption;
  onValueChange: (value: string) => void;
  StructuredSelection?: ReactNode;
  selectedOption?: ComboboxOption;
}

/**
 * Represents an option in the combobox. 
 */
export interface ComboboxOption {
  value: string;
  label: string;
  data?: Record<string, unknown>;
}