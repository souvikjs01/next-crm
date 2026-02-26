import React from "react";
import SidebarClient from "./SidebarClient";

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  // Placeholder provider in case you want to store sidebar state later
  return <>{children}</>;
}

export { SidebarClient as Sidebar };
