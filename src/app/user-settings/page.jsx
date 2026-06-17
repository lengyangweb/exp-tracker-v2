"use client";

import MenuBar from "@/components/shared/menu-bar";
import { ReOccuringExpenses } from "./reocurring-expenses";
import UserSetting from "./user-setting";
import ResetPassword from "./reset-password";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function UserSettingsPage() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from API or context
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        if (response.status === 401) {
          // Handle unauthorized access, e.g., redirect to login
          router.push("/login");
          return;
        }

        const result = await response.json();
        setUser(result.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <MenuBar pageTitle="User Settings">
      <div className="flex flex-col lg:flex-row gap-4 p-6">
        <div className="flex-1 flex flex-col gap-4">
          <ReOccuringExpenses />
        </div>
        <div className="flex flex-col gap-3 w-full sm:w-[350px]">
          <UserSetting user={user} isLoading={loading} />
          <ResetPassword />
        </div>
      </div>
    </MenuBar>
  );
}
