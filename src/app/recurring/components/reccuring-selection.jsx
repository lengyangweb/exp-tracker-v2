import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/**
 * Recurring Frequency Selection Component
 * @param {Object} props
 * @param {Object} props.control - react-hook-form control object
 * @param {Object} props.errors - form errors object
 * @returns {JSX.Element}
 */
export function RecurringSelection({ control, errors }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>Frequency:</Label>
      <Controller
        name="frequency"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      {errors.frequency && (
        <span className="block-error">{errors.frequency.message}</span>
      )}
    </div>
  );
}