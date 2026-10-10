'use client';

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import BalanceCard from "./balance-card";
import MenuBar from "@/components/shared/menu-bar";
import TransactionHistory from "./transaction-history";
import AddTransactionForm from "./add-transaction-form";
import DeleteTrackerButton from "./delete-tracker-button";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DataTable } from "./data-table/data-table";
import EditTransactionForm from "./edit-transaction-form";

const pageDescription = "Track balances and manage transactions";

export default function Page() {
  const params = useParams();
  const { id } = params;

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [histories, setHistories] = useState([]);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [openAddForm, setOpenAddForm] = useState(false);
  const addSheetContentRef = useRef(null);
  const [refetch, setRefetch] = useState(true);

  // Fetch transaction histories for the given expense ID
  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const response = await fetch(`/api/histories/${id}`);
        const data = await response.json();
        if (data.success) {
          setHistories(data.data);
        } else {
          if (response.status === 401) {
            router.push('/login');
            return;
          }
          console.error('Failed to fetch histories:', data.message);
        }
      } catch (error) {
        console.error('Error fetching histories:', error);
      } finally {
        setRefetch(false);
        setLoading(false);
      }
    };

    if (!id || id === 'undefined' || id === 'null') return router.push('/manage-expense');
    if (refetch) fetchHistories();
  }, [id, refetch]);

  /**
   * Handle the deletion of a transaction history.
   * @param {import('@/app/types/history').History} history
   */
  const handleDelete = async (history) => {
    try {
      const response = await fetch(`/api/histories/${history.id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        setRefetch(true);
      } else {
        console.error('Failed to delete history:', data.message);
        toast.error('Failed to delete transaction. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting history:', error);
      toast.error('Failed to delete transaction. Please try again.');
    }
  }

  if (loading) {
    return (
      <MenuBar
        pageTitle="View Expenses"
        pageDescription={pageDescription}
        fillViewport
      >
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Spinner size={18} />
          <p>Loading...</p>
        </div>
      </MenuBar>
    );
  }

  return (
    <MenuBar
      pageTitle="View Expenses"
      pageDescription={pageDescription}
      fillViewport
      rightHeader={
        <div className="flex items-center gap-2">
          <Sheet open={openAddForm} onOpenChange={setOpenAddForm}>
            <Tooltip>
              <SheetTrigger asChild>
                <TooltipTrigger asChild>
                  <Button size="icon" aria-label="Add transaction">
                    <Plus />
                  </Button>
                </TooltipTrigger>
              </SheetTrigger>
              <TooltipContent>Add Transaction</TooltipContent>
            </Tooltip>
            <SheetContent
              ref={addSheetContentRef}
              side="right"
              className="h-full w-full overflow-hidden p-0 sm:max-w-lg"
            >
              <SheetHeader className="shrink-0 px-6 pt-6 pb-0">
                <SheetTitle>Add Transaction</SheetTitle>
                <SheetDescription className="text-xs">
                  Add a transaction to this expense tracker.
                </SheetDescription>
              </SheetHeader>
              <div className="flex min-h-0 flex-1 flex-col px-6 pb-6">
                <AddTransactionForm
                  trackerId={id}
                  setRefetch={setRefetch}
                  onSuccess={() => setOpenAddForm(false)}
                  popupContainer={addSheetContentRef}
                />
              </div>
            </SheetContent>
          </Sheet>
          <DeleteTrackerButton
            trackerId={id}
            setRefetch={setRefetch}
          />
        </div>
      }
    >
      <div className="flex min-h-full w-full flex-col gap-4 p-3 sm:p-4 lg:h-full lg:min-h-0 lg:overflow-hidden">
        <section aria-label="Expense totals" className="shrink-0">
          <BalanceCard histories={histories} />
        </section>

        <div className="hidden min-h-0 min-w-0 flex-1 lg:flex">
          <DataTable
            data={histories}
            onDelete={handleDelete}
            setOpenEditForm={setOpenEditForm}
            setSelectedHistory={setSelectedHistory}
          />
        </div>
        <div className="min-w-0 lg:hidden">
          <TransactionHistory
            histories={histories}
            onDelete={handleDelete}
            onEdit={(history) => {
              setSelectedHistory(history);
              setOpenEditForm(true);
            }}
          />
        </div>
      </div>
      {openEditForm && (
        <EditTransactionForm
          show={openEditForm}
          setShow={setOpenEditForm}
          transactionItem={selectedHistory}
          setRefetch={setRefetch}
        />
      )}
    </MenuBar>
  );
}
