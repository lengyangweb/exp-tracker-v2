'use client';

import React from 'react'
import MenuBar from '@/components/shared/menu-bar'
import { Insight } from './manage-expense/[id]/insight'
import MonthlyChart from '@/components/shared/monthly-chart'
import BudgetSummaryCard from './budgeting/components/budget-summary-card';

const page = () => {
  return (
    <MenuBar pageTitle="Summary">
      <div className='px-4 py-4 flex flex-col w-full gap-4'>
        <div className='w-[720px]'>
          <Insight />
          {/* <BudgetSummaryCard /> */}
        </div>
        <div className='w-full md:w-[720px]'>
          <MonthlyChart />
        </div>
      </div>
    </MenuBar>
  )
}

export default page