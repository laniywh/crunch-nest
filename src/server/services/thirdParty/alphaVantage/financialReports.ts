import axios from "axios";
import type { AxiosResponse } from "axios";
import type {
  AV_FinancialReports,
  FunctionType,
} from "@/server/services/thirdParty/alphaVantage/types";
import { getApiKey } from "@/server/services/apiKeys";
import { env } from "@/env";
import {
  MOCK_BALANCE_SHEET,
  MOCK_CASH_FLOW,
  MOCK_INCOME_STATEMENT,
} from "@/server/services/thirdParty/alphaVantage/mocks";

const API_URL = "https://www.alphavantage.co/query";

export async function fetchFinancialReports(
  symbol: string,
  functionType: FunctionType,
) {
  console.log("fetchFinancialReports from av", { symbol, functionType });

  const useMockData = env.USE_MOCK_API == "true";
  if (useMockData) {
    console.log("fetching mock reports");
    switch (functionType) {
      case "INCOME_STATEMENT":
        return { ...MOCK_INCOME_STATEMENT, symbol, functionType };
      case "BALANCE_SHEET":
        return { ...MOCK_BALANCE_SHEET, symbol, functionType };
      case "CASH_FLOW":
        return { ...MOCK_CASH_FLOW, symbol, functionType };
      default:
        throw new Error("Unknown function type");
    }
  }

  const apiKey = await getApiKey();
  if (!apiKey) {
    throw new Error("Unauthorized");
  }

  try {
    const res: AxiosResponse<AV_FinancialReports> = await axios.get(API_URL, {
      params: {
        function: functionType,
        symbol,
        apikey: apiKey,
      },
    });
    return { ...res?.data, functionType };
  } catch (error) {
    // TODO: handle error
    console.error(error);
  }
}
