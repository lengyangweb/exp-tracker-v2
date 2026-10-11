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
        pageDescription="View and manage scheduled expenses, including their frequency and next occurrence."
        rightHeader={<RightMenuContent />}
        fillViewport
      >
        <MainContent />
      </MenuBar>
    </RecurringProvider>
  );
}