'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { PlusIcon } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import CategorySelect from './category-select';

// Define the Zod schema
const loginSchema = z.object({
  title: z.string({
    required_error: "title is required",
  }).min(4, { message: "Plese enter a valid title" }),
  type: z.string({
    required_error: "type is required",
  }).min(6, { message: 'type must be atleast 6 characters' }),
  category: z.string({
    required_error: "category is required",
  }),
  amount: z.coerce.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number."
  })
});

// Define dollar schema
const dollarNumber = z
  .number()
  .finite()
  .refine((v) => Number.isInteger(Math.round(v * 100)), {
    message: "Amount must have at most two decimal places (cents).",
  })
  .refine((v) => v >= 0, { message: "Amount must be non-negative."});

const AddTransactionForm = ({ trackerId, setRefetch }) => {
  const {
    reset,
    control,
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      title: '',
      type: 'income',
      category: 'miscellaneous',
      amount: null
    }
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
      reset();
      // router.refresh();
      setRefetch(true);
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
          <span className="text-lg font-semibold">Transaction Form</span>
          <span className="text-xs text-foreground 80">
            Use the form below to add your new transaction.
          </span>
        </div>
        <div className="flex flex-col gap-2 my-4 w-full">
          <CategorySelect control={control} errors={errors} />
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
  );
}

export default AddTransactionForm;