import {
  getCompanyInDb,
  getRecentlyViewedCompanies,
} from "@/server/db/queries/companies";

export async function fetchCompany(symbol: string) {
  return getCompanyInDb(symbol);
}

export async function getRecentCompanies() {
  return getRecentlyViewedCompanies();
}
