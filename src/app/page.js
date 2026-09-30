"use client";

import React from "react";
import MenuBar from "@/components/shared/menu-bar";
import { Insight } from "./manage-expense/[id]/insight";
import MonthlyChart from "@/components/shared/monthly-chart";
import CategoryBreakdown from "@/components/shared/category-breakdown";
import RemainingRecurringCard from "@/components/shared/remaining-recurring-card";

const page = () => {
  return (
    <MenuBar pageTitle="Summary">
      <div className="w-full px-4 h-full py-4 flex flex-col gap-4">
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <div className="w-full h-full md:flex-1">
            <Insight />
          </div>
          <div className="w-full h-full md:flex-1">
            <RemainingRecurringCard />
          </div>
        </div>
        <div className="grid w-full min-w-0 grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="w-full min-w-0">
            <MonthlyChart />
          </div>
          <div className="w-full min-w-0 min-h-[420px]">
            <CategoryBreakdown />
          </div>
        </div>
      </div>
    </MenuBar>
  );
};

export default page;
