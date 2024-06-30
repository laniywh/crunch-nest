export default function Header({
  hasPadding = true,
  children,
}: {
  hasPadding?: boolean;
  children: React.ReactNode;
}) {
  return (
    <h1 className={`${hasPadding ? "pb-4" : ""} text-2xl font-semibold`}>
      {children}
    </h1>
  );
}
