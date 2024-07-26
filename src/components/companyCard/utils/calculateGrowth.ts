export default function calculateGrowth(
  currentValue: number,
  previousValue: number,
) {
  if (previousValue === 0) {
    return currentValue > 0 ? Infinity : currentValue < 0 ? -Infinity : 0; // Handle division by zero
  } else if (previousValue < 0) {
    return Math.floor(
      ((currentValue - previousValue) / Math.abs(previousValue)) * 100,
    );
  } else {
    return Math.floor(((currentValue - previousValue) / previousValue) * 100);
  }
}
