"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCustomerSidebar } from "../lib/customer-sidebar-context";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/customer/home", icon: "🏠" },
  { label: "Produk", href: "/customer/product", icon: "🛍️" },
  { label: "Pesanan Saya", href: "/customer/orders", icon: "🛒" },
  { label: "Profil", href: "/customer/profile", icon: "👤" },
];

export default function CustomerSidebar() {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useCustomerSidebar();

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            top: 20,
            left: 16,
            zIndex: 200,
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 18,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          ☰
        </button>
      )}

      <aside style={{
        width: isOpen ? 230 : 0,
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        fontFamily: "'Segoe UI', sans-serif",
        borderRight: isOpen ? "1px solid #f0f0f0" : "none",
        boxShadow: isOpen ? "4px 0 24px rgba(0,0,0,0.06)" : "none",
        overflow: "hidden",
        transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 100,
      }}>
        <div style={{ width: 230, display: "flex", flexDirection: "column", height: "100%" }}>

          {/* Header */}
          <div style={{
            padding: "24px 20px 20px",
            borderBottom: "1px solid #f5f5f5",
            marginBottom: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#111", letterSpacing: -0.5, whiteSpace: "nowrap" }}>
                🛍️ Toko Online
              </div>
              <div style={{ fontSize: 11, color: "#bbb", marginTop: 3, whiteSpace: "nowrap" }}>
                Selamat berbelanja!
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "#f5f5f5",
                border: "none",
                borderRadius: 8,
                width: 30,
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 14,
                color: "#888",
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>

          {/* User Info */}
          <div style={{
            margin: "0 10px 12px",
            padding: "12px 14px",
            background: "#f8f8f8",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#111",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              flexShrink: 0,
            }}>
              MS
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111", whiteSpace: "nowrap" }}>Mar'atusyifa</div>
              <div style={{ fontSize: 11, color: "#bbb", whiteSpace: "nowrap" }}>inoei19@email.com</div>
            </div>
          </div>

          {/* Label */}
          <div style={{
            padding: "4px 20px 8px",
            fontSize: 10.5,
            fontWeight: 600,
            color: "#ccc",
            letterSpacing: 1,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}>
            Menu
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, padding: "0 10px" }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px",
                    borderRadius: 10,
                    marginBottom: 2,
                    fontSize: 13.5,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#111" : "#888",
                    background: isActive ? "#f4f4f4" : "transparent",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    borderLeft: isActive ? "3px solid #111" : "3px solid transparent",
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ fontSize: 17 }}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div style={{ padding: "0 10px 12px" }}>
            <button style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 10,
              width: "100%",
              fontSize: 13.5,
              fontWeight: 400,
              color: "#e53e3e",
              background: "#fff5f5",
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
              textAlign: "left",
            }}>
              <span style={{ fontSize: 17 }}>🚪</span>
              Keluar
            </button>
          </div>

          {/* Footer */}
          <div style={{
            padding: "14px 20px",
            borderTop: "1px solid #f5f5f5",
            fontSize: 11.5,
            color: "#ccc",
            whiteSpace: "nowrap",
          }}>
            v1.0.0
          </div>

        </div>
      </aside>
    </>
  );
}