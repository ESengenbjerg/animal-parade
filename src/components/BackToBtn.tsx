"use client";

export default function BackToBtn({ tokenValid }: { tokenValid?: boolean }) {
  const colorClasses = tokenValid
    ? "bg-orange-700 hover:bg-orange-800 text-white" // darker for Cancel
    : "bg-orange-400 hover:bg-orange-500 text-white"; // default CTA
  return (
    <>
      {/* <iframe> button */}
      <button
        onClick={() =>
          window.parent.postMessage({ type: "AMUSEMENT_CLOSE" }, "*")
        }
        type="button"
        className={`w-full px-6 py-3 text-xl font-semibold rounded-xl shadow-lg text-white transition md:px-8 md:py-4 md:text-2xl ${colorClasses}`}
      >
        Back to Loopland
      </button>
    </>
  );
}
