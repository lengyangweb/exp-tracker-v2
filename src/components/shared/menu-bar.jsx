'use client';

import React from 'react'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import { AppSidebar } from './app-sidebar'

const MenuBar = ({ pageTitle, rightHeader, children }) => {
  return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="m-2 rounded-sm shadow-lg">
          <header className="flex items-center border-b rounded-t-sm h-14 px-4 sticky top-0 z-50">
            <SidebarTrigger />
            <div className="flex justify-between items-center w-full">
              <h1 className="ml-2 text-lg font-semibold">{pageTitle}</h1>
              { rightHeader }
            </div>
          </header>

          {/* Main content goes here */}
          <main className='p-2'>{children}</main>
        </SidebarInset>
      </SidebarProvider>
  )
}

export default MenuBar