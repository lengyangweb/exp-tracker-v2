'use client';

import { toast } from 'sonner';
import { PlusIcon } from 'lucide-react';
import { useState, useCallback } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CategorySelect from './category-select';
import { Button } from "@/components/ui/button";
import { Spinner } from '@/components/ui/spinner';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarInput } from '@/components/shared/calendar-input';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { dollarNumber, transactionSchema } from '@/app/zod-schemas/add-transaction';
import { RecurringComboBox } from '@/components/shared/recourring/recurring-combobox';
import { HISTORY_CATEGORIES, normalizeCategoryValue } from '@/constant';

/**
 * Add transaction form component
 * 
 * @param {{
 *  trackerId: string;
 *  setRefetch: (value: boolean) => void;
 *  onSuccess?: () => void;
 *  popupContainer?: import("react").RefObject<HTMLElement | null>;
 * }} params
 * @returns {JSX.Element}
 */
const AddTransactionForm = ({
  trackerId,
  setRefetch,
  onSuccess,
  popupContainer,
}) => {
  const [recurringOption, setRecurringOption] = useState(
    /**@type {import("../../types/reocurring").Recurring | null} */
    null
  );
  
  const defaultValues = {
    title: '',
    type: 'income',
    category: 'miscellaneous',
    amount: null,
    historyDate: new Date(),
  };

  const {
    reset,
    control,
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async(data) => {
    setIsSubmitting(true);
    const { amount } = data;

    const amountValidationResult = dollarNumber.safeParse(amount);
    if (!amountValidationResult.success) {
      setError('amount', { message: amountValidationResult.error.message });
      setIsSubmitting(false);
      return;
    }

    // Send data to the server
    try {
      const response = await fetch(`/api/histories/${trackerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      toast.success('Transaction added successfully!');

      if (recurringOption) setRecurringOption(null);
      reset(defaultValues);

      setRefetch(true);
      onSuccess?.();
      if (recurringOption) setRecurringOption(null);
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast.error(error.message || 'Failed to add transaction');
    } finally {
      setIsSubmitting(false);
    }
  }

  /**
   * Handle the change of the recurring option.
   * @param {import("../../types/reocurring").Recurring} recurring - The selected recurring option.
   */
  const handleRecurringChange = useCallback((recurring) => {
    setRecurringOption(recurring);

    if (!recurring) {
      reset(defaultValues);
      return;
    }
    const recurringCategory = normalizeCategoryValue(recurring.category);
    const category = HISTORY_CATEGORIES.some(
      (option) => option.value === recurringCategory,
    )
      ? recurringCategory
      : 'miscellaneous';

    reset({
      title: recurring.title,
      historyDate: recurring.nextOccurrence,
      amount: recurring.amount,
      description: recurring.description,
      type: 'expense',
      category,
    });
  }, [reset, setRecurringOption]);

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <form
        id="transaction-form"
        className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
          <div className="my-4 flex w-full min-w-0 flex-col gap-2">
            <Label>Choose from recurring options: </Label>
            <RecurringComboBox
              onSelected={handleRecurringChange}
              popupContainer={popupContainer}
            />
          </div>
          <hr />
          <div className="my-4 flex w-full min-w-0 flex-col gap-2">
            <CategorySelect
              control={control}
              errors={errors}
            />
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            <CalendarInput label="Transaction Date" name="historyDate" control={control} />
            {errors.historyDate && (
              <span className="block-error">{errors.historyDate.message}</span>
            )}
          </div>
          <div className="mt-4 flex min-w-0 flex-col gap-2">
            <Label>Transaction Name:</Label>
            <Input {...register("title")} placeholder="Enter transaction name" />
            {errors.title && (
              <span className="block-error">{errors.title.message}</span>
            )}
          </div>
          <div className="my-4 flex min-w-0 flex-col gap-2">
            <Label>Type:</Label>

            <Controller
              name="type"
              control={control}
              rules={{ required: "Please select a type" }}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-wrap"
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
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="others" id="others" />
                    <Label htmlFor="others">Others</Label>
                  </div>
                </RadioGroup>
              )}
            />

            {errors.type && (
              <span className="block-error">{errors.type.message}</span>
            )}
          </div>
          <div className="my-2 flex min-w-0 flex-col gap-2">
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
        </div>
        <div className="shrink-0 border-t bg-background pt-3">
          <Button className="w-full" disabled={isSubmitting}>
            <div className="flex gap-2 items-center justify-center">
              {isSubmitting ? <Spinner /> : <PlusIcon />}
              <span>{isSubmitting ? 'Adding...' : 'Add Transaction'}</span>
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddTransactionForm;