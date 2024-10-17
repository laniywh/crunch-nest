import { getUserCompanyListsInDb } from "@/server/db/queries/lists";

export const getUserCompanyLists = async (
  userId: string,
  companyId: number,
) => {
  try {
    const lists = await getUserCompanyListsInDb(userId, companyId);
    return lists;
  } catch (error) {
    console.error("Service error:", error);
    throw new Error("Error fetching user company lists");
  }
};
