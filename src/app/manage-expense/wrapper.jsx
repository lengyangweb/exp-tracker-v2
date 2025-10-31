'use client'

import React from 'react'
import TrackerList from './tracker-list'
import NewTrackerModal from './new-tracker-modal'
import { Card, CardContent } from '@/components/ui/card'

export default function Wrapper() {
  return (
      <div className="flex w-full">
        <Card className="col-span-2 p-4 w-full">
          <div className="flex flex-col">
            <div className="flex justify-between">
            <NewTrackerModal />
            </div>
            <TrackerList />
            {/* <ExpenseTable /> */}
          </div>
        </Card>
      </div>
  )
}