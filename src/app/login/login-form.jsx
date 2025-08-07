'use client'

import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import RegisterSheet from './register-sheet';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '../actions/user';
import { toast } from 'sonner';
import { LoaderPinwheel } from 'lucide-react';

// Define the Zod schema
const loginSchema = z.object({
  username: z.string().min(4, { message: "Plese enter a valid username" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginForm() {
  const [error, setError] = useState();
  const [isSending, setIsSending] = useState(false);
  const [showRegister, setShowRegister] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsSending(true);

    try {
      const result = await login(data);
      toast.success(result);
    } catch (error) {
      setError(error);
      toast.error(error);
      console.error(error);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full border-2">
      <div className="w-[35vw] mt-8 pb-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 my-4">
            <span className='font-bold text-2xl uppercase'>Login</span>
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
            <Button className="cursor-pointer w-full">
              { !isSending && 'Login' }
              { isSending && <LoaderPinwheel/> }
            </Button>
          </div>
        </form>
        { error && <div className='block-error'>{error}</div> }
        <div className="mt-8 flex flex-col gap-2 text-sm">
          <div>New around here? <span className="cursor-pointer hover:underline" onClick={() => setShowRegister(true)}>Create Account</span></div>
          <RegisterSheet show={showRegister} setShow={setShowRegister} />
        </div>
      </div>
    </div>
  );
}
