"use client";

import Link from "next/link";

export default function BackToBtn() {
  return (
    <article className="mt-12">
      {/* Navigate with tabs button */}
      <Link href="https://loopland.se/" aria-label="Go back to Loopland">
        <button
          role="link"
          className="px-8 py-4 text-2xl font-semibold rounded-xl shadow-lg 
        bg-orange-400 hover:bg-orange-500 text-white transition"
        >
          Back to Loopland
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
