'use client';

import MenuBar from '@/components/shared/menu-bar'
import MainContent from './main-content';
import { BudgetingProvider } from './hooks/use-budget-context';

const page = () => {
  return (
    <BudgetingProvider>
      <MenuBar pageTitle="Budgeting">
        <MainContent />
      </MenuBar>
    </BudgetingProvider>
  );
}

export default page