import MenuBar from "@/components/shared/menu-bar";
import { MainContent } from "./components/main-content";

export default function Page() {
  return (
    <MenuBar pageTitle="Recurring Expenses">
      <div className="p-4">
        <MainContent />
      </div>
    </MenuBar>
  )
}