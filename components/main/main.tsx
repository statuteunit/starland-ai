"use client";
import React from "react";
import { Sidebar } from "./sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const toggleSidebar = () => setIsCollapsed((v) => !v);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-primary-2">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <main className="flex-1 overflow-y-auto relative h-full p-4 pb-20 sm:p-8 sm:pb-8">
        {children}
      </main>
    </div>
  );
};