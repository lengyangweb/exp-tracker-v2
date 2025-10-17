'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import z from "zod";
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

// Define the Zod schema
const trackerSchema = z.object({
  title: z.string().min(4, { message: "Plese enter a valid title" })
});

export default function NewTrackerModal() {
  const [isSaving, setIsSaving] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(trackerSchema),
    defaultValues: {
      title: "Tracker"
    }
  });

  const onSubmit = async (data) => {
    console.log(data);

    setIsSaving(true);
    try {
      const response = await fetch('/api/tracker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) return toast.error('Something went wrong.');
      
      const result = await response.json();
      if (!result?.success) return toast.error(result.message);

      // save success
      toast.success(result.message);

    } catch (error) {
      console.error('Save tracker error', error);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <div className="flex justify-between items-center gap-2">
            <PlusIcon />
            <span>Tracker</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Tracker</DialogTitle>
          <DialogDescription className="text-xs">
            Use the form below to add a new tracker.
          </DialogDescription>
        </DialogHeader>
        <form id="tracker-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <Input {...register("title")} placeholder="Enter tracker title" className={`${errors.title ? 'border-red-300' : ''}`} />
            { errors && errors.title && <span className="block-error">{errors.title.message}</span>}
          </div>
        </form>
        <div className="flex justify-end">
          <Button form="tracker-form" disabled={isSaving}>
            {isSaving ? <Spinner /> : 'Save Tracker'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
