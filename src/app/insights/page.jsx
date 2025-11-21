'use client'

import MenuBar from '@/components/shared/menu-bar'
import React, { useEffect, useMemo } from 'react'

const page = () => {
  const [monthTotal, setMonthTotal] = React.useState(0);
  const [insights, setInsights] = React.useState([]);

  useEffect(() => {
    // Fetch insights data from the API
    const fetchInsights = async () => {
      try {
        const response = await fetch('/api/insights')
        const data = await response.json();
        setMonthTotal(data?.monthTotal || 0);
        setInsights(data?.insights || []);
        console.log('Insights Data:', data)
      } catch (error) {
        console.error('Error fetching insights:', error)
      }
    }

    fetchInsights()
  }, []);

  return (
    <MenuBar pageTitle="Insights">
      { !insights.length === 0 && <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-2xl font-semibold">Insights Page - Coming Soon!</h1>
      </div> }

      { insights.length > 0 && (
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">This Month's Summary</h2>
          <p className="text-lg">Total Expenses: ${monthTotal}</p>
          <div className="space-y-2">
            {insights.map((insight, index) => (
              <p key={index} className="text-md">- {insight}</p>
            ))}
          </div>
        </div>
      ) }
    </MenuBar>
  )
}

export default page