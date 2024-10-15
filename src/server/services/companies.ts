import { getCompanyInDb } from "@/server/db/queries/companies";

export async function fetchCompany(symbol: string) {
  return getCompanyInDb(symbol);
}
