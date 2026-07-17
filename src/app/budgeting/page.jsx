"use client";

import MenuBar from "@/components/shared/menu-bar";
import MainContent from "./main-content";
import { BudgetingProvider } from "./hooks/use-budget-context";
import ClearButton from "./components/clear-button";

const page = () => {
  return (
    <BudgetingProvider>
      <MenuBar
        pageTitle="Budgeting"
        rightHeader={
          <>
            <ClearButton />
          </>
        }
      >
        <MainContent />
      </MenuBar>
    </BudgetingProvider>
  );
};

export default page;
