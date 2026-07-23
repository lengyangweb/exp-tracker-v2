"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

/**
 * @param {{
 *     data: Array<{label: string; value: T}> | Array<string>
 *     placeholder?: string;
 *     disabled?: boolean;
 *     defaultValue?: T;
 *     ItemComponent?: import("react").ComponentType<{item: {label: string; value: T}}>; 
 *     onValueChange?: (value: any) => void;
 * }} props
 * @returns {import("react").JSX.Element}
 */
export function ComboBox({ 
  data = [],
  placeholder = 'Select an option',
  disabled,
  defaultValue,
  ItemComponent,
  onValueChange,
}) {
  return (
    <Combobox 
        items={data} 
        defaultValue={defaultValue}
        onValueChange={onValueChange}
    >
      <ComboboxInput placeholder={placeholder} showClear disabled={disabled} />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => {
            // normalize label/value when items are simple strings
            const label = (item && (item.label ?? item)) || String(item);
            const key = (item && (item.value ?? item.label)) || label;

            if (ItemComponent) {
              const C = ItemComponent;
              return <C key={key} item={item} />;
            }

            return (
              <ComboboxItem key={key} value={item?.value ?? item}>
                {label}
              </ComboboxItem>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
