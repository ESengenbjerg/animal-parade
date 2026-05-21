"use client";

import Link from "next/link";

export default function BackToBtn() {
  return (
    <article className="mt-12">
      {/* Navigate with tabs button */}
      <Link
        href="https://frontend-main-1ac7.up.railway.app/user"
        aria-label="Go back to Tivoli"
      >
        <button
          role="link"
          className="px-8 py-4 text-2xl font-semibold rounded-xl shadow-lg 
        bg-orange-400 hover:bg-orange-500 text-white transition"
        >
          Back to Tivoli
        </button>
      </Link>

      {/* Preparation for <iframe> button */}
      {/* <button
        onClick={() =>
          window.parent.postMessage({ type: "AMUSEMENT_CLOSE" }, "*")
        }
        className="px-8 py-4 text-2xl font-semibold rounded-xl shadow-lg bg-orange-400 hover:bg-orange-500 text-white transition"
      >
        Back to Loopland
      </button> */}
    </article>
  );
}
