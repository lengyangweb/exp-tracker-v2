'use client';

import { useMemo, useState } from 'react'
import TransactionCard from './transaction-card';
import { commatedNumber } from '@/utils/utils';
import ExpenseCard from './expense-card';

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
    if (!histories.length) histories = [];
    const incomeTransactions = histories.filter((history) => history.type === 'income');
    const expenseTransactions = histories.filter((history) => history.type === 'expense');
    const othersTransactions = histories.filter((history) => history.type === 'others');

    const totalIncomeTransaction = sumTotal(incomeTransactions);
    const totalExpenseTransaction = sumTotal(expenseTransactions);
    const totalOthersTransaction = sumTotal(othersTransactions);
      
    setIsOverBudget(totalExpenseTransaction > totalIncomeTransaction);
    setTotalIncome(commatedNumber(totalIncomeTransaction.toFixed(2)));
    setTotalExpense(commatedNumber(totalExpenseTransaction.toFixed(2)));
    setBudget(commatedNumber(((totalIncomeTransaction - totalExpenseTransaction) - totalOthersTransaction).toFixed(2)));
  }, [histories]);

  return (
    <div
      className="flex w-full snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain pb-1 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:pb-0"
      role="region"
      aria-label="Expense summaries"
      tabIndex={0}
    >
      <div className="w-[85%] shrink-0 snap-start sm:w-auto sm:shrink">
        <TransactionCard
          className="text-yellow-700"
          name="Available Balance"
          total={budget}
        />
      </div>
      <div className="w-[85%] shrink-0 snap-start sm:w-auto sm:shrink">
        <TransactionCard
          className="text-green-700"
          name="Total Income"
          total={totalIncome}
        />
      </div>
      <div className="w-[85%] shrink-0 snap-start sm:w-auto sm:shrink">
        <ExpenseCard totalExpense={totalExpense} />
      </div>
    </div>
  );
}

export default BalanceCard