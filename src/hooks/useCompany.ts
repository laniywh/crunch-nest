import { useQuery } from "@tanstack/react-query";
import { fetchCompany } from "@/server/services/companies";
import { SelectCompany } from "@/server/db/schema";
import axios from "axios";

export default function useCompany(symbol: string) {
  return useQuery({
    queryKey: ["company", symbol],
    queryFn: async () => {
      const res = await axios.get<SelectCompany>(
        `/api/companies?symbol=${symbol}`,
      );
      return res?.data;
    },
  });
}
