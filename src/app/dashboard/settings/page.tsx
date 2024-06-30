import Header from "@/components/page/header";
import ApiKeySetting from "@/components/settings/apiKeySetting";
import { getHasApiKey } from "@/lib/api/server/apiKey";

export default async function SettingsPage() {
  let hasApiKey = false;
  let error: string | null = null;
  try {
    hasApiKey = await getHasApiKey();
  } catch (e) {
    console.error("Error getting API key:", (e as Error).message);
    error = (e as Error).message;
  }

  return (
    <div>
      <Header>Settings</Header>
      <ApiKeySetting hasApiKey={hasApiKey} />
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
