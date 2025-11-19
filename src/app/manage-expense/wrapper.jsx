'use client'

import React, { useState } from 'react'
import TrackerList from './tracker-list'
import NewTrackerModal from './new-tracker-modal'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

export default function Wrapper() {
  const [refetch, setRefetch] = useState(true);
  const [showNewTrackerModal, setShowNewTrackerModal] = useState(false);

  return (
      <div className="flex w-full">
        <Card className="col-span-2 p-4 w-full">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setShowNewTrackerModal(true)}>
                <div className="flex justify-between items-center gap-2">
                  <PlusIcon />
                  <span>Tracker</span>
                </div>
              </Button>
              <NewTrackerModal 
                show={showNewTrackerModal}
                setShow={setShowNewTrackerModal}
                setRefetch={setRefetch} 
              />
            </div>
            <div className='w-full'>
                <TrackerList 
                  refetch={refetch}
                  setRefetch={setRefetch}
                />
            </div>
          </div>
        </Card>
      </div>
  )
}