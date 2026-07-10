import React from 'react'
import BalanceCard from '../manage-expense/[id]/balance-card'

export default function MainContent() {
  return (
    <div className="flex gap-4 flex-col w-full p-4">
      <BalanceCard histories={[]} />
    </div>
  );
}
