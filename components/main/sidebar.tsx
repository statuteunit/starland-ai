"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  FileText,
  Layers,
  Users,
  LogOut,
  MessageSquare,
  PanelLeft,
} from "lucide-react";
import { cn } from "@/utils/tools";

type SidebarProps = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    try {
      localStorage.removeItem("access_token");
    } catch { }
    router.push("/login");
  };

  const navItems = [
    { label: "Dashboard", icon: Home, path: "/dashboard" },
    { label: "My Notes", icon: FileText, path: "/notes" },
    { label: "Flashcards", icon: Layers, path: "/flashcards" },
    { label: "AI Chat", icon: MessageSquare, path: "/chat" },
    { label: "Community", icon: Users, path: "/community" },
  ];

  const logoutBtnCollapsed = isCollapsed ? "justify-center !py-3 !px-0" : "";

  return (
    <>
      {/* 移动端 */}
      <div className="relative lg:hidden">
        <PanelLeft onClick={toggleSidebar}
          className={`${isCollapsed ? 'block' : 'hidden'} w-6 h-6 text-secondary absolute left-4 top-4 z-[100]`} />
        {!isCollapsed && (<aside className="px-6 border-r border-glass-border">
          <div className={`flex items-center gap-3 mt-6 mb-10 px-2 justify-start overflow-hidden whitespace-nowrap ${isCollapsed ? "justify-center px-0" : ""}`}>
            <div className={"w-8 h-8 bg-primary-gradient rounded-[8px] shadow-[0_4px_12px_rgba(139,92,246,0.3)]"} />
            {!isCollapsed && <span className={"text-xl font-bold text-primary bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent"}>StarLand AI</span>}
          </div>
          <nav className={"flex flex-col gap-2 flex-1"}>
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-[8px] text-secondary font-medium justify-start",
                    isActive ? "bg-[rgba(139,92,246,0.15)] text-primary-accent" : "",
                  )}
                >
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
          <div className={"pt-4 pb-6 border-t border-[rgba(255,255,255,0.05)] mt-auto"}>
            <button
              onClick={handleLogout}
              className={cn("flex items-center gap-3 w-full px-4 py-3 bg-transparent border-0 text-muted text-[0.9rem] cursor-pointer rounded-[8px]", logoutBtnCollapsed)}
            >
              <LogOut size={20} />
              {!isCollapsed && <span>Sign Out</span>}
            </button>
          </div>
        </aside>)}
      </div>
      {/* pc端导航栏 */}
      <aside className={"hidden lg:flex relative w-fit h-full flex-col bg-[rgba(15,23,42,0.4)] backdrop-blur-[20px] border-r border-glass-border z-50 p-6 flex-shrink-0"}>
        <PanelLeft className="absolute top-6 right-[-40px] w-6 h-6 bg-dark border border-glass-border rounded-full text-secondary cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:text-primary-accent hover:bg-primary-gradient"
          onClick={toggleSidebar}
        />
        <div className={`flex items-center gap-3 mt-6 mb-10 px-2 justify-start overflow-hidden whitespace-nowrap ${isCollapsed ? "justify-center px-0" : ""}`}>
          <div className={"w-8 h-8 bg-primary-gradient rounded-[8px] shadow-[0_4px_12px_rgba(139,92,246,0.3)]"} />
          {!isCollapsed && <span className={"text-xl font-bold text-primary bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent"}>StarLand AI</span>}
        </div>
        <nav className={"flex flex-col gap-2 flex-1"}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const ItemIcon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-[8px] text-secondary font-medium justify-start",
                  isActive ? "bg-[rgba(139,92,246,0.15)] text-primary-accent" : "",
                )}
              >
                <ItemIcon
                  size={20}
                  className={isActive ? "opacity-100" : "opacity-80"}
                />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className={"pt-4 pb-6 border-t border-[rgba(255,255,255,0.05)] mt-auto"}>
          <button
            onClick={handleLogout}
            className={cn("flex items-center gap-3 w-full px-4 py-3 bg-transparent border-0 text-muted text-[0.9rem] cursor-pointer rounded-[8px] transition-all duration-200 hover:text-danger-accent hover:bg-[rgba(239,68,68,0.1)]", logoutBtnCollapsed)}
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
