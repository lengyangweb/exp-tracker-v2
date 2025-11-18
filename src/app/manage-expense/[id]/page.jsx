'use client';

import BalanceCard from "./balance-card";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MenuBar from "@/components/shared/menu-bar";
import AddTransactionForm from "./add-transaction-form";
import TransactionHistory from "./transaction-history";
import { Button } from "@/components/ui/button";

export default function Page() {
  const params = useParams();
  const { id } = params;

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
          console.error('Failed to fetch histories:', data.message);
        }
      } catch (error) {
        console.error('Error fetching histories:', error);
      } finally {
        setRefetch(false);
      }
    };

    if (refetch) fetchHistories();
  }, [id, refetch]);
  
  return (
    <MenuBar pageTitle="View Expenses">
      <div className="w-full py-2 h-full">
        <div className="px-4 flex gap-4 md:flex-row flex-col mb-4 h-full">
          <div className="flex flex-col gap-2">
            <div className="w-full md:w-100">
              <BalanceCard histories={histories} />
            </div>
            <div className="w-full md:w-100">
              <AddTransactionForm 
                trackerId={id} 
                setRefetch={setRefetch}
              />
            </div>
          </div>
          <div className="flex-1">
            <TransactionHistory 
              histories={histories} 
              setRefetch={setRefetch}
            />
          </div>
        </div>
        {/* Additional content for managing expenses can be added here */}
        <div 
          className="sticky left-0 bottom-0 border-t 
          w-full py-4 px-2 bg-background rounded-b-md"
        >
          <div className="w-full flex justify-end">
            <Button variant="outline">Delete Tracker</Button>
          </div>
        </div>
      </div>
    </MenuBar>
  )
}