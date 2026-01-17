'use client';

import React, { use } from "react";
import LoginForm from "./login-form";
import { useIsMobile } from "@/hooks/use-mobile";

const page = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[100vh]">
        <div className="w-full h-20 bg-blue-900 text-white font-bold p-4 flex items-center">
          <span className="italic text-2xl">exp</span>
          <span className="text-3xl">Tracker</span>
        </div>
        <LoginForm />
      </div>
    );
  }
  
  return (
    <div className="flex items-center w-full h-[100vh]">
      <div className="w-[35vw] h-full bg-blue-900 text-white font-bold p-4">
        <span className="italic text-2xl">exp</span>
        <span className="text-3xl">Tracker</span>
      </div>
      <LoginForm />
    </div>
  );
};

export default page;
