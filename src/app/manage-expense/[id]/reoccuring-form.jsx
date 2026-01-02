'use client';

import z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarInput } from "@/components/shared/calendar-input";
import { ReoccuringFrequencySelect } from "./reoccuring-frequency-selection";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogTitle } from "@/components/ui/dialog";

// The Zod schema for reoccurring expense form
const reoccurringExpenseSchema = z.object({
  title: z.string().min(4, { message: "Please enter a valid title" }),
  amount: z.coerce.number({ 
    invalid_type_error: "Amount must be a valid number" 
  })
  .positive("Amount must be greater than 0")
  .multipleOf(0.01, "Only two decimal places allowed"), // Validates precision
  frequency: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
  startDate: z.date({ required_error: "Start date is required" }),
});

/**
 * Reoccurring Form Component
 * @param {Object} props - The component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {Function} props.setOpen - Function to set the open state
 * @param {Object} props.reoccurringExpense - The reoccurring expense data
 * @param {(value:boolean)} [props.setRefetch] - Function to trigger refetching data
 * @returns {JSX.Element}
 */
export function ReoccurringForm({ open, setOpen, reoccurringExpense, setRefetch }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { 
    control,
    register,
    handleSubmit,
    formState: { errors },
   } = useForm({
    resolver: zodResolver(reoccurringExpenseSchema),
    defaultValues: {
      title: reoccurringExpense?.title || '',
      amount: reoccurringExpense?.amount || 0.00,
      frequency: reoccurringExpense?.frequency || 'monthly',
      startDate: reoccurringExpense?.startDate ? new Date(reoccurringExpense.startDate) : new Date(),
    }
  });

  /**   * Handle form submission
   * @param {Object} data - The form data
   * @param {string} data.title - The title of the expense
   * @param {number} data.amount - The amount of the expense
   * @param {string} data.frequency - The frequency of the expense
   * @param {Date} data.startDate - The start date of the expense
   * @return {Promise<void>}
   */
  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);

    const body = {
      title: data.title,
      amount: data.amount,
      frequency: data.frequency,
      startDate: data.startDate,
    };

    if (reoccurringExpense) {
      await updateReoccurringExpense(body);
    } else {
      await saveNewReoccurringExpense(body);
    }
  });

  /**
   * Save new reoccurring expense
   * @param {Object} body - The form data
   * @param {string} body.title - The title of the expense
   * @param {number} body.amount - The amount of the expense
   * @param {string} body.frequency - The frequency of the expense
   * @param {Date} body.startDate - The start date of the expense
   * @return {Promise<void>}
   */
  const saveNewReoccurringExpense = async (body) => {
    // Handle form submission logic here
    try {
      const response = await fetch('/api/reocurring', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...body
        }),
      });

      // Check for response status
      if (!response.ok) {
        throw new Error('Failed to submit reoccurring expense');
      }

      setOpen(false); // Close the dialog
      setRefetch(true); // Trigger refetching data
    } catch (error) {
      console.error('Error submitting reoccurring expense:', error);
      // Optionally handle error (e.g., show error notification)
    } finally {
      setIsSubmitting(false);
    }
  }

  /**
   * Update existing reoccurring expense
   * @param {Object} body 
   * @param {string} body.title - The title of th`e expense
   * @param {number} body.amount - The amount of the expense
   * @param {string} body.frequency - The frequency of the expense
   * @param {Date} body.startDate - The start date of the expense
   * @return {Promise<void>}
   */
  const updateReoccurringExpense = async (body) => {
    // Handle form submission logic here
    try {
      const response = await fetch(`/api/reocurring/${reoccurringExpense.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...body
        }),
      });

      // Check for response status
      if (!response.ok) {
        throw new Error('Failed to update reoccurring expense');
      }

      setOpen(false); // Close the dialog
      setRefetch(true); // Trigger refetching data
    } catch (error) {
      console.error('Error updating reoccurring expense:', error);
      // Optionally handle error (e.g., show error notification)
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="fixed inset-0 bg-black/50" />
      <DialogContent className="fixed top-1/2 left-1/2 max-h-[90vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none gap-0">
        <DialogTitle className="text-lg font-medium">Re-Occurring Expense Details</DialogTitle>
        <DialogDescription className="text-xs mb-4">
          Use the form below to add a new re-occurring expense.
        </DialogDescription>
        <hr />
        {/* Form fields would go here */}
        <form id="reoccurring-form" className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1 flex flex-col">
            <Label>Title</Label>
            <Input 
              type="text"
              placeholder="Enter expense title"
              defaultValue={reoccurringExpense?.title || ''}
              { ...register('title') }
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
              defaultValue={reoccurringExpense?.amount || ''}
              { ...register('amount') }
            />
            {errors.amount && (
              <span className="block-error">{errors.amount.message}</span>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <ReoccuringFrequencySelect control={control} errors={errors} />
          </div>
          <div className="space-y-1">
            <CalendarInput label='Start Date' name="startDate" control={control} />
            {errors.startDate && (
              <span className="block-error">{errors.startDate.message}</span>
            )}
          </div>
        </form>
        <div className="mt-4 flex justify-end">
          <DialogClose asChild>
            <Button variant="outline" className="mr-2">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="reoccurring-form" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}