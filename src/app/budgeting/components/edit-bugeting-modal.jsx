"use client";

import { useState } from "react";
import BudgetForm from "./budget-form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBudgeting } from "../hooks/use-budget-context";

/**
 * An edit transaction form component for editing transaction history.
 * @param {{
 *   show: boolean;
 *   setShow: (show: boolean) => void;
 *   history: import('@/app/types/history').History;
 * }} props
 * @returns {JSX.Element}
 */
export default function EditBudgetingModal({ 
  show, 
  setShow, 
  history,
}) {
  const { updateBudgetingItem } = useBudgeting();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      updateBudgetingItem(history.id, data);
      setShow(false);
    } catch (error) {
      console.error("Update tracker error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="w-full md:w-200">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription className="text-xs">
            Use the form below to edit your transaction.
          </DialogDescription>
        </DialogHeader>
        <hr />
          <BudgetForm
            id={'update-budget-form'}
            data={history}
            onSubmit={onSubmit}
          />
          <div className="flex justify-center w-full space-y-2 mt-4">
            <Button form="update-budget-form" disabled={isSubmitting} className="w-full">
              {isSubmitting ? <Spinner /> : `Update Transaction`}
            </Button>
          </div>
      </DialogContent>
    </Dialog>
  );
};
