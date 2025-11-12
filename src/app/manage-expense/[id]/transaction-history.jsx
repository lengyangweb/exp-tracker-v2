'use client';

import React from 'react';
import TransactionHistoryItem from './transaction-history-item';

function TransactionHistory({ histories }) {
  return (
    <div className='border shadow-xl rounded-lg w-130'>
      <div className="flex flex-col gap-2 pb-2">
        <div className="flex flex-col border-b py-2 px-4 bg-neutral-100">
          <span className='text-lg font-semibold'>Transaction History</span>
          <div className="text-xs">All of your transaction history logs.</div>
        </div>
        {/* Transaction Histories */}
        <div className='max-h-107 overflow-y-auto w-full'>
          { histories.map((history) => (
            <TransactionHistoryItem
              key={crypto.randomUUID()}
              history={history}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory