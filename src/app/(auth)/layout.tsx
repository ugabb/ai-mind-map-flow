export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen place-items-center bg-gradient-to-t from-muted to-transparent lg:grid lg:grid-cols-2">
      <section className="hidden h-full w-full bg-gradient-to-t from-primary to-primary/80 object-cover lg:flex lg:flex-col lg:items-center lg:justify-center">
        <h1 className="font-bold text-4xl text-shadow text-white">
          Ai Mind Map
        </h1>
      </section>
      <section className="flex h-full w-full flex-col items-center justify-center bg-muted">
        {children}
      </section>
    </section>
  );
}
