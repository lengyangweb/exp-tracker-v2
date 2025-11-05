'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import React from 'react';

const histories = [
  { id: 1, title: 'title 1', amount: 50.25, createdAt: Date.now() },
  { id: 2, title: 'title 2', amount: 5.00, createdAt: Date.now() },
  { id: 3, title: 'title 3', amount: 23.25, createdAt: Date.now() },
  { id: 4, title: 'title 4', amount: 500.25, createdAt: Date.now() },
  { id: 5, title: 'title 5', amount: 150.25, createdAt: Date.now() },
  { id: 6, title: 'title 6', amount: 350.25, createdAt: Date.now() },
  { id: 7, title: 'title 7', amount: 450.25, createdAt: Date.now() },
  { id: 8, title: 'title 8', amount: 150.25, createdAt: Date.now() },
  { id: 9, title: 'title 9', amount: 550.25, createdAt: Date.now() },
  { id: 10, title: 'title 10', amount: 750.25, createdAt: Date.now() },
  { id: 11, title: 'title 8', amount: 150.25, createdAt: Date.now() },
  { id: 12, title: 'title 9', amount: 550.25, createdAt: Date.now() },
  { id: 13, title: 'title 10', amount: 750.25, createdAt: Date.now() },
  { id: 14, title: 'title 8', amount: 150.25, createdAt: Date.now() },
  { id: 15, title: 'title 9', amount: 550.25, createdAt: Date.now() },
  { id: 16, title: 'title 10', amount: 750.25, createdAt: Date.now() },
  { id: 17, title: 'title 8', amount: 150.25, createdAt: Date.now() },
  { id: 18, title: 'title 9', amount: 550.25, createdAt: Date.now() },
  { id: 19, title: 'title 10', amount: 750.25, createdAt: Date.now() },
  { id: 20, title: 'title 8', amount: 150.25, createdAt: Date.now() },
  { id: 21, title: 'title 9', amount: 550.25, createdAt: Date.now() },
  { id: 22, title: 'title 10', amount: 750.25, createdAt: Date.now() },
];

function TransactionHistory() {
  return (
    <div className='border shadow-xl rounded-lg w-100'>
      <div className="flex flex-col gap-2 pb-2">
        <div className="flex flex-col border-b py-2 px-4">
          <span className='text-lg font-semibold'>Transaction History</span>
          <div className="text-xs">All of your transaction history logs.</div>
        </div>
        {/* Transaction Histories */}
        <div className='max-h-100 overflow-y-auto'>
          { histories.map((history) => (
            <div key={history.id} className='flex justify-between border items-center'>
              <span className='px-2'>{history.title}</span>
              <Button className='bg-white text-foreground border-none shadow-none hover:bg-white'><X /></Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory