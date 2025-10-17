import React from 'react'
import TrackerList from './tracker-list'
import { ExpenseTable } from './expense-table'
import NewTrackerModal from './new-tracker-modal'
import MenuBar from '@/components/shared/menu-bar'
import { Card, CardContent } from '@/components/ui/card'

const page = () => {
  return (
    <MenuBar pageTitle="Manage Expenses">
      <div className="flex gap-2">
        <Card className="flex-1 p-4">
          <div className="flex flex-col">
            <div className="flex justify-between">
            <NewTrackerModal />
            </div>
            <TrackerList />
            <ExpenseTable />
          </div>
        </Card>
        <Card className="">
          <CardContent>
            <span>Yo!</span>
          </CardContent>
        </Card>
      </div>
    </MenuBar>
  )
}

export default page