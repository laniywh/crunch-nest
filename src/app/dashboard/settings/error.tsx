"use client";

export default function SettingsError({ error }: { error: Error }) {
  return <div>Error loading Settings: {error.message}</div>;
}
