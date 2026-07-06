import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarInput } from "@/components/shared/calendar-input";
import { recurringSchema } from "../zod-schemas/recurring-schema";
import { RecurringSelection } from "./components/reccuring-selection";
import { useEffect } from "react";

/**
 * @typedef {{
 *  title: string;
 *  amount: number;
 *  frequency: string;
 *  startDate: Date;
 * }} RecurringFormData
 */

/**
 * Get default values for recurring form
 * @param {import("../types/reocurring").Recurring} [data]
 * @returns {RecurringFormData}
 */
const getDefaultValues = (data) => {
  return ({
      title: data?.title ?? '',
      amount: data?.amount ?? 0.00,
      frequency: data?.frequency ?? 'monthly',
      startDate: data?.startDate ? new Date(data.startDate) : new Date(),
  });
}

/**
 * 
 * @param {{
 *  data: import("../types/reocurring").Recurring;
 *  onSubmit: (d: RecurringFormData) => Promise<void>;
 *  resetForm?: boolean;
 *  setResetForm: (b: boolean) => <void>;
 * }} props
 * @returns {import("react").JSX.Element}
 */
export default function RecurringForm({ 
  data, 
  onSubmit, 
  resetForm,
  setResetForm, 
}) {
  const { control, register, handleSubmit, reset, formState: { errors } } = 
  useForm({
    resolver: zodResolver(recurringSchema),
    defaultValues: getDefaultValues(data)
  });

  useEffect(() => {
    if (!resetForm) return;
    reset(getDefaultValues(data));
    setResetForm(false);
  }, [resetForm])

  return (
        <form
          id="reoccurring-form"
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-1 flex flex-col">
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Enter expense title"
              {...register("title")}
            />
            {errors.title && (
              <span className="block-error">{errors.title.message}</span>
            )}
          </div>
          <div className="space-y-1 flex flex-col">
            <Label>Amount</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="Enter amount"
              {...register("amount")}
            />
            {errors.amount && (
              <span className="block-error">{errors.amount.message}</span>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <RecurringSelection control={control} errors={errors} />
          </div>
          <div className="space-y-1">
            <CalendarInput
              label="Start Date"
              name="startDate"
              control={control}
            />
            {errors.startDate && (
              <span className="block-error">{errors.startDate.message}</span>
            )}
          </div>
        </form>
  )
}