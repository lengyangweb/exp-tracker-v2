'use client';

import { toast } from "sonner";
import { useState } from "react";
import RecurringForm from "../recurring-form";
import { Button } from "@/components/ui/button";
import { useRecurring } from "../recurring-context";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogOverlay, 
  DialogTitle 
} from "@/components/ui/dialog";

/**
 * Reoccurring Form Component
 * @param {Object} props - The component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {(b: boolean) => void} props.setOpen - Function to set the open state
 * @param {Object} props.reoccurringExpense - The reoccurring expense data
 * @param {(expense:Object)=>void} [props.setSelectedExpense] - Function to set the selected expense
 * @returns {JSX.Element}
 */
export function UpdateRecurringModal({ 
  open,
  setOpen,
  reoccurringExpense,
  setSelectedExpense
}) {
  const { updateRecurringItem, removeRecurringItem } = useRecurring();
  const [resetForm, setResetForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**   * Handle dialog open state change
   * @param {boolean} isOpen - The new open state
   */
  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      setOpen(false);
      setSelectedExpense(null);
    }
  };

  /**   * Handle form submission
   * @param {Object} data - The form data
   * @param {string} data.title - The title of the expense
   * @param {number} data.amount - The amount of the expense
   * @param {string} data.frequency - The frequency of the expense
   * @param {Date} data.startDate - The start date of the expense
   * @return {Promise<void>}
   */
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Handle form submission logic here
    try {
      await updateRecurringItem(reoccurringExpense.id, data);
      toast.success("Reoccurring expense updated successfully.");
      setResetForm(true);
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update reoccurring expense. Please try again.");
      console.error('Error updating reoccurring expense:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Delete the current reoccurring expense
   * @return {Promise<void>}
   */
  const deleteReoccurringExpense = async () => {
    try {
      await removeRecurringItem(reoccurringExpense.id);

      setOpen(false);
      setSelectedExpense(null);
      toast.success("Reoccurring expense deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete reoccurring expense. Please try again.");
      console.error('Error deleting reoccurring expense:', error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogOverlay className="fixed inset-0 bg-black/50" />
      <DialogContent className="fixed top-1/2 left-1/2 max-h-[90vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none gap-0">
        <DialogTitle className="text-lg font-medium">Update Recurring Modal</DialogTitle>
        <DialogDescription className="text-xs mb-4">
          Use the form below to update the recurring expense.
        </DialogDescription>
        <hr />
        <RecurringForm
          data={reoccurringExpense}
          onSubmit={onSubmit}
          resetForm={resetForm}
          setResetForm={setResetForm}
        />
        <div className="mt-4 flex justify-between">
              <Button 
                variant="outline" 
                className="mr-2"
                onClick={deleteReoccurringExpense} 
              >
                Delete
              </Button>
            <Button type="submit" form="reoccurring-form" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update'}
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}