import Image from "next/image";

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex lg:grid lg:grid-cols-2 h-screen place-items-center bg-gradient-to-t from-muted to-transparent">
      <section className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center w-full h-full object-cover bg-gradient-to-t from-primary to-primary/80">
        <h1 className="text-4xl font-bold text-white text-shadow">
          Ai Mind Map
        </h1>
      </section>
      <section className="flex flex-col justify-center items-center w-full bg-muted h-full">
        {children}
      </section>
    </section>
  );
}
