'use client';

import { toast } from "sonner";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogOverlay, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { useTracker } from "../hooks/use-tracker-context";
import { TrackerForm } from "./tracker-form";

export function AddTrackerButton() {
  const { addTracker } = useTracker();
  const [open, setOpen] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      await addTracker(formData);
      toast.success('Tracker added successfully.');
      setResetForm(true);
      setOpen(false);
    } catch (error) {
      toast.error('Something went wrong while saving tracker item.');
      console.error(`Something went wrong while saving tracker item: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <div className="flex justify-between items-center">
            <span>New Tracker</span>
            <PlusIcon className="ml-2 h-4 w-4" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/50" />
      <DialogContent className="fixed top-1/2 left-1/2 max-h-[90vh] w-[380px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none gap-0">
        <DialogTitle className="text-lg font-medium">
          New Tracker
        </DialogTitle>
        <DialogDescription className="text-xs mb-4">
          Use the form below to add a new tracker.
        </DialogDescription>
        <hr />
        <TrackerForm 
          onSubmit={handleOnSubmit} 
          resetForm={resetForm} 
          setResetForm={setResetForm}
        />
        <Button 
          className='w-full mt-4' 
          type="submit" 
          form="tracker-form" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
