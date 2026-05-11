import Image from "next/image";

export default function Home() {
  return (
    <main
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(/background.jpg)" }}
    >
      <section className="flex flex-col items-center justify-evenly h-full text-black">
        <article className="pb-8">
          <h1 className="font-bold text-4xl">Welcome to the animal parade!</h1>
          <p>
            Here you may see some exotic animals in their natural behaviour.
          </p>
          <p>
            <span className="font-extrabold">Entrance fee: </span>2 euro
          </p>
        </article>
        <article className="pt-48">
          <button className="px-8 py-4 text-2xl font-semibold rounded-xl shadow-lg bg-orange-400 hover:bg-orange-500 text-white transition">
            See an animal
          </button>
        </article>
      </section>
    </main>
  );
}
