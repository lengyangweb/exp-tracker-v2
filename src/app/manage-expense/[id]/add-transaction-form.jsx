'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { LogInIcon, PlusIcon } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Define the Zod schema
const loginSchema = z.object({
  title: z.string().min(4, { message: "Plese enter a valid username" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const AddTransactionForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="flex flex-col border shadow-lg rounded-lg px-4 pb-4">
      <form id="transaction-form">
        <div className="flex flex-col border-b py-2">
          <span className='text-lg font-semibold'>Transaction Form</span>
          <span className="text-xs text-foreground 80">
            Use the form below to add your new transaction.
          </span>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <Label>Transaction Name:</Label>
          <Input placeholder="Enter transaction name" />
        </div>
        <div className="flex flex-col gap-2 my-4">
          <Label>Type:</Label>
          <RadioGroup className="flex" defaultValue="income">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="income" id="income" />
              <Label htmlFor="income">Income</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="expense" id="expense" />
              <Label htmlFor="expense">Expense</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-2 my-2">
          <Label>Amount:</Label>
          <Input type="number" placeholder="Enter transaction name" />
        </div>
        <Button className="w-full mt-3">
          <div className="flex gap-2 items-center">
            <span>Add Transaction</span>
            <PlusIcon />
          </div>
        </Button>
      </form>
    </div>
  )
}

export default AddTransactionForm;