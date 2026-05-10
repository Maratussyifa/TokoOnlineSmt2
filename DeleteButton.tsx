"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id }: { id: number | string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = confirm("Yakin mau hapus produk ini?");
    if (!confirmDelete) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/deletebarang/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Gagal hapus");
      }

      router.refresh();

    } catch (err) {
      alert("Error hapus data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-xs text-red-500 hover:underline"
      disabled={loading}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}