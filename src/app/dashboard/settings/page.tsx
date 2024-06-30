import Header from "@/components/page/header";
import ApiKeySetting from "@/components/settings/apiKeySetting";
import { getHasApiKey } from "@/lib/api/server/apiKey";

export default async function SettingsPage() {
  let hasApiKey = false;
  try {
    hasApiKey = await getHasApiKey();
  } catch (error) {
    console.error("Error getting API key:", error);
  }

  return (
    <div>
      <Header>Settings</Header>
      <ApiKeySetting hasApiKey={hasApiKey} />
    </div>
  );
}
