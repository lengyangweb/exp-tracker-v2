'use client';

import MenuBar from "@/components/shared/menu-bar";
import { ReOccuringExpenses } from "./reocurring-expenses";

export default function UserSettingsPage() {
  return (
    <MenuBar pageTitle="User Settings">
      <div className="flex flex-col p-6">
        {/* <h1 className="text-2xl font-bold mb-4">User Settings</h1> */}
        {/* <p>This is the user settings page. Here you can manage your account settings and preferences.</p> */}
        <div className="flex-1 w-[600px]">
          <ReOccuringExpenses />
        </div>
      </div>
    </MenuBar>
  );
}