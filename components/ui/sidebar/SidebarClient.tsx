"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarClient() {
  const pathname = usePathname() || "/";

  const nav = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Companies", href: "/companies" },
    { label: "Contacts", href: "/contacts" },
    { label: "Deals", href: "/deals" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900">
      <div className="px-4 py-6 border-b">
        <h2 className="text-lg font-semibold">CRM</h2>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2 text-sm font-medium ${
                active ? "bg-sky-100 text-sky-700" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t">
        <Link href="/profile" className="text-sm text-muted-foreground hover:underline">
          Profile
        </Link>
      </div>
    </div>
  );
}
