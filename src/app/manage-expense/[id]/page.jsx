'use client';

import BalanceCard from "./balance-card";
import { useEffect, useState } from "react";
import MenuBar from "@/components/shared/menu-bar";
import { useParams, useRouter } from "next/navigation";
import TransactionHistory from "./transaction-history";
import AddTransactionForm from "./add-transaction-form";
import DeleteTrackerButton from "./delete-tracker-button";
import { Spinner } from "@/components/ui/spinner";
import { useIsMobile } from "@/hooks/use-mobile";
import { DataTable } from "./data-table/data-table";
import EditTransactionForm from "./edit-transaction-form";

export default function Page() {
  const params = useParams();
  const { id } = params;

  const router = useRouter();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [histories, setHistories] = useState([]);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
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
            // Handle unauthorized access, e.g., redirect to login
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

  if (loading) {
    return (
      <MenuBar pageTitle="View Expenses">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Spinner size={18} />
          <p>Loading...</p>
        </div>
      </MenuBar>
    );
  }

  if (isMobile) {
    return (
      <MenuBar pageTitle="View Expenses">
        <div className="w-full py-4 h-full relative flex flex-col gap-4">
          <div className="px-4 flex flex-col md:flex-row gap-4 flex-col mb-4 h-full">
            <div className="flex flex-col gap-2">
              <div className="w-full">
                <BalanceCard histories={histories} />
              </div>
            </div>
            <div className="w-full flex-1 flex flex-col md:flex-row gap-4 mt-14 lg:mt-0">
              <div className="w-full">
                <AddTransactionForm trackerId={id} setRefetch={setRefetch} />
              </div>
              <div className="flex-1">
                <TransactionHistory
                  histories={histories}   
                  setRefetch={setRefetch}
                />
              </div>
            </div>
          </div>
        </div>
      </MenuBar>
    );
  }

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

  return (
    <MenuBar
      pageTitle="View Expenses"
      rightHeader={
        <>
          <DeleteTrackerButton 
            trackerId={id} 
            setRefetch={setRefetch} 
          />
        </>
      }
    >
      <div className="w-full relative flex flex-col">
        <div className="flex flex-col w-full h-full p-2">
          <div className="flex flex-col w-full">
            <div className="w-full">
              <BalanceCard histories={histories} />
            </div>
          </div>
          <div className="flex w-full mt-2 gap-2">
            <div className="w-full md:w-100">
              <AddTransactionForm 
                trackerId={id} 
                setRefetch={setRefetch} 
              />
            </div>
            {/* <div className="w-full">
              <TransactionHistory
                histories={histories}
                setRefetch={setRefetch}
              />
            </div> */}
            <DataTable 
              data={histories} 
              onDelete={handleDelete} 
              setOpenEditForm={setOpenEditForm}
              setSelectedHistory={(history) => {
                console.log('Selected history:', history);
                console.log('Open edit form:', openEditForm);
                setSelectedHistory(history);
              }}
            />
            {openEditForm && (
              <EditTransactionForm
                show={openEditForm}
                setShow={setOpenEditForm}
                transactionItem={selectedHistory}
                setRefetch={setRefetch}
              />
            )}
          </div>
        </div>
        <div
          className="sticky left-0 bottom-0 border-t 
          w-full py-4 px-2 bg-background rounded-b-md"
        >
          {/* footer */}
        </div>
      </div>
    </MenuBar>
  );
}