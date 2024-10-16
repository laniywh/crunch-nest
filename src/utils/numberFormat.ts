export default function numberFormat(value?: number | string | null) {
  if (!value) return "N/A";
  return Intl.NumberFormat("en-us", {
    currency: "USD",
    style: "currency",
    currencyDisplay: "symbol",
    notation: "compact",
    unitDisplay: "short",
  }).format(Number(value));
}
