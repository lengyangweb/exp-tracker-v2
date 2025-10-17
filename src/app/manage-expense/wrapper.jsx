'use client'

import React from 'react'
import TrackerList from './tracker-list'
import NewTrackerModal from './new-tracker-modal'
import { Card, CardContent } from '@/components/ui/card'

export default function Wrapper() {
  return (
      <div className="grid grid-cols-3 gap-2">
        <Card className="col-span-2 p-4">
          <div className="flex flex-col">
            <div className="flex justify-between">
            <NewTrackerModal />
            </div>
            <TrackerList />
            {/* <ExpenseTable /> */}
          </div>
        </Card>
        <Card className="flex-1">
          <CardContent>
            <span>Yo!</span>
          </CardContent>
        </Card>
      </div>
  )
}