"use client";

import CustomerSidebar from "@/components/CustomerSidebar";
import { CustomerSidebarProvider } from "@/lib/customer-sidebar-context";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <CustomerSidebarProvider>
      <div style={{ display: "flex" }}>
        <CustomerSidebar />
        <div style={{ flex: 1 }}>
          {children}
        </div>
      </div>
    </CustomerSidebarProvider>
  );
}