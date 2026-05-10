"use client";

import { createContext, useContext, useState } from "react";

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  setIsOpen: () => {},
});

export function CustomerSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useCustomerSidebar = () => useContext(SidebarContext);