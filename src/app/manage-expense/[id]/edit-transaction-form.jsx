"use client";

import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import z from "zod";
import { useRef, useState } from "react";
import CategorySelect from "./category-select";
import { CalendarInput } from "@/components/shared/calendar-input";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

// Define the Zod schema
const transactionSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
    })
    .min(4, { message: "Plese enter a valid title" }),
  type: z
    .string({
      required_error: "type is required",
    })
    .min(6, { message: "type must be atleast 6 characters" }),
  category: z.string({
    required_error: "category is required",
  }),
  amount: z.coerce.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number.",
  }),
  historyDate: z.coerce
    .date({
      required_error: "Date is required",
      invalid_type_error: "Invalid date format.",
    })
    .optional(),
});

/**
 * An edit transaction form component for editing transaction history.
 * @param {{
 *   show: boolean;
 *   setShow: (show: boolean) => void;
 *   transactionItem: import('@/app/types/history').History;
 *   setRefetch: (refetch: boolean) => void;
 * }} props 
 * @returns {JSX.Element}
 */
const EditTransactionForm = ({ 
  show, 
  setShow, 
  transactionItem, 
  setRefetch 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
    const categoryRef = useRef(null);

  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: transactionItem ? transactionItem.title : "",
      type: transactionItem ? transactionItem.type : "",
      category: transactionItem ? transactionItem.category : "",
      amount: transactionItem ? transactionItem.amount : "",
      historyDate: transactionItem
        ? new Date(transactionItem.historyDate)
        : new Date(),
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/histories/${transactionItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) return toast.error("Something went wrong.");

      const result = await response.json();
      if (!result?.success)
        return setError("title", { message: result.message });

      // update success
      setRefetch(true);
      setShow(false);
      toast.success(result.message || "Transaction updated successfully");
      reset();
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
        <form id="transaction-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 mb-4 w-full">
            <CategorySelect
              ref={categoryRef}
              control={control}
              errors={errors}
            />
          </div>
          <div className="flex flex-col gap-2">
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
            <Input
              {...register("title")}
              placeholder="Enter transaction name"
            />
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
        <div className="flex justify-center w-full space-y-2 mt-4">
          <Button disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <Spinner />
            ) : (`Update Transaction`)}
          </Button>
        </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTransactionForm;
