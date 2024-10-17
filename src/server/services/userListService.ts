import { addCompanyToUserListQuery } from "@/server/db/queries/addCompanyToUserList";

export async function addCompanyToUserList(listId: string, companyId: string) {
  await addCompanyToUserListQuery(listId, companyId);
}
