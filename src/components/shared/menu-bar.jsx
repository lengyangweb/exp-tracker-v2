'use client';

import React from 'react'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import { AppSidebar } from './side-bar/app-sidebar'
import { SiteFooter } from './site-footer';

/**
 * @param {{
 *   pageTitle: string;
 *   rightHeader: import('react').ReactNode;
 *   children: import('react').ReactNode;
 * }} param0
 * @returns {JSX.Element}
 */
const MenuBar = ({ 
  pageTitle, 
  rightHeader, 
  children,
}) => {
  const childrenArray = React.Children.toArray(children);
  const footerChild = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === SiteFooter
  );
  const mainChildren = childrenArray.filter(
    (child) => !(React.isValidElement(child) && child.type === SiteFooter)
  );

  return (
      <SidebarProvider className="h-full w-full rounded-md">
        <AppSidebar />
        <SidebarInset className="m-2 rounded-sm shadow-lg">
          <header className="flex items-center border-b rounded-t-sm h-14 px-4 sticky top-0 z-50 bg-background">
            <SidebarTrigger />
            <div className="flex justify-between items-center w-full">
              <h1 className="ml-2 text-lg font-semibold">{pageTitle}</h1>
              { rightHeader }
            </div>
          </header>

          {/* Main content goes here */}
          <main className='h-full w-full'>{mainChildren}</main>
          {footerChild}
        </SidebarInset>
      </SidebarProvider>
  )
}

export default MenuBar