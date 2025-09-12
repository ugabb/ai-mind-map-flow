export default function ResizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full">
      <h1>Content Page</h1>
      {children}
    </div>
  );
}
