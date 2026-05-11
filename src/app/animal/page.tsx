import Link from "next/link";

export default function animalPage() {
  return (
    <main
      className="h-screen bg-cover bg-center text-2xl text-black"
      style={{ backgroundImage: "url(/background.jpg)" }}
    >
      <section>
        <h1>This is the animal page where all the animal thrives</h1>
      </section>
      <nav>
        <Link href="/animal">
          <button className="px-8 py-4 text-2xl font-semibold rounded-xl shadow-lg bg-orange-400 hover:bg-orange-500 text-white transition">
            I want to see another animal!
          </button>
        </Link>

        <Link href="/receipt">
          <button className="px-8 py-4 text-2xl font-semibold rounded-xl shadow-lg bg-orange-400 hover:bg-orange-500 text-white transition">
            I'm done, thanks!
          </button>
        </Link>
      </nav>
      <section>
        <p>This is the section where the animals moves</p>
      </section>
    </main>
  );
}
