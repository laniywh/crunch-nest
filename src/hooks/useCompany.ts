import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { SelectCompany } from "@/server/db/schema";

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
