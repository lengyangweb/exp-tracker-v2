'use client'

import MenuBar from '@/components/shared/menu-bar'
import React, { useEffect, useMemo } from 'react'

const page = () => {

  useEffect(() => {
    // Fetch insights data from the API
    const fetchInsights = async () => {
      try {
        const response = await fetch('/api/insights')
        const data = await response.json()
        console.log('Insights Data:', data)
      } catch (error) {
        console.error('Error fetching insights:', error)
      }
    }

    fetchInsights()
  }, []);

  return (
    <MenuBar pageTitle="Insights">
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-2xl font-semibold">Insights Page - Coming Soon!</h1>
      </div>
    </MenuBar>
  )
}

export default page