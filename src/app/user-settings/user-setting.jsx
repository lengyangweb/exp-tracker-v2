'use client';

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const userSettingsSchema = z.object({
  username: z.string().min(4, { message: "Username must be at least 4 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
});

/**
 * User Settings Component
 * @param {Object} props
 * @param {Object} props.user - The user data
 * @param {string} props.user.username - The username of the user
 * @param {string} props.user.email - The email of the user
 * @param {boolean} props.isLoading - Loading state
 * @returns {JSX.Element}
 */
const UserSetting = ({ user, isLoading }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
    }
  });

  useEffect(() => {
    reset({
      username: user?.username || '',
      email: user?.email || '',
    });
  }, [user]);

  const onSubmit = async (data) => {
    console.log('Form Data:', data);
    // Handle form submission logic here
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update user settings');
      }

      const result = await response.json();
      if (result.success) {
        // Successfully updated user settings
        toast.success('User settings updated successfully');
      }
    } catch (error) {
      toast.error('Failed to update user settings');
      console.error('Error updating user settings:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <Card className="px-4 py-2 w-full gap-0">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Spinner size={18} />
          <p>Loading...</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-4 w-full gap-0 shadow-md bg-neutral-100/50">
      <div className="flex flex-col mb-2">
        <span className="font-semibold">User Settings</span>
        <span className="text-xs text-foreground 80">
          Manage your account settings and preferences here.
        </span>
      </div>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 mt-4">
          <div className="space-y-1 flex flex-col">
            <Label>Username</Label>
            <Input
              type="text" 
              placeholder="Enter your username"
              {...register('username')}
              className="bg-white"
              disabled={true}
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <Label>Email</Label>
            <Input
              type="email" 
              placeholder="Enter your email"
              className="bg-white"
              {...register('email')}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner size={18} /> : null} Save Changes
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default UserSetting