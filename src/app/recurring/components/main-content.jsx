"use client";

import { toast } from "sonner";
import { UpdateRecurringModal } from "./update-reccuring-modal";
import { RecurringContext, RecurringProvider, useRecurring } from "../recurring-context";
import { RecurringSkeleton } from "./recurring-skeleton";
import { SiteFooter } from "@/components/shared/site-footer";
import { useEffect, useMemo, useState } from "react";
import Pagination from "@/components/shared/recourring/pagination";
import { DataTable } from "@/components/shared/recourring/data-table";
import {getNextOccurrence, sortExpensesByNextOccurrence } from "@/utils/recurring";
import { useRecurringTable } from "@/components/shared/recourring/use-recurring-table";
import { TestComboBox } from "@/components/shared/test-combo-box";
import { RecurringTestComboBox } from "@/components/shared/recurring-test-combobox";

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

  const dataAsNextOccurrence = useMemo(() => {
    if (!data || data.length === 0) return [];
    return sortExpensesByNextOccurrence(
      data.map((expense) => ({
        ...expense,
        nextOccurrence: getNextOccurrence(expense.startDate, expense.frequency),
      })),
    );
  }, [data]);

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
        <RecurringTestComboBox />
        <DataTable
          table={recurringTable}
          setSelectedExpense={setSelectedExpense}
          setShowReOccurringForm={setShowReOccurringForm}
          handleDeleteExpense={handleExpenseDeletion}
        />
        {showReOccurringForm && (
          <UpdateRecurringModal
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
