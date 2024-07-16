export async function upsertApiKey(userId: string, apiKey: string) {
  try {
    const res = await fetch("/api/api-key", {
      method: "POST",
      body: JSON.stringify({ userId, key: apiKey }),
    });
  } catch (error) {
    throw new Error("Error saving API key");
  }
}
