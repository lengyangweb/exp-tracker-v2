'use client';

import BalanceCard from "./balance-card";
import { useEffect, useState } from "react";
import MenuBar from "@/components/shared/menu-bar";
import { useParams, useRouter } from "next/navigation";
import TransactionHistory from "./transaction-history";
import AddTransactionForm from "./add-transaction-form";
import DeleteTrackerButton from "./delete-tracker-button";
import { Spinner } from "@/components/ui/spinner";

export default function Page() {
  const params = useParams();
  const { id } = params;

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [histories, setHistories] = useState([]);
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
  
  return (
    <MenuBar pageTitle="View Expenses">
      <div className="w-full py-4 h-full relative flex flex-col gap-4">
        <div className="px-4 flex gap-4 flex-col mb-4 h-full">
          <div className="flex flex-col gap-2">
            <div className="w-full md:w-232">
              <BalanceCard histories={histories} />
            </div>
          </div>
          <div className="flex-1 flex gap-2">
            <div className="w-full md:w-100">
              <AddTransactionForm trackerId={id} setRefetch={setRefetch} />
            </div>
            <div>
              <TransactionHistory
                histories={histories}
                setRefetch={setRefetch}
              />
            </div>

          </div>
        </div>
        <div
          className="sticky left-0 bottom-0 border-t 
          w-full py-4 px-2 bg-background rounded-b-md"
        >
          <div className="w-full flex justify-end">
            <DeleteTrackerButton trackerId={id} setRefetch={setRefetch} />
          </div>
        </div>
      </div>
    </MenuBar>
  );
}