import type { FinancialReports } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useReports(symbol: string) {
  return useQuery<FinancialReports, Error>({
    queryKey: ["reports", symbol],
    queryFn: async () => {
      const res = await axios.get<FinancialReports>(
        `/api/financial-reports?symbol=${symbol}`,
      );
      return res.data;
    },
  });
}
