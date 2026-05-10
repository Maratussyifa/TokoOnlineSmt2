"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  nama_barang: string;
  deskripsi: string;
  stok: number;
  harga: number;
  image: string;
}

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();

  const [namaBarang, setNamaBarang] = useState(product.nama_barang);
  const [harga, setHarga] = useState(product.harga);
  const [stok, setStok] = useState(product.stok);
  const [deskripsi, setDeskripsi] = useState(product.deskripsi);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("id", String(product.id));
    formData.append("name", namaBarang);
    formData.append("price", harga.toString());
    formData.append("stock", stok.toString());
    formData.append("description", deskripsi);

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/updatebarang`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Gagal update (${res.status})`);
      }

      router.push("/admin/product");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-xl font-medium mb-6">Edit product</h1>

      <form onSubmit={handleSubmit}>
        <div className="bg-white border border-gray-200 rounded-xl p-6">

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          {/* NAME */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Product name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              value={namaBarang}
              onChange={(e) => setNamaBarang(e.target.value)}
              required
            />
          </div>

          {/* PRICE & STOCK */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <input
              type="number"
              className="border px-3 py-2 rounded-lg"
              value={harga}
              onChange={(e) => setHarga(Number(e.target.value))}
            />
            <input
              type="number"
              className="border px-3 py-2 rounded-lg"
              value={stok}
              onChange={(e) => setStok(Number(e.target.value))}
            />
          </div>

          {/* DESCRIPTION */}
          <textarea
            className="w-full border px-3 py-2 rounded-lg mb-5"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />

          {/* IMAGE */}
          <div
            className="border border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer mb-5"
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? image.name : "Klik untuk ganti gambar"}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={handleImageChange}
          />

          {/* ACTION */}
          <div className="flex justify-end gap-2 pt-5 border-t">
            <button
              type="button"
              onClick={() => router.push("/admin/product")}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-black text-white rounded-lg"
            >
              {isLoading ? "Updating..." : "Update product"}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}