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
    <div className="w-full h-full flex-1 flex flex-col md:flex-row rounded-lg gap-3 md:gap-4">
      <TransactionCard
        className="text-yellow-700"
        name="Available Balance"
        total={budget}
      />
      <TransactionCard
        className="text-green-700"
        name="Total Income"
        total={totalIncome}
      />
      <ExpenseCard totalExpense={totalExpense} />
    </div>
  );
}

export default BalanceCard