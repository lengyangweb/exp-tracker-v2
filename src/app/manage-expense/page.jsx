import { MainContent } from "./components/main-content";
import { RightHeaderContent } from "./components/right-header-content";
import { TrackerProvider } from "./hooks/use-tracker-context";

import MenuBar from "@/components/shared/menu-bar";

const page = () => {
  return (
    <TrackerProvider>
      <MenuBar pageTitle="Manage Expenses" rightHeader={<RightHeaderContent />}>
        <div className="w-full h-full">
          <MainContent />
        </div>
      </MenuBar>
    </TrackerProvider>
  );
};

export default page;
