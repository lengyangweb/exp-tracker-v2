"use client";

import { toast } from "sonner";
import { ReccurringForm } from "./reccuring-form";
import { useRecurring } from "../recurring-context";
import { RecurringSkeleton } from "./recurring-skeleton";
import { AddRecurringButton } from "./add-recurring-button";
import { SiteFooter } from "@/components/shared/site-footer";
import { useCallback, useEffect, useMemo, useState } from "react";
import Pagination from "@/components/shared/recourring/pagination";
import { DataTable } from "@/components/shared/recourring/data-table";
import {getNextOccurrence, sortExpensesByNextOccurrence } from "@/utils/recurring";
import { useRecurringTable } from "@/components/shared/recourring/use-recurring-table";

export const MainContent = () => {
  const { 
    data, 
    loading, 
    error, 
    loadRecurringItems, 
    removeRecurringItem 
  } = useRecurring();

  const [refetch, setRefetch] = useState(true);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showReOccurringForm, setShowReOccurringForm] = useState(false);
  const [expenseTotal, setExpenseTotal] = useState(0);

  const dataAsNextOccurrence = useMemo(() => {
    if (!data || data.length === 0) return [];
    return sortExpensesByNextOccurrence(
      data.map((expense) => ({
        ...expense,
        nextOccurrence: getNextOccurrence(expense.startDate, expense.frequency),
      })),
    );
  }, [data]);

  const calculateExpenseTotal = useCallback((expenses) => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, []);

  useMemo(() => {
    if (dataAsNextOccurrence && dataAsNextOccurrence.length > 0) {
      setExpenseTotal(calculateExpenseTotal(dataAsNextOccurrence));
    }
  }, [dataAsNextOccurrence]);

  const recurringTable = useRecurringTable({ data: dataAsNextOccurrence, pageSize: 12 });

  useEffect(() => {
    if (!refetch) return;
    loadRecurringItems();
    setRefetch(false);
  }, [refetch, data]);

  /**
   * Hanlde the deletion of a recurring expense.
   * @param {string} recurringId
   */
  async function handleExpenseDeletion(recurringId) {
    if (!recurringId) {
      toast.error("No recurring ID provided for deletion.");
      return;
    }

    try {
      await removeRecurringItem(recurringId);
      toast.success("Recurring expense deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete recurring expense. Please try again.");
      console.error("Error deleting recurring expense:", error);
    }
  }

  if (error) return <p>{error.message}</p>;
  if (loading) return <RecurringSkeleton />;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col space-y-4 w-full p-4">
        <div className="flex justify-between w-full">
          <div className="self-end flex gap-2 border bg-neutral-100 px-3 rounded-md">
            <span>Total:</span>
            <span className="font-semibold">${expenseTotal.toFixed(2)}</span>
          </div>
          <AddRecurringButton onClick={() => setShowReOccurringForm(true)} />
        </div>
        <DataTable
          table={recurringTable}
          setSelectedExpense={setSelectedExpense}
          setShowReOccurringForm={setShowReOccurringForm}
          handleDeleteExpense={handleExpenseDeletion}
        />
        {showReOccurringForm && (
          <ReccurringForm
            open={showReOccurringForm}
            setOpen={setShowReOccurringForm}
            reoccurringExpense={selectedExpense}
            setRefetch={setRefetch}
            setSelectedExpense={setSelectedExpense}
          />
        )}
      </div>
      <SiteFooter>
        <Pagination table={recurringTable} showRowPerPage={false} />
      </SiteFooter>
    </div>
  );
};
