'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import BudgetForm from './budget-form';
import { PlusIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Spinner } from '@/components/ui/spinner';
import { useBudgeting } from '../hooks/use-budget-context';

const BudgetingForm = () => {
  const { addBudgetingItem } = useBudgeting();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetForm, setResetForm] = useState(false);

  const onSubmit = async(data) => {
    setIsSubmitting(true);

    // Send data to the server
    try {
      addBudgetingItem(data);
      setResetForm(true);
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast.error(error.message || 'Failed to add transaction');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col border shadow-lg rounded-lg px-4 pb-4">
        <BudgetForm
          onSubmit={onSubmit}
          resetForm={resetForm}
          setResetForm={setResetForm}
        />
        <Button form="budgeting-form" className="w-full mt-3" disabled={isSubmitting}>
          <div className="flex gap-2 items-center justify-center">
            {isSubmitting ? <Spinner /> : <PlusIcon />}
            <span>{isSubmitting ? 'Adding...' : 'Add Transaction'}</span>
          </div>
        </Button>
    </div>
  )
}

export default BudgetingForm