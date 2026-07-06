'use client';

import MenuBar from "@/components/shared/menu-bar";
import { MainContent } from "./components/main-content";
import { RecurringProvider } from "./recurring-context";
import RightMenuContent from "./components/right-menu-content";

export default function Page() {
  return (
    <RecurringProvider>
      <MenuBar 
        pageTitle="Recurring Expenses"
        rightHeader={<RightMenuContent />}
      >
        <MainContent />
      </MenuBar>
    </RecurringProvider>
  );
}