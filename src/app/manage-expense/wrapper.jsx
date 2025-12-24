'use client'

import { useState } from 'react'
import { PlusIcon } from 'lucide-react'
import TrackerList from './tracker-list'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import TrackerFormModal from './tracker-form-modal'
import { ConfirmModal } from '@/components/shared/confirm-modal'
import { toast } from 'sonner'

export default function Wrapper() {
  const [refetch, setRefetch] = useState(true);
  const [selectedTracker, setSelectedTracker] = useState(null);
  const [showNewTrackerModal, setShowNewTrackerModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const removeTracker = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/tracker/${selectedTracker?.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) return toast.error("Something went wrong.");
      const result = await response.json();
      if (result?.success) {
        toast.success(result.message);
        setRefetch(true);
        setShowConfirmationModal(false);
        setSelectedTracker(null);
      }
    } catch (error) {
      console.error("fail to delete tracker", error);
    } finally {
      setIsDeleting(false);
    }
  };

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
              <TrackerFormModal 
                show={showNewTrackerModal}
                setShow={setShowNewTrackerModal}
                setRefetch={setRefetch} 
                editTracker={selectedTracker}
                setEditTracker={setSelectedTracker}
              />
            </div>
            <div className='w-full'>
                <ConfirmModal
                  show={showConfirmationModal}
                  setShow={setShowConfirmationModal}
                  isDeleting={isDeleting}
                  isProcessing={isDeleting}
                  action={removeTracker}
                  title="Are you sure you want to delete this tracker?"
                  description="This action cannot be undone."
                />
                <TrackerList 
                  refetch={refetch}
                  setRefetch={setRefetch}
                  setEdit={setSelectedTracker}
                  setShowEditModal={setShowNewTrackerModal}
                  setShowConfirmationModal={setShowConfirmationModal}
                />
            </div>
          </div>
        </Card>
      </div>
  )
}