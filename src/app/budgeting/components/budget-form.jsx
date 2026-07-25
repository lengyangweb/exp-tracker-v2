'use client';

import { useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useBudegtingForm, { dollarNumber } from '../hooks/use-budget-form';

/**
 * @param {{
 *   id: string;
 *   data?: import('@/app/types/history').History;
 *   onSubmit: (h: import('@/app/types/history').History) => Promise<void>;
 *   resetForm?: boolean;
 *   setResetForm?: (b: boolean) => void;
 * }} props 
 * @returns {import('react').JSX.Element}
 */
export default function BudgetForm({ 
  id = 'budgeting-form',
  data,
  onSubmit,
  resetForm, 
  setResetForm 
}) {
  const {
    reset,
    control,
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useBudegtingForm({ data });

  useEffect(() => {
    if (resetForm) {
      reset();
      setResetForm(false);
    }
  }, [resetForm, setResetForm])

  async function handleOnSubmit(formData) {
    const { amount } = formData;

    const amountValidationResult = dollarNumber.safeParse(amount);
    if (!amountValidationResult.success) {
      setError('amount', { message: amountValidationResult.error.message });
      return;
    }
    
    await onSubmit(formData);
  }

  return (
    <form id={id} onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="flex flex-col border-b py-2">
        <span className="font-semibold">Monthly Budget</span>
        <span className="text-xs text-foreground 80">
          Set your monthly spending target.
        </span>
      </div>
      <div className="flex flex-col gap-2 my-4">
        <Label>Budget Amount</Label>
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
