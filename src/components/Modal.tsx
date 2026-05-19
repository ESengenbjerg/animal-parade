"use client";

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
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-9999">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>

        <button
          onClick={onClose}
          className="px-6 py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-lg font-semibold"
        >
          OK
        </button>
      </div>
    </div>
  );
}
