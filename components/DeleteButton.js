"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ productId }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Refresh the page automatically to show the updated table
        router.refresh();
      } else {
        alert("Failed to delete product. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className={`text-red-600 hover:text-red-900 focus:outline-none transition-opacity ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
