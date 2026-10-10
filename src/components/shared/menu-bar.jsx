'use client';

import React from 'react'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import { AppSidebar } from './side-bar/app-sidebar'
import { SiteFooter } from './site-footer';

/**
 * @param {{
 *   pageTitle: string;
 *   pageDescription?: string;
 *   fillViewport?: boolean;
 *   rightHeader: import('react').ReactNode;
 *   children: import('react').ReactNode;
 * }} param0
 * @returns {JSX.Element}
 */
const MenuBar = ({ 
  pageTitle, 
  pageDescription,
  fillViewport = false,
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
      <SidebarProvider className={`w-full rounded-md ${fillViewport ? 'h-svh overflow-hidden' : 'h-full'}`}>
        <AppSidebar />
        <SidebarInset className={`m-2 rounded-sm shadow-lg ${fillViewport ? 'h-[calc(100%-1rem)] min-h-0 overflow-hidden' : ''}`}>
          <header className={`flex shrink-0 items-center border-b rounded-t-sm px-4 sticky top-0 z-50 bg-background ${pageDescription ? 'min-h-16 py-2' : 'h-14'}`}>
            <SidebarTrigger />
            <div className="flex justify-between items-center w-full">
              <div className="ml-2 flex min-w-0 flex-col">
                <h1 className="truncate text-lg font-semibold">{pageTitle}</h1>
                {pageDescription && (
                  <p className="text-xs text-muted-foreground">{pageDescription}</p>
                )}
              </div>
              { rightHeader }
            </div>
          </header>

          {/* Main content goes here */}
          <main className={fillViewport ? 'flex min-h-0 flex-1 flex-col overflow-y-auto lg:overflow-hidden' : 'h-full w-full'}>
            {mainChildren}
          </main>
          {footerChild}
        </SidebarInset>
      </SidebarProvider>
  )
}

export default MenuBar