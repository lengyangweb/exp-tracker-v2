'use client';

import MenuBar from '@/components/shared/menu-bar'
import React, { useEffect, useState } from 'react'
import BudgetingForm from './budgeting-form'
import BalanceCard from '../manage-expense/[id]/balance-card'
import BudgetTable from './budget-table'
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const page = () => {
  const [refetch, setRefetch] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [budgetList, setBudgetList] = useState([]);

  useEffect(() => {
    if (refetch) {
      setIsLoading(true);

      let budgetList = localStorage.getItem('budget-list');
      if (budgetList) budgetList = JSON.parse(budgetList);
      if (!budgetList) localStorage.setItem('budget-list', []);
      setBudgetList(budgetList || []);
      setRefetch(false);
      setIsLoading(false);
    }

    return () => {
      // clear budget list
      // localStorage.removeItem('budget-list');
    }
  }, [refetch]);

  const removeItem = (item) => {
    let tempList = [...budgetList];
    tempList = tempList.filter((listItem) => listItem.title !== item.title);
    // update localStorage
    localStorage.setItem('budget-list', JSON.stringify(tempList));
    setBudgetList(tempList);
    toast.success('Item has been removed.');
  }

  const clearBudgetList = () => {
    localStorage.removeItem('budget-list');
    setBudgetList([]);
    toast.success('Budget list has been clear.');
  }

  return (
    <MenuBar pageTitle="Budgeting">
      <div className="flex gap-4 flex-col w-full p-4">
        {/* Balance Cards */}
        <BalanceCard histories={budgetList} />
        <div className="w-full h-full flex flex-col lg:flex-row gap-4 mt-14 lg:mt-0">
          {/* Budget Form */}
          <div className="w-full lg:w-1/2">
            <BudgetingForm setRefetch={setRefetch} />
          </div>
          {/* Display Budget Transaction */}
          <div className="flex-1 flex-col shadow-md py-2 px-4 rounded-md border w-full">
            <div className="flex justify-between items-center">
              <div className="flex flex-col mb-2">
                <span className="font-semibold">Budgeting List</span>
                <span className="text-xs text-foreground/70">
                  This is your budgeting list
                </span>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size='sm' variant='outline' onClick={clearBudgetList}>
                    <div className="flex justify-center items-center gap-2">
                      <span>Clear</span>
                      <Trash2Icon />
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear Budget List</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <hr />
            <div className="w-full h-4/5 mt-2">
              { isLoading && (
                <div className='w-full h-full flex flex-col justify-center items-center'>
                  <Spinner />
                  <span>Loading Budget List</span>
                </div>
              )}
              {!isLoading && budgetList.length === 0 && (
                <div className='w-full h-full flex justify-center items-center'>
                  <p>Use the form on the left to add your budgeting transactions.</p>
                </div>
              )}
              {!isLoading && budgetList.length > 0 && (
                <BudgetTable data={budgetList} removeItem={removeItem} />
              )}
            </div>
          </div>
        </div>
      </div>
    </MenuBar>
  );
}

export default page