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
import z from "zod";
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

// Define the Zod schema
const trackerSchema = z.object({
  title: z.string().min(4, { message: "Plese enter a valid title" })
});

export default function NewTrackerModal({ 
  show,
  setShow,
  setRefetch,
  editTracker,
}) {
  const [mode, setMode] = useState("create");
  const [isSaving, setIsSaving] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    resolver: zodResolver(trackerSchema),
    defaultValues: {
      title: "Tracker"
    }
  });

  useEffect(() => {
    if (editTracker) {
      setMode("edit");
      reset({ title: editTracker.title });
    } else {
      setMode("create");
      reset();
    }
  }, [editTracker]);

  const onSubmit = async (data) => {
    if (mode === "edit") {
      // Handle editTracker logic here
      updateTracker(data);
    } else {
      saveTracker(data);
    }
  }

  const saveTracker = async (data) => {
    setIsSaving(true);

    try {
      const response = await fetch("/api/tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) return toast.error("Something went wrong.");

      const result = await response.json();
      if (!result?.success)
        return setError("title", { message: result.message });

      // save success
      setRefetch(true);
      setShow(false);
      reset();
    } catch (error) {
      console.error("Save tracker error", error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateTracker = async (data) => {
    setIsSaving(true);

    try {
      const response = await fetch(`/api/tracker/${editTracker.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) return toast.error("Something went wrong.");

      const result = await response.json();
      if (!result?.success)
        return setError("title", { message: result.message });

      // update success
      setRefetch(true);
      setShow(false);
      reset();
    } catch (error) {
      console.error("Update tracker error", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="w-full md:w-90">
        <DialogHeader>
          <DialogTitle>New Tracker</DialogTitle>
          <DialogDescription className="text-xs">
            Use the form below to add a new tracker.
          </DialogDescription>
        </DialogHeader>
        <form id="tracker-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            { errors && errors.title && <span className="block-error my-1">{errors.title.message}</span> }
            <Input {...register("title")} placeholder="Enter tracker title" className={`${errors.title ? 'border-red-300' : ''}`} />
          </div>
        </form>
        <div className="flex justify-center w-full">
          <Button form="tracker-form" disabled={isSaving} className="w-full">
            {isSaving ? <Spinner /> : `${mode === "edit" ? "Update Tracker" : "Save Tracker"}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
