"use client";

export default function ErrorMessage({
  title = "Error",
  message,
}: {
  title?: string;
  message: string;
}) {
  return (
    <div
      role="alert"
      className="w-full max-w-lg mx-auto
                 bg-red-50 border border-red-400 text-red-800
                 px-4 py-3 rounded-lg shadow-sm flex justify-center items-center gap-3 landscape:w-1/2 md:landscape:w-full"
    >
      <span className="text-red-600 text-2xl font-bold">⚠️</span>
      <div>
        <p className="font-bold text-red-700">{title}</p>
        <p className="text-red-800 text-sm">{message}</p>
      </div>
    </div>
  );
}
