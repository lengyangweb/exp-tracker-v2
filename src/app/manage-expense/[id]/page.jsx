'use client';

import MenuBar from "@/components/shared/menu-bar";
import { useParams } from "next/navigation";
import AddTransactionForm from "./add-transaction-form";
import TransactionHistory from "./transaction-history";
import BalanceCard from "./balance-card";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const { id } = params;
  const [histories, setHistories] = useState([]);

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
      }
    };

    fetchHistories();
  }, [id]);
  
  return (
    <MenuBar pageTitle="View Expenses">
      <div className="px-4 py-2">
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <BalanceCard histories={histories} />
            <div className="w-100">
              <AddTransactionForm />
            </div>
          </div>
          <div className="flex-1">
            <TransactionHistory histories={histories} />
          </div>
        </div>
        {/* Additional content for managing expenses can be added here */}
      </div>
    </MenuBar>
  )
}