'use client'

import { z } from 'zod';
import { LockIcon } from "lucide-react";
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import RegisterSheet from './register-sheet';

// Define the Zod schema
const loginSchema = z.object({
  username: z.string().min(10, { message: "Plese enter a valid username" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginForm() {
  const [showRegister, setShowRegister] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full border-2">
      <div className="w-[35vw] mt-8 pb-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 my-4">
            <Label>Enter your username & password to login.</Label>
          </div>
          <div className="flex flex-col gap-2">
            <Input
              {...register('username')}
              type="text"
              className="bg-white py-2"
              placeholder="Username"
            />
            {errors.username && <p className='block-error'>{errors.username.message}</p>}
          </div>
          <div className="flex flex-col gap-2 my-4">
            <Input
              {...register('password')}
              type="password"
              className="bg-white py-2"
              placeholder="Password"
            />
            {errors.password && <p className='block-error'>{errors.password.message}</p>}
          </div>
          <div className="flex justify-center w-full">
            <Button className="cursor-pointer w-full">Login</Button>
          </div>
        </form>
        <div className="mt-8 flex flex-col gap-2 text-sm">
          <div>New around here? <span className="cursor-pointer hover:underline" onClick={() => setShowRegister(true)}>Create Account</span></div>
          <RegisterSheet show={showRegister} setShow={setShowRegister} />
        </div>
      </div>
    </div>
  );
}
