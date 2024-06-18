"use client";
import Header from "@/app/_components/page/header";
import Button from "@/app/_components/button";

export default function SettingsPage() {
  return (
    <div>
      <Header>Settings</Header>

      <label className="font-medium">API key</label>
      <div className={"mt-2 flex items-center gap-2"}>
        <input
          name="apiKey"
          id="apiKey"
          type="text"
          className={"block w-full grow rounded border p-2 sm:w-96"}
        />

        <Button onClick={() => console.log("saved")}>Save</Button>
      </div>
    </div>
  );
}
