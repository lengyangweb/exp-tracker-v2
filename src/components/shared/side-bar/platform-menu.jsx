"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar";

import {
  BadgeDollarSign,
  Calendar,
  DollarSign,
  Home,
  Search,
} from "lucide-react";

// Menu items.
const PLATFORM_MENUS = [
  {
    title: "Summary",
    url: "/",
    icon: Home,
  },
  {
    title: "Expenses",
    url: "/manage-expense",
    icon: DollarSign,
  },
  {
    title: "Recurring",
    url: "/recurring",
    icon: Calendar,
  },
  {
    title: "Budgeting",
    url: "/budgeting",
    icon: BadgeDollarSign,
  },
  {
    title: "Assistant",
    url: "/assistant",
    icon: Search,
  },
];

export function PlatformMenu() {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarGroupContent>
        {PLATFORM_MENUS.map((item) => {
          const isActive =
            item.url === "/" ? pathname === item.url : pathname?.startsWith(item.url)

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={isActive}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
