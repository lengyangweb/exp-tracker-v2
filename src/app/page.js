import MenuBar from '@/components/shared/menu-bar'
import React from 'react'
import { ExpenseTable } from './manage-expense/expense-table'

const page = () => {
  return (
    <MenuBar pageTitle="Dashboard">
      <div className='p-4'>
        <ExpenseTable />
      </div>
    </MenuBar>
  )
}

export default page