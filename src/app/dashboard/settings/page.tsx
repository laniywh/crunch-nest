export const dynamic = "force-dynamic";
import Header from "@/components/page/header";
import ApiKeySetting from "@/components/settings/apiKeySetting";
import { getApiKey } from "@/server/services/apiKeys";

export default async function SettingsPage() {
  let apiKey: string | undefined;
  let error: string | null = null;
  try {
    apiKey = await getApiKey();
  } catch (e) {
    console.error("Error getting API key:", (e as Error).message);
    error = (e as Error).message;
  }
  const hasApiKey = !!apiKey;

  return (
    <div>
      <Header>Settings</Header>
      <ApiKeySetting hasApiKey={hasApiKey} />
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
