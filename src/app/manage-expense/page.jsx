import MenuBar from '@/components/shared/menu-bar'
import React from 'react'
import { ExpenseTable } from './expense-table'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import NewTrackerModal from './new-tracker-modal'

const page = () => {
  return (
    <MenuBar pageTitle="Manage Expenses">
      <div className="flex gap-2">
        <Card className="flex-1 p-4">
          <div className="flex flex-col">
            <div className="flex justify-between">
            <NewTrackerModal />
            </div>
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