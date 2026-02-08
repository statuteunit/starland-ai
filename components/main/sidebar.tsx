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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

  const asideBase =
    "w-[260px] h-full relative flex flex-col bg-[rgba(15,23,42,0.4)] backdrop-blur-[20px] border-r border-[var(--glass-border)] z-50 p-6 transition-[width] duration-300 ease-in-out flex-shrink-0 translate-x-[-100%] sm:translate-x-0";
  const asideCollapsed = isCollapsed ? "w-20 px-3" : "";

  const toggleBtn =
    "absolute right-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 [background:var(--background)] border border-[var(--glass-border)] rounded-full text-[var(--text-secondary)] flex items-center justify-center cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.1)] z-[100] transition-all duration-200 hover:text-[var(--primary-accent)] hover:[background:var(--surface)]";

  const logo = [
    "flex items-center gap-3 mb-10 px-2 justify-start overflow-hidden whitespace-nowrap",
    isCollapsed ? "justify-center px-0" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const logoIcon =
    "w-8 h-8 [background:var(--primary-gradient)] rounded-[8px] shadow-[0_4px_12px_rgba(139,92,246,0.3)]";
  const logoText =
    "text-xl font-bold text-[var(--text-primary)] bg-gradient-to-r from-white to-[var(--text-secondary)] bg-clip-text text-transparent";

  const nav = "flex flex-col gap-2 flex-1";
  const navItemBase =
    "flex items-center gap-3 px-4 py-3 rounded-[var(--radius-sm)] text-[var(--text-secondary)] font-medium transition-all duration-200 justify-start";
  const navItemCollapsed = isCollapsed ? "justify-center !py-3 !px-0" : "";
  const navItemHover = "hover:[background:rgba(255,255,255,0.05)] hover:text-[var(--text-primary)]";
  const navItemActive = "bg-[rgba(139,92,246,0.15)] text-[var(--primary-accent)]";

  const footer = "pt-4 pb-6 border-t border-[rgba(255,255,255,0.05)] mt-auto";
  const logoutBtnBase =
    "flex items-center gap-3 w-full px-4 py-3 bg-transparent border-0 text-[var(--text-muted)] text-[0.9rem] cursor-pointer rounded-[var(--radius-sm)] transition-all duration-200";
  const logoutBtnCollapsed = isCollapsed ? "justify-center !py-3 !px-0" : "";
  const logoutBtnHover = "hover:text-[var(--danger-accent)] hover:bg-[rgba(239,68,68,0.1)]";

  return (
    <aside className={[asideBase, asideCollapsed].filter(Boolean).join(" ")}>
      <button
        className={toggleBtn}
        onClick={toggleSidebar}
        aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      <div className={logo}>
        <div className={logoIcon} />
        {!isCollapsed && <span className={logoText}>StarLand AI</span>}
      </div>

      <nav className={nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const ItemIcon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              title={isCollapsed ? item.label : ""}
              className={[
                navItemBase,
                navItemCollapsed,
                navItemHover,
                isActive ? navItemActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
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

      <div className={footer}>
        <button
          onClick={handleLogout}
          className={[logoutBtnBase, logoutBtnCollapsed, logoutBtnHover].join(" ")}
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};