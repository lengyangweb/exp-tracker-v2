'use client';

import React from 'react'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import { AppSidebar } from './app-sidebar'

const MenuBar = ({ pageTitle, children }) => {
  return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex items-center h-14 border-b px-4 bg-background sticky top-0 z-50">
            <SidebarTrigger />
            <h1 className="ml-2 text-lg font-semibold">{pageTitle}</h1>
          </header>

          {/* Main content goes here */}
          <main className='p-2'>{children}</main>
        </SidebarInset>
      </SidebarProvider>
  )
}

export default MenuBar