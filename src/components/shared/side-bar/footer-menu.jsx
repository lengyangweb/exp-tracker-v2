"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar";

import { DollarSign, EllipsisVertical, LogOut, Settings, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Menu items.
const SETTINGS_MENUS = [
  {
    title: "Account",
    url: "/user-settings",
    icon: Settings,
  },
  {
    title: "Billings",
    url: "#",
    icon: DollarSign,
  },
];

export function SettingsMenu() {
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (!response.ok) return toast.error("Something went wrong");

      router.push("/login"); // redirect to login page
    } catch (error) {
      console.error("logout error", error);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <User2 /> Username
              <EllipsisVertical className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-60 ml-1">
            {SETTINGS_MENUS.map((item) => (
              <DropdownMenuItem key={item.title}>
                <Link
                  href={item.url}
                  className="flex items-center justify-between w-full"
                >
                  <span>{item.title}</span>
                  <item.icon />
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem>
              <div
                className="flex items-center justify-between w-full"
                onClick={logout}
              >
                <span>Sign out</span>
                <LogOut />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
