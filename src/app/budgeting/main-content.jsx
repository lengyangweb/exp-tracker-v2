import React, { useEffect, useState } from "react";
import BudgetingForm from "./components/budgeting-form";
import BalanceCard from "../manage-expense/[id]/balance-card";
import { DataTable } from "../manage-expense/[id]/data-table/data-table";
import { useBudgeting } from "./hooks/use-budget-context";
import { Spinner } from "@/components/ui/spinner";
import EditTransactionForm from "../manage-expense/[id]/edit-transaction-form";
import { toast } from "sonner";
import EditBudgetingModal from "./components/edit-bugeting-modal";

export default function MainContent() {
  const { data, loading, error, loadBudgetingItems, removeBudgetingItem } =
    useBudgeting();
  const [selected, setSelected] = useState(null);
  const [openEditForm, setOpenEditForm] = useState(false);

  useEffect(() => {
    loadBudgetingItems();
  }, []);

  /**
   * @param {import("../types/history").History} item
   */
  const handleDelete = (item) => {
    try {
      removeBudgetingItem(item.id);
    } catch (error) {
      console.error("Failed to remove budgeting item.", error);
      toast.error("Failed to remove budgeting item.");
    }
  };

  if (error) return <p>{error}</p>;
  if (loading) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Spinner />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex gap-4 flex-col w-full p-4">
      <BalanceCard histories={data} />
      <div className="flex gap-2">
        <div className="w-[500px]">
          <BudgetingForm />
        </div>
        <DataTable
          data={data}
          setSelectedHistory={setSelected}
          setOpenEditForm={setOpenEditForm}
          onDelete={handleDelete}
        />
        {openEditForm && (
          <EditBudgetingModal
            show={openEditForm}
            setShow={setOpenEditForm}
            history={selected}
          />
        )}
      </div>
    </div>
  );
}
