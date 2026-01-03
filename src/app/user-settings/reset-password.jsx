import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const ResetPassword = () => {
  return (
    <div className="p-4 border rounded-md">
      <div className="flex flex-col mb-2">
        <span className="font-semibold">Reset Password</span>
        <span className="text-xs text-foreground 80">
          Change your account password here.
        </span>
      </div>
      <hr />
      <form>
        <div className="flex flex-col gap-4 mt-4">
          <div className="space-y-1 flex flex-col">
            <Label>Current Password</Label>
            <Input
              type="password" 
              placeholder="Enter your current password"
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <Label>New Password</Label>
            <Input
              type="password" 
              placeholder="Enter your new password"
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <Label>Confirm New Password</Label>
            <Input 
              type="password" 
              placeholder="Confirm your new password"
            />
          </div>
          <Button type="submit" className="btn btn-primary mt-2">
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword