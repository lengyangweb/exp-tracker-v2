'use client';

import MenuBar from "@/components/shared/menu-bar";
import { MainContent } from "./components/main-content";
import { RecurringProvider } from "./recurring-context";

export default function Page() {
  return (
    <RecurringProvider>
      <MenuBar pageTitle="Recurring Expenses">
        <MainContent />
      </MenuBar>
    </RecurringProvider>
  );
}