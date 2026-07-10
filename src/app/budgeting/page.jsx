'use client';

import MenuBar from '@/components/shared/menu-bar'
import MainContent from './main-content';

const page = () => {
  return (
    <MenuBar pageTitle="Budgeting">
      <MainContent />
    </MenuBar>
  );
}

export default page