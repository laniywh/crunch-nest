import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useReports(symbol: string) {
  return useQuery({
    queryKey: ["reports", symbol],
    queryFn: async () => {
      const res = await axios.get(`/api/financial-reports?symbol=${symbol}`);
      return res.data;
    },
  });
}
