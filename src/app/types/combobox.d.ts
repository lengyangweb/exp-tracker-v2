
/**
 * Props for the Combobox component.
 */
export interface ComboboxProps {
  options?: ComboboxOption[];
  placeholder?: string;
  onValueChange: (value: string) => void;
  StructuredSelection?: ReactNode;
  value: string;
}

/**
 * Represents an option in the combobox. 
 */
export interface ComboboxOption {
  value: string;
  label: string;
  data?: Record<string, unknown>;
}