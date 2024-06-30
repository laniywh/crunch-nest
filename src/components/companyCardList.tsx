export default function CompanyCardList({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))" }}
    >
      {children}
    </div>
  );
}
