'use client'

import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';

// Define the Zod schema
const registerSchema = z.object({
  username: z.string().min(4, { message: "Please enter a valid username" }),
  email: z.string().email({ message: "Plese enter a valid email" }),
  password: z.string().min(12, { message: "Password must be at least 12 characters" }),
  confirmPassword: z.string().min(12, { message: "Confirm password must be at least 12 characters" }),
});

export default function RegisterSheet({ show, setShow}) {
  const {
    reset,
    register,
    handleSubmit,
    setError: setFormError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState();

  const handleOpenChange = (value) => {
    console.log(value);
    setShow(value);
  }

  const onSubmit = async (data) => {
    setIsSending(true);
    setError(null);
    try {
      const result = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!result.ok) {
        const errorData = await result.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      toast.success('User registered successfully! Use your new account to login');
      reset();
      setShow(false); // Close the sheet on successful registration
    } catch (error) {
      if (error && error.errorType === 'validation') {
        setFormError(error.validationField, { type: 'manual', message: error.message });
        return;
      }

      setError(error.message);
      console.error('Error registering user:', error);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Sheet open={show} onOpenChange={handleOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Register New Account</SheetTitle>
          <SheetDescription>Please use the form below to register your new account.</SheetDescription>
        </SheetHeader>
        <form id='register-form' className="px-4" onSubmit={handleSubmit(onSubmit)}>
          { error && <div className='my-4 block-error'>{error}</div> }
          <div className="flex flex-col gap-1 my-4">
            <Input type="text" {...register('username')} placeholder="Username" />
            {errors.username && <p className='block-error'>{errors.username.message}</p>}
          </div>
          <div className="flex flex-col gap-1 my-4">
            <Input type="email" {...register('email')} placeholder="Email" />
            {errors.email && <p className='block-error'>{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-1 my-4">
            <Input type="password" {...register('password')} placeholder="Password" />
            {errors.password && <p className='block-error'>{errors.password.message}</p>}
          </div>
          <div className="flex flex-col gap-1 my-4">
            <Input type="password" {...register('confirmPassword')} placeholder="Confirm Password" />
            {errors.confirmPassword && <p className='block-error'>{errors.confirmPassword.message}</p>}
          </div>
        </form>
          <div className="absolute flex flex-col gap-2 bottom-2 mb-2 w-full px-3">
            <Button className="w-full" form="register-form" disabled={isSending}>
              {isSending ? <Spinner /> : 'Register'}
            </Button>
            <Button variant='outline' onClick={() => setShow(false)}>Cancel</Button>
          </div>
      </SheetContent>
    </Sheet>
  );
}
