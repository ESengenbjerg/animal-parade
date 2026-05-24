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
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
      {/* Removed bg-gray-500/20 */}
      <div
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
