"use client";
import Button from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { upsertApiKey } from "@/lib/api/client/apiKey";
import { toast } from "react-toastify";

export default function ApiKeySetting({ hasApiKey }: { hasApiKey: boolean }) {
  const { user } = useUser();
  const defaultApiKey = "***********************";
  const [apiKey, setApiKey] = useState(hasApiKey ? defaultApiKey : "");
  const handleSaveAPIKey = async (e: any) => {
    e.preventDefault();

    if (!user) {
      return;
    }
    try {
      const res = await upsertApiKey(user.id, apiKey);
    } catch (error) {
      toast((error as Error).message, { type: "error" });
    }
  };
  return (
    <div>
      <label className="font-medium">API key</label>
      <form className={"mt-2"}>
        <fieldset className="flex items-center justify-between gap-2">
          <input
            name="apiKey"
            id="apiKey"
            type="text"
            className={"block w-full grow rounded border p-2 sm:w-96"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <Button onClick={handleSaveAPIKey}>Save</Button>
        </fieldset>
      </form>
    </div>
  );
}
