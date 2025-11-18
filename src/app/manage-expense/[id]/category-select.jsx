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

const CategorySelect = ({ control, errors }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>Transaction Category:</Label>
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectGroup>
                <SelectLabel>Transaction Categories</SelectLabel>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="transportation">Transportation</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="miscellaneous">Miscellaneous</SelectItem>
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
};

export default CategorySelect;