import Link from "next/link";

export default function receiptPage() {
  return (
    <main
      className="h-screen bg-cover bg-center text-2xl text-black"
      style={{ backgroundImage: "url(/background.jpg)" }}
    >
      <h1>This is the receipt page</h1>
      <Link href="https://tivoli-develop.up.railway.app/">
        <button className="px-8 py-4 text-2xl font-semibold rounded-xl shadow-lg bg-orange-400 hover:bg-orange-500 text-white transition">
          Go back to Tivoli!
        </button>
      </Link>
    </main>
  );
}
