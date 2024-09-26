import Image from "next/image";

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex lg:grid lg:grid-cols-2 h-screen place-items-center bg-gradient-to-t from-blue-50 to-transparent">
      <section className="hidden lg:block w-full h-full object-cover bg-gradient-to-t from-indigo-500 to-indigo-400"></section>
      <section className="flex flex-col justify-center items-center w-full bg-zinc-100 h-full">
        {children}
      </section>
    </section>
  );
}
