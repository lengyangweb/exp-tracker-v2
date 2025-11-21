import MenuBar from '@/components/shared/menu-bar'
import React from 'react'
import { ExpenseTable } from './manage-expense/expense-table'
import { Insight } from './manage-expense/[id]/insight'

const page = () => {
  return (
    <MenuBar pageTitle="Dashboard">
      <div className='px-4 py-4 flex flex-col w-full'>
        <div className='w-[600px]'>
          <Insight />
        </div>
        {/* <ExpenseTable /> */}
      </div>
    </MenuBar>
  )
}

export default page