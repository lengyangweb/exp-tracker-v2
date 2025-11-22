'use client';

import { useMemo, useState } from 'react'
import TransactionCard from './transaction-card';
import { commatedNumber } from '@/utils/utils';

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
      setTotalIncome(commatedNumber(totalIncomeTransaction.toFixed(2)));
      setTotalExpense(commatedNumber(totalExpenseTransaction.toFixed(2)));
      setBudget(commatedNumber((totalIncomeTransaction - totalExpenseTransaction).toFixed(2)));
    }
  }, [histories]);

  return (
    <div className="flex gap-2 rounded-lg w-full">
      <div className="flex-1 flex h-25 rounded-lg gap-4">
        <TransactionCard className="text-yellow-700" name="Available Balance" total={budget} />
        <TransactionCard className="text-green-700" name="Total Income" total={totalIncome} />
        <TransactionCard className="text-red-700" name="Total Expense" total={totalExpense} />
      </div>
      <span className={`text-sm font-normal ${ isOverBudget && "text-red-700"}`}>
        {isOverBudget && "You are over your budget!"}
      </span>
    </div>
  );
}

export default BalanceCard