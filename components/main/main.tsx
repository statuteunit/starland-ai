"use client";
import React from "react";
import { Sidebar } from "./sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const toggleSidebar = () => setIsCollapsed((v) => !v);
    const closeSidebar = () => {
    // 打开时才生效
    if(!isCollapsed) toggleSidebar();
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-dark-secondary">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <main className="flex-1 overflow-y-auto relative h-full py-8 px-6 pb-20 lg:py-10" onClick={closeSidebar}>
        {children}
      </main>
    </div>
  );
};
