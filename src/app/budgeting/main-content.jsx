import React, { useEffect, useState } from "react";
import BudgetingForm from "./components/budgeting-form";
import BalanceCard from "../manage-expense/[id]/balance-card";
import { DataTable } from "../manage-expense/[id]/data-table/data-table";
import { useBudgeting } from "./hooks/use-budget-context";
import { Spinner } from "@/components/ui/spinner";
import EditTransactionForm from "../manage-expense/[id]/edit-transaction-form";

export default function MainContent() {
  const { data, loading, error, loadBudgetingItems } = useBudgeting();
  const [selected, setSelected] = useState(null);
  const [openEditForm, setOpenEditForm] = useState(false);

  useEffect(() => {
    loadBudgetingItems();
  }, []);

  const handleDelete = (row) => {};

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
      <div className="flex gap-4">
        <BudgetingForm />
        <DataTable
          data={data}
          setSelectedHistory={setSelected}
          setOpenEditForm={setOpenEditForm}
          onDelete={handleDelete}
        />
        <EditTransactionForm
          show={openEditForm}
          setShow={setOpenEditForm}
          transactionItem={selected}
          setRefetch={null}
        />
      </div>
    </div>
  );
}
