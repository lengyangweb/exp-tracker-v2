import MenuBar from '@/components/shared/menu-bar'
import React from 'react'
import { ExpenseTable } from './manage-expense/expense-table'

const page = () => {
  return (
    <MenuBar pageTitle="Dashboard">
      <ExpenseTable />
    </MenuBar>
  )
}

export default page