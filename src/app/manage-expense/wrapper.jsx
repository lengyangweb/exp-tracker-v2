'use client'

import { useState } from 'react'
import { PlusIcon } from 'lucide-react'
import TrackerList from './tracker-list'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import NewTrackerModal from './new-tracker-modal'

export default function Wrapper() {
  const [refetch, setRefetch] = useState(true);
  const [editInfo, setEditInfo] = useState(null);
  const [showNewTrackerModal, setShowNewTrackerModal] = useState(false);

  return (
      <div className="flex flex-col w-full">
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
                editTracker={editInfo}
              />
            </div>
            <div className='w-full'>
                <TrackerList 
                  refetch={refetch}
                  setRefetch={setRefetch}
                  setEdit={setEditInfo}
                  setShowEditModal={setShowNewTrackerModal}
                />
            </div>
          </div>
        </Card>
      </div>
  )
}