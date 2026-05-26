"use client";

import { useEffect, useRef } from "react";

export default function Modal({
  open,
  title,
  message,
  onClose,
}: {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal with ESC
  useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        window.parent.postMessage({ type: "AMUSEMENT_CLOSE" }, "*");
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (!open || !modalRef.current) return;

    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function trap(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab - jump to last element
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab - jump to first element
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", trap);
    first?.focus();

    return () => document.removeEventListener("keydown", trap);
  }, [open]);

  // Closed modal - don't render
  if (!open) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="flex flex-col justify-center items-center
      bg-white text-black rounded-xl shadow-xl text-center p-4 m-8 w-full max-w-[90%]
      landscape:p-8 landscape:mx-20
      md:p-8 md:w-100 md:h-80"
      >
        <h2 className="text-xl font-bold mb-4 md:text-2xl">{title}</h2>
        <p className="mb-6 text-sm md:text-base">{message}</p>

        <button
          onClick={() =>
            window.parent.postMessage({ type: "AMUSEMENT_CLOSE" }, "*")
          }
          className="px-6 py-3 text-2xl font-semibold rounded-xl shadow-lg bg-orange-400 hover:bg-orange-500 text-white transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}
