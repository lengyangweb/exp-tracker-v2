'use client';

import MenuBar from "@/components/shared/menu-bar";
import { useParams } from "next/navigation";
import AddTransactionForm from "./add-transaction-form";
import TransactionHistory from "./transaction-history";
import BalanceCard from "./balance-card";

const histories = [
  { id: 1, title: 'title 1', amount: 50.25, createdAt: Date.now(), type: 'expense' },
  { id: 2, title: 'title 2', amount: 5.00, createdAt: Date.now(), type: 'expense' },
  { id: 3, title: 'title 3', amount: 23.25, createdAt: Date.now(), type: 'income' },
  { id: 4, title: 'title 4', amount: 500.25, createdAt: Date.now(), type: 'expense' },
  { id: 5, title: 'title 5', amount: 150.25, createdAt: Date.now(), type: 'income' },
  { id: 6, title: 'title 6', amount: 350.25, createdAt: Date.now(), type: 'expense' },
  { id: 7, title: 'title 7', amount: 450.25, createdAt: Date.now(), type: 'income' },
  { id: 8, title: 'title 8', amount: 150.25, createdAt: Date.now(), type: 'income' },
  { id: 9, title: 'title 9', amount: 550.25, createdAt: Date.now(), type: 'income' },
  { id: 10, title: 'title 10', amount: 750.25, createdAt: Date.now(), type: 'expense' },
  { id: 11, title: 'title 8', amount: 150.25, createdAt: Date.now(), type: 'expense' },
  { id: 12, title: 'title 9', amount: 550.25, createdAt: Date.now(), type: 'income' },
  { id: 13, title: 'title 10', amount: 750.25, createdAt: Date.now(), type: 'expense' },
  { id: 14, title: 'title 8', amount: 150.25, createdAt: Date.now(), type: 'expense' },
  { id: 15, title: 'title 9', amount: 550.25, createdAt: Date.now(), type: 'expense' },
  { id: 16, title: 'title 10', amount: 750.25, createdAt: Date.now(), type: 'income' },
  { id: 17, title: 'title 8', amount: 150.25, createdAt: Date.now(), type: 'expense' },
  { id: 18, title: 'title 9', amount: 550.25, createdAt: Date.now(), type: 'income' },
  { id: 19, title: 'title 10', amount: 750.25, createdAt: Date.now(), type: 'expense' },
  { id: 20, title: 'title 8', amount: 150.25, createdAt: Date.now(), type: 'expense' },
  { id: 21, title: 'title 9', amount: 550.25, createdAt: Date.now(), type: 'income' },
  { id: 22, title: 'title 10', amount: 750.25, createdAt: Date.now(), type: 'expense' },
];

export default function Page() {
  const params = useParams();
  const { id } = params
  console.log('Tracker ID:', id);
  
  return (
    <MenuBar 
      pageTitle="View Expenses"
      // rightHeader={
      //   <div className="flex gap-4 mr-4">
      //     <div className="flex flex-col items-center">
      //       <div className="text-green-700 font-bold uppercase">Income</div>
      //       <span className="">$899.00</span>
      //     </div>
      //     <div className="flex flex-col items-center">
      //       <span className="text-red-700 font-bold uppercase">Expense</span>
      //       <span>$500.35</span>
      //     </div>
      //   </div>
      // }
    >
      <div className="px-4 py-2">
        {/* <h1 className="text-2xl font-bold mb-4">View Expenses for Tracker ID: {id}</h1> */}
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