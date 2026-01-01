import React from 'react'
import MenuBar from '@/components/shared/menu-bar'
import { Insight } from './manage-expense/[id]/insight'
import MonthlyChart from '@/components/shared/monthly-chart'

const page = () => {
  return (
    <MenuBar pageTitle="Dashboard">
      <div className='px-4 py-4 flex flex-col w-full gap-4'>
        <div className='w-[600px]'>
          <Insight />
        </div>
        <div className='w-[600px]'>
          <MonthlyChart />
        </div>
      </div>
    </MenuBar>
  )
}

export default page