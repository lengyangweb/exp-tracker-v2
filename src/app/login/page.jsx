import React from "react";
import LoginForm from "./login-form";


const page = () => {
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
