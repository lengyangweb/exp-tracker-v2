import { Controller } from 'react-hook-form';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { forwardRef } from 'react';
import { getCategoryLabel, HISTORY_CATEGORIES } from '@/constant';

const CategorySelect = forwardRef(({ control, errors }, ref) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>Transaction Category:</Label>
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger ref={ref} className="w-full">
              <span className="truncate">
                {field.value ? getCategoryLabel(field.value) : 'Select a category'}
              </span>
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectGroup>
                <SelectLabel>Transaction Categories</SelectLabel>
                {HISTORY_CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex flex-col items-start">
                      <span>{category.label}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {category.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {errors.category && (
        <span className="block-error">{errors.category.message}</span>
      )}
    </div>
  );
});

CategorySelect.displayName = 'CategorySelect';

export default CategorySelect;