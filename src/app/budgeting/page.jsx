import MenuBar from '@/components/shared/menu-bar'
import React from 'react'
import BudgetingForm from './budgeting-form'
import BalanceCard from '../manage-expense/[id]/balance-card'
import BudgetTable from './budget-table'

const page = () => {
  return (
    <MenuBar pageTitle='Budgeting'>
      <div className="flex gap-4 flex-col w-full p-4">
        {/* Balance Cards */}
        <BalanceCard histories={[]} />
        <div className="w-full flex gap-4">
          {/* Budget Form */}
          <div className="w-1/2">
            <BudgetingForm />
          </div>
          {/* Display Budget Transaction */}
          <div className="flex-1 flex-col shadow-md py-2 px-4 rounded-md border">
            <div className='flex flex-col mb-2'>
              <span className="font-semibold">Budgeting List</span>
              <span className='text-xs text-foreground/70'>This is your budgeting list</span>
            </div>
            <hr />
            <div className="w-full mt-2">
              <BudgetTable />
            </div>
          </div>
        </div>
      </div>
    </MenuBar>
  )
}

export default page