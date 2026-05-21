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
    <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col justify-center items-center bg-white rounded-xl shadow-xl p-8 text-center text-black w-100 h-80 max-w-[90%]">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>

        <button
          onClick={onClose}
          className="px-6 py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-lg font-semibold w-40"
        >
          OK
        </button>
      </div>
    </div>
  );
}
