'use client';

import { useMemo, useState } from 'react'

const BalanceCard = ({ histories = [] }) => {
  const [budget, setBudget] = useState(0);
  const [totalIncome, setTotalIncome] = useState();
  const [totalExpense, setTotalExpense] = useState();
  const [isOverBudget, setIsOverBudget] = useState(false);

  /**
   * Calculate the sum of transactions
   * @param {[]} transactions 
   * @returns {Number}
   */
  const sumTotal = (transactions = []) => {
    return transactions.reduce((total, transaction) => total += transaction.amount, 0);
  }

  useMemo(() => {
    if (histories.length) {
      const incomeTransactions = histories.filter((history) => history.type === 'income');
      const expenseTransactions = histories.filter((history) => history.type === 'expense');
      const totalIncomeTransaction = sumTotal(incomeTransactions);
      const totalExpenseTransaction = sumTotal(expenseTransactions);
      
      setIsOverBudget(totalExpenseTransaction > totalIncomeTransaction);
      setTotalIncome(totalIncomeTransaction.toFixed(2));
      setTotalExpense(totalExpenseTransaction.toFixed(2));
      setBudget((totalIncomeTransaction - totalExpenseTransaction).toFixed(2));
    }
  }, [histories]);

  return (
    <div className="flex flex-col gap-2 border shadow-xl rounded-lg p-4 w-full bg-neutral-100">
      <div className="flex flex-col">
        <span className="text-md uppercase">Available Balance</span>
        <div className="flex flex-col text-2xl font-semibold">
          <span>${budget || "0.00"}</span>
        </div>
      </div>
      <div className="flex h-20 rounded-lg gap-4">
        <div className="flex-1 flex flex-col justify-center items-center bg-white rounded-lg shadow-md">
          <span className="uppercase text-sm">Income</span>
          <span className="font-bold text-green-700 text-lg">
            ${totalIncome || "0.00"}
          </span>
        </div>
        <div className="flex-1 flex-col flex justify-center items-center bg-white rounded-lg shadow-md">
          <span className="uppercase text-sm">Expense</span>
          <span className="font-bold text-red-700 text-lg">
            ${totalExpense || "0.00"}
          </span>
        </div>
      </div>
      <span className={`text-sm font-normal ${ isOverBudget && "text-red-700"}`}>
        {isOverBudget && "You are over your budget!"}
      </span>
    </div>
  );
}

export default BalanceCard