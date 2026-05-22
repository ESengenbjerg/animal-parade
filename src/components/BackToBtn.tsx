"use client";

import Link from "next/link";

export default function BackToBtn() {
  return (
    // <article className="w-full">
    <>
      {/* Navigate with tabs button */}
      {/* <Link
        href="https://loopland.se/"
        aria-label="Go back to Loopland"
        className="w-full"
      >
        <button
          role="link"
          className="w-full px-6 py-3 md:px-8 md:py-4 text-xl font-semibold rounded-xl shadow-lg md:text-2xl
          bg-orange-400 hover:bg-orange-500 text-white transition"
        >
          Back to Loopland
        </button>
      </Link> */}

      {/* Preparation for <iframe> button */}
      <button
        onClick={() =>
          window.parent.postMessage({ type: "AMUSEMENT_CLOSE" }, "*")
        }
        className="px-8 py-4 text-xl font-semibold rounded-xl shadow-lg bg-orange-400 hover:bg-orange-500 text-white transition md:text-2xl"
      >
        Back to Loopland
      </button>
      {/* </article> */}
    </>
  );
}
