'use client';

import { useRef, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import CategorySelect from '../../manage-expense/[id]/category-select';
import { CalendarInput } from '@/components/shared/calendar-input';
import useBudegtingForm, { dollarNumber } from '../hooks/use-budget-form';

/**
 * @param {{
 *   onSubmit: (h: import('@/app/types/history').History) => Promise<void>
 *   resetForm: boolean;
 *   setResetForm: (b: boolean) => void;
 * }} props 
 * @returns 
 */
export default function BudgetForm({ 
  onSubmit,
  resetForm, 
  setResetForm 
}) {
  const categoryRef = useRef(null);
  
  const {
    reset,
    control,
    register,
    setError,
    handleSubmit,
    formState: { errors,  },
  } = useBudegtingForm();

  useEffect(() => {
    if (resetForm) {
      reset();
      setResetForm(false);
    }
  }, [resetForm, setResetForm])

  async function handleOnSubmit(data) {
    const { amount } = data;

    const amountValidationResult = dollarNumber.safeParse(amount);
    if (!amountValidationResult.success) {
      setError('amount', { message: amountValidationResult.error.message });
      return;
    }
    
    await onSubmit(data);
    categoryRef.current?.focus();
  }

  return (
    <form id="budgeting-form" onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="flex flex-col border-b py-2">
        <span className="font-semibold">Budgeting Form</span>
        <span className="text-xs text-foreground 80">
          Use the form below to add your new transaction.
        </span>
      </div>
      <div className="flex flex-col gap-2 my-4 w-full">
        <CategorySelect ref={categoryRef} control={control} errors={errors} />
      </div>
      <div className="flex flex-col gap-2">
        {/* <Label>Date:</Label> */}
        <CalendarInput
          label="Transaction Date"
          name="historyDate"
          control={control}
        />
        {errors.date && (
          <span className="block-error">{errors.historyDate.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Label>Transaction Name:</Label>
        <Input {...register("title")} placeholder="Enter transaction name" />
        {errors.title && (
          <span className="block-error">{errors.title.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2 my-4">
        <Label>Type:</Label>

        <Controller
          name="type"
          control={control}
          rules={{ required: "Please select a type" }}
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex"
              defaultValue="income"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="income" id="income" />
                <Label htmlFor="income">Income</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="expense" id="expense" />
                <Label htmlFor="expense">Expense</Label>
              </div>
            </RadioGroup>
          )}
        />

        {errors.type && (
          <span className="block-error">{errors.type.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2 my-2">
        <Label>Amount:</Label>
        <Input
          {...register("amount")}
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
        />
        {errors.amount && (
          <span className="block-error">{errors.amount.message}</span>
        )}
      </div>
    </form>
  );
}
