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

// Define the Zod schema
const trackerSchema = z.object({
  title: z.string().min(4, { message: "Plese enter a valid title" })
});

export default function NewTrackerModal() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(trackerSchema),
    defaultValues: {
      title: "New Tracker"
    }
  });

  const onSubmit = async (data) => {
    console.log(data);
    // TODO: add api
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <div className="flex justify-between items-center gap-2">
            <span>New Tracker</span>
            <PlusIcon />
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
          <Button form="tracker-form" >Save Tracker</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
