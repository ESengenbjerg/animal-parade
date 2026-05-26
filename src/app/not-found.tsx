import BackToBtn from "@/components/BackToBtn";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404 — Lost in the Parade</h1>
      <p className="mb-6">This animal seems to have wandered off...</p>
      <BackToBtn />
    </main>
  );
}
