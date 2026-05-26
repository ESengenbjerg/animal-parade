import Background from "@/components/Background";

export default function NotFound() {
  return (
    <Background>
      <main className="flex items-center justify-center h-screen">
        <section className="flex flex-col justify-center items-center w-1/3 text-center text-black">
          <h1 className="text-4xl font-bold mb-4">404 — Lost in the Parade</h1>
          <p className="mb-6">This animal seems to have wandered off...</p>
          {/* Custom button for browser, user on Loopland shouldn't be able to get here */}
          <a
            href="/"
            className="bg-orange-400 hover:bg-orange-500 text-white text-xl font-semibold px-6 py-3 rounded-xl shadow-lg transition md:text-2xl"
          >
            Back to start
          </a>
        </section>
      </main>
    </Background>
  );
}
