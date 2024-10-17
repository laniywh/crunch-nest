import { useMutation } from "react-query";

export function useAddCompanyToUserList() {
  return useMutation(async ({ listId, companyId }: { listId: string; companyId: string }) => {
    const response = await fetch("/api/user-lists/add-company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listId, companyId }),
    });

    if (!response.ok) {
      throw new Error("Failed to add company to list");
    }
  });
}
