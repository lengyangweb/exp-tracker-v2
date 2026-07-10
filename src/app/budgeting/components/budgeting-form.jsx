'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useState, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '@/components/ui/spinner';
import { PlusIcon } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import CategorySelect from '../../manage-expense/[id]/category-select';
import { CalendarInput } from '@/components/shared/calendar-input';
import useBudegtingForm from '../hooks/use-budget-form';

const BudgetingForm = ({ setRefetch }) => {
  const categoryRef = useRef(null);
  
  const {
    reset,
    control,
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useBudegtingForm();

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
      let budgetList = localStorage.getItem('budget-list');
      if (budgetList) budgetList = JSON.parse(budgetList);
      if (!budgetList) budgetList = [];
      budgetList = [...budgetList, data];

      localStorage.setItem('budget-list', JSON.stringify(budgetList));
      toast.success('Transaction added successfully!');
      categoryRef.current?.focus();
      setRefetch(true);
      reset();
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast.error(error.message || 'Failed to add transaction');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col border shadow-lg rounded-lg px-4 pb-4">
      <form id="transaction-form" onSubmit={handleSubmit(onSubmit)}>
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
          <CalendarInput label='Transaction Date' name="historyDate" control={control} />
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
        <Button className="w-full mt-3" disabled={isSubmitting}>
          <div className="flex gap-2 items-center justify-center">
            {isSubmitting ? <Spinner /> : <PlusIcon />}
            <span>{isSubmitting ? 'Adding...' : 'Add Transaction'}</span>
          </div>
        </Button>
      </form>
    </div>
  )
}

export default BudgetingForm