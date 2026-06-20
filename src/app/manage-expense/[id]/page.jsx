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

export default function Page() {
  const params = useParams();
  const { id } = params;

  const router = useRouter();
  const isMobile = useIsMobile();
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

  return (
    <MenuBar pageTitle="View Expenses">
      <div className="w-full h-full relative flex flex-col py-4">
        <div className="flex flex-col mb-4 w-full h-full">
          <div className="flex flex-col w-full pb-1 shadow-md px-2">
            <div className="w-full">
              <BalanceCard histories={histories} />
            </div>
          </div>
          <div className="flex w-full">
            {/* <div className="w-full md:w-100">
              <AddTransactionForm trackerId={id} setRefetch={setRefetch} />
            </div> */}
            {/* <div className="w-full">
              <TransactionHistory
                histories={histories}
                setRefetch={setRefetch}
              />
            </div> */}
            <DataTable data={histories} />
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