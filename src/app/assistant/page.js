import MenuBar from '@/components/shared/menu-bar'
import React from 'react'
import BudgetAssistantChat from './budget-assistant-chat'
import { Separator } from '@radix-ui/react-dropdown-menu'

const page = () => {
  return (
    <MenuBar pageTitle="AI Chat Assistant" pageDescription="AI Chat">
      {/* <div className="flex flex-col items-center justify-center h-full"> */}
        {/* <h1 className="text-3xl font-bold mb-4">View Expenses</h1>
        <p className="text-lg">This is the View Expenses page.</p> */}
        <div className='flex h-full'>
          {/* <div className='flex-1 h-full p-4 border-r-1 border-gray-300 max-w-[325px]'>
            <h1 className="text-xl font-bold">Chat Histories</h1>
            <span className="text-xs">This is the View Expenses page.</span>
            <hr />
            <div className='flex flex-col gap-1 mt-2'>
              <p className='bg-neutral-100 px-2 py-1 rounded-md border-1 text-sm'>Chat History 1</p>
              <p className='bg-neutral-100 px-2 py-1 rounded-md border-1 text-sm'>Chat History 2</p>
              <p className='bg-neutral-100 px-2 py-1 rounded-md border-1 text-sm'>Chat History 3</p>
            </div> 
          </div> */}
          <div className='h-full'>
            <BudgetAssistantChat />
          </div>
        </div>
      {/* </div>  */}
    </MenuBar>
  )
}

export default page