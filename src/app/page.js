"use client";

import React from "react";
import MenuBar from "@/components/shared/menu-bar";
import { Insight } from "./manage-expense/[id]/insight";
import MonthlyChart from "@/components/shared/monthly-chart";
import CategoryBreakdown from "@/components/shared/category-breakdown";

const page = () => {
  return (
    <MenuBar pageTitle="Summary">
      <div className="w-full px-4 py-4 flex flex-col gap-4">
          <div className="w-full md:w-[720px]">
            <Insight />
          </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[720px]">
            <MonthlyChart />
          </div>
          <div className="w-full h-[420px] md:w-1/2 md:h-[420px]">
            <CategoryBreakdown />
          </div>
        </div>
      </div>
    </MenuBar>
  );
};

export default page;
