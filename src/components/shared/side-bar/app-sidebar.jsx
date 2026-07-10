'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { PlatformMenu } from "./platform-menu";
import { SettingsMenu } from "./footer-menu";

export function AppSidebar() {
  const router = useRouter();

  return (
    <Sidebar className="border-none">
      <SidebarHeader style={{ backgroundColor: "#eee" }}>
        <div className="flex gap-2">
          <span className="text-xl font-semibold">
            <i>exp</i>Tracker
          </span>
          <span className="font-light text-lg">Dashboard</span>
        </div>
      </SidebarHeader>
      <SidebarContent style={{ backgroundColor: "#eeeeee" }}>
        <PlatformMenu />
      </SidebarContent>
      <SidebarFooter style={{ backgroundColor: "#eeeeee" }}>
        <SettingsMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
