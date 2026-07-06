'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { TrackerForm } from "./tracker-form";
import { useTracker } from "../hooks/use-tracker-context";
import { useState } from "react";

export default function UpdateTrackerModal({ 
  show,
  setShow,
  editTracker,
  setEditTracker,
}) {
  const { updateTracker } = useTracker();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await updateTracker(editTracker.id, data);
      setShow(false);
      setEditTracker(null);
      toast.success('Tracker updated.')
    } catch (error) {
      console.error('Failed to update tracker', error);
      toast.error('Failed to update tracker.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleOnChange = (value) => {
    if (!value) setEditTracker(null);
    setShow(value);
  };

  return (
    <Dialog open={show} onOpenChange={handleOnChange}>
      <DialogContent className="w-full md:w-90">
        <DialogHeader>
          <DialogTitle>Update Tracker</DialogTitle>
          <DialogDescription className="text-xs">
            Use the form below to update tracker.
          </DialogDescription>
        </DialogHeader>
        <TrackerForm 
          data={editTracker}
          onSubmit={onSubmit}
        />
        <div className="flex justify-center w-full">
          <Button form="tracker-form" disabled={isSubmitting} className="w-full">
            {isSubmitting ? <Spinner /> : `Update`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
