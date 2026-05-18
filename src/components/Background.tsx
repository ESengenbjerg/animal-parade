export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(/background.jpg)" }}
    >
      {children}
    </main>
  );
}
