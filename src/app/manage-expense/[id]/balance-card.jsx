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
      const totalIncomeTransaction = sumTotal(incomeTransactions).toFixed(2);
      const totalExpenseTransaction = sumTotal(expenseTransactions).toFixed(2);

      setTotalIncome(totalIncomeTransaction);
      setTotalExpense(totalExpenseTransaction);
      setBudget((totalIncomeTransaction - totalExpenseTransaction).toFixed(2));
      setIsOverBudget(totalExpenseTransaction > totalIncomeTransaction);
    }
  }, [histories]);

  return (
    <div className="flex flex-col gap-2">
      <div className='flex flex-col'>
        <span className="text-md uppercase">Your Balance</span>
        <div className={`flex flex-col text-2xl font-semibold ${isOverBudget && 'text-red-700'}`}>
          <span>${budget || '0.00'}</span>
          <span className='text-xs'>Your total expenses is higher than your total income.</span>
        </div>
      </div>
      <div className="flex border shadow-xl h-20 py-4">
        <div className='flex-1 flex flex-col justify-center items-center h-full border-r'>
          <span className='uppercase text-sm'>Income</span>
          <span className='font-bold text-green-700 text-lg'>${totalIncome || '0.00'}</span>
        </div>
        <div className='flex-1 flex-col flex justify-center items-center'>
          <span className='uppercase text-sm'>Expense</span>
          <span className='font-bold text-red-700 text-lg'>${totalExpense || '0.00'}</span>
        </div>
      </div>
    </div>
  )
}

export default BalanceCard