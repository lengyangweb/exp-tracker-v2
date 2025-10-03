import { AppSidebar } from '@/components/shared/app-sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Spinner } from '@/components/ui/spinner'
import React from 'react'

const page = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        {/* <h1>Hello World!</h1> */}
      </SidebarProvider>
    </>
  )
}

export default page