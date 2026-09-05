"use client";

import React from "react";
import {
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true} className="sidebar-provider relative z-10">
      <AppSidebar />

      <div className="flex flex-col flex-1 min-h-screen w-full relative overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto w-full">
          <div className="w-full h-full p-4 sm:p-6 md:p-8 lg:p-10 animate-in fade-in slide-from-bottom-2 duration-500">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
