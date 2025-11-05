'use client';

import MenuBar from "@/components/shared/menu-bar";
import { useParams } from "next/navigation";
import AddTransactionForm from "./add-transaction-form";

export default function Page() {
  const params = useParams();
  const { id } = params
  console.log('Tracker ID:', id);
  
  return (
    <MenuBar pageTitle="View Expenses">
      <div className="p-4">
        {/* <h1 className="text-2xl font-bold mb-4">View Expenses for Tracker ID: {id}</h1> */}
        <div className="flex gap-2">
          <div className="w-100">
            <AddTransactionForm />
          </div>
          <div className="flex-1">
            Transaction History
          </div>
        </div>
        {/* Additional content for managing expenses can be added here */}
      </div>
    </MenuBar>
  )
}