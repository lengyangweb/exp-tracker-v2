import MenuBar from '@/components/shared/menu-bar'
import React from 'react'
import { ExpenseTable } from './manage-expense/expense-table'
import { Insight } from './manage-expense/[id]/insight'
import MonthlyChart from '@/components/shared/monthly-chart'

const page = () => {
  return (
    <MenuBar pageTitle="Dashboard">
      <div className='px-4 py-4 flex flex-col w-full gap-4'>
        <div className='w-[600px]'>
          <Insight />
        </div>
        {/* <ExpenseTable /> */}
        <div className='w-[600px]'>
          <MonthlyChart />
        </div>
      </div>
    </MenuBar>
  )
}

export default page