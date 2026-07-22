"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

const frameworks = [
    "Next.js", 
    "SvelteKit", 
    "Nuxt.js", 
    "Remix", 
    "Astro"
];

/**
 * @param {{
 *     data: Array<{label: string; value: T}> | Array<string>
 *     placeholder?: string;
 *     disabled?: boolean;
 *     defaultValue?: T;
 *     renderItem?: (item: {label: string; value: T}) => import("react").ReactNode; // render function for each item
 *     ItemComponent?: import("react").ComponentType<{item: {label: string; value: T}}>; // component that receives `item` prop
 *     StructureItems?: (item: {label: string; value: T}) => import("react").ReactNode; // legacy render-function alias
 * }} props
 * @returns {import("react").JSX.Element}
 *
 * Examples:
 * // render function
 * <TestComboBox
 *   data={data}
 *   renderItem={(item) => (
 *     <ComboboxItem key={item.value ?? item.label} value={item}>
 *       <div>{item.label}</div>
 *     </ComboboxItem>
 *   )}
 * />
 *
 * // component prop
 * function MyItem({item}) {
 *   return (
 *     <ComboboxItem key={item.value ?? item.label} value={item}>
 *       <div>{item.label}</div>
 *     </ComboboxItem>
 *   );
 * }
 * <TestComboBox data={data} ItemComponent={MyItem} />
 */
export function TestComboBox({ 
    data = frameworks,
    placeholder = 'Select an option',
    disabled,
    defaultValue,
    renderItem,
    ItemComponent,
    StructureItems // legacy
}) {
  return (
    <Combobox 
        items={data} 
        defaultValue={defaultValue}
    >
      <ComboboxInput placeholder={placeholder} showClear disabled={disabled} />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => {
            // normalize label/value when items are simple strings
            const label = (item && (item.label ?? item)) || String(item);
            const key = (item && (item.value ?? item.label)) || label;

            // Priority: renderItem -> ItemComponent -> StructureItems (legacy) -> default
            if (renderItem) return renderItem(item);

            if (ItemComponent) {
              const C = ItemComponent;
              return <C key={key} item={item} />;
            }

            if (StructureItems) return StructureItems(item);

            return (
              <ComboboxItem key={key} value={item}>
                {label}
              </ComboboxItem>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
