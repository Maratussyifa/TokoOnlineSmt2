"use client";

import { useEffect, useState } from "react";
import { BASE_URL, IMAGE_URL, authHeaders, getUser } from "../../../lib/api";

interface Barang {
  id: number;
  nama_barang: string;
  deskripsi: string;
  harga: number;
  stok: number;
  image: string;
}

export default function CustomerHome() {
  const [barang, setBarang] = useState<Barang[]>([]);
  const [loading, setLoading] = useState(true);
  const user = getUser();

  useEffect(() => {
    fetch(`${BASE_URL}/user/getbarang`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((d) => setBarang(d.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main
      style={{
        marginLeft: 230,
        padding: "32px 40px",
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* 🔥 HERO / WELCOME */}
      <div
        style={{
          background: "linear-gradient(135deg, #111, #333)",
          borderRadius: 16,
          padding: "24px 28px",
          color: "#fff",
          marginBottom: 28,
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>
          Selamat Datang, {user?.name || "Pelanggan"} 👋
        </h1>
        <p style={{ fontSize: 13, opacity: 0.8 }}>
          Jelajahi produk terbaik pilihan hari ini
        </p>
      </div>

      {/* 🔥 PRODUK TERBARU */}
      <div style={{ marginBottom: 16 }}>
        <h2
          style={{
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 12,
            color: "#111",
          }}
        >
          🛍️ Produk Terbaru
        </h2>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p style={{ color: "#aaa", fontSize: 14 }}>Memuat produk...</p>
      ) : barang.length === 0 ? (
        <p style={{ color: "#aaa" }}>Belum ada produk tersedia.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {barang.slice(0, 8).map((item) => (
            <div
              key={item.id}
              style={{
                background: "#fff",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                transition: "0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget.style.transform = "translateY(-4px)"))
              }
              onMouseLeave={(e) =>
                ((e.currentTarget.style.transform = "translateY(0)"))
              }
            >
              <img
                src={`${IMAGE_URL}${item.image}`}
                alt={item.nama_barang}
                style={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                  background: "#f5f5f5",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/220x160";
                }}
              />

              <div style={{ padding: "14px 16px" }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#111",
                    marginBottom: 4,
                  }}
                >
                  {item.nama_barang}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: "#888",
                    marginBottom: 10,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.deskripsi}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#111",
                    }}
                  >
                    Rp {Number(item.harga).toLocaleString("id-ID")}
                  </span>

                  <span style={{ fontSize: 11.5, color: "#aaa" }}>
                    Stok: {item.stok}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔥 LIHAT SEMUA */}
      {barang.length > 8 && (
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <button
            style={{
              padding: "10px 18px",
              borderRadius: 10,
              border: "none",
              background: "#111",
              color: "#fff",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Lihat Semua Produk
          </button>
        </div>
      )}
    </main>
  );
}