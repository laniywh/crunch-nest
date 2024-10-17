import { addCompanyToUserListInDb } from "@/server/db/queries/lists";

export interface AddCompanyToUserListParams {
  listId: number;
  companyId: number;
}

export async function addCompanyToUserList(params: AddCompanyToUserListParams) {
  const { listId, companyId } = params;
  try {
    return await addCompanyToUserListInDb({ listId, companyId });
  } catch (error) {
    console.error("Error adding company to user list:", error);
    throw new Error("Internal Server Error");
  }
}
