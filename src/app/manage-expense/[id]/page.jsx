'use client';

import MenuBar from "@/components/shared/menu-bar";
import { useParams } from "next/navigation";
import AddTransactionForm from "./add-transaction-form";
import TransactionHistory from "./transaction-history";

export default function Page() {
  const params = useParams();
  const { id } = params
  console.log('Tracker ID:', id);
  
  return (
    <MenuBar 
      pageTitle="View Expenses"
      rightHeader={
        <div className="flex gap-4 mr-4">
          <div className="flex flex-col items-center">
            <div className="text-green-700 font-bold uppercase">Income</div>
            <span className="">$899.00</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-red-700 font-bold uppercase">Expense</span>
            <span>$500.35</span>
          </div>
        </div>
      }
    >
      <div className="p-4">
        {/* <h1 className="text-2xl font-bold mb-4">View Expenses for Tracker ID: {id}</h1> */}
        <div className="flex gap-2">
          <div className="w-100">
            <AddTransactionForm />
          </div>
          <div className="flex-1">
            <TransactionHistory />
          </div>
        </div>
        {/* Additional content for managing expenses can be added here */}
      </div>
    </MenuBar>
  )
}