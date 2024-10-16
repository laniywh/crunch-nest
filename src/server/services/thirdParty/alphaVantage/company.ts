import { getApiKey } from "@/server/services/apiKeys";
import axios from "axios";
import type { AxiosResponse } from "axios";
import { env } from "@/env";
import type { InsertCompany } from "@/server/db/schema";
import type { AV_Company } from "@/server/services/thirdParty/alphaVantage/types";
import { MOCK_COMPANY } from "@/server/services/thirdParty/alphaVantage/mocks";

export async function fetchCompany(symbol: string) {
  console.log({ symbol });

  const useMockData = env.USE_MOCK_API == "true";
  console.log("useMockData", useMockData);
  if (useMockData) {
    console.log("fetching mock company");
    return convertToCompany({ ...MOCK_COMPANY, Symbol: symbol });
  }

  const apiKey = await getApiKey();
  if (!apiKey) {
    throw new Error("Unauthorized");
  }

  try {
    const res: AxiosResponse = await axios.get(env.ALPHA_VANTAGE_API, {
      params: {
        function: "OVERVIEW",
        symbol,
        apikey: apiKey,
      },
    });
    return convertToCompany(res?.data as AV_Company);
  } catch (error) {
    // TODO: handle error
    console.error(error);
  }
}

function convertToCompany(company: AV_Company): InsertCompany {
  return {
    symbol: company.Symbol,
    name: company.Name,
    description: company.Description,
  };
}

// const MOCK_COMPANY: AV_Company = {
//   Symbol: "TSLA",
//   Name: "Tesla Inc",
//   Description:
//     "Tesla, Inc. is an American electric vehicle and clean energy company based in Palo Alto, California. Tesla's current products include electric cars, battery energy storage from home to grid-scale, solar panels and solar roof tiles, as well as other related products and services. In 2020, Tesla had the highest sales in the plug-in and battery electric passenger car segments, capturing 16% of the plug-in market (which includes plug-in hybrids) and 23% of the battery-electric (purely electric) market. Through its subsidiary Tesla Energy, the company develops and is a major installer of solar photovoltaic energy generation systems in the United States. Tesla Energy is also one of the largest global suppliers of battery energy storage systems, with 3 GWh of battery storage supplied in 2020.",
// AssetType: 'Common Stock',
// CIK: '1318605',
// Exchange: 'NASDAQ',
// Currency: 'USD',
// Country: 'USA',
// Sector: 'MANUFACTURING',
// Industry: 'MOTOR VEHICLES & PASSENGER CAR BODIES',
// Address: '3500 DEER CREEK RD, PALO ALTO, CA, US',
// FiscalYearEnd: 'December',
// LatestQuarter: '2024-03-31',
// MarketCapitalization: '737534345000',
// EBITDA: '12265000000',
// PERatio: '59.15',
// PEGRatio: '2.982',
// BookValue: '20.19',
// DividendPerShare: 'None',
// DividendYield: 'None',
// EPS: '3.91',
// RevenuePerShareTTM: '29.8',
// ProfitMargin: '0.144',
// OperatingMarginTTM: '0.055',
// ReturnOnAssetsTTM: '0.0472',
// ReturnOnEquityTTM: '0.237',
// RevenueTTM: '94745002000',
// GrossProfitTTM: '20853000000',
// DilutedEPSTTM: '3.91',
// QuarterlyEarningsGrowthYOY: '-0.534',
// QuarterlyRevenueGrowthYOY: '-0.087',
// AnalystTargetPrice: '181.76',
// AnalystRatingStrongBuy: '7',
// AnalystRatingBuy: '13',
// AnalystRatingHold: '21',
// AnalystRatingSell: '6',
// AnalystRatingStrongSell: '4',
// TrailingPE: '59.15',
// ForwardPE: '67.57',
// PriceToSalesRatioTTM: '5.67',
// PriceToBookRatio: '8.35',
// EVToRevenue: '12.42',
// EVToEBITDA: '58.23',
// Beta: '2.318',
// '52WeekHigh': '299.29',
// '52WeekLow': '138.8',
// '50DayMovingAverage': '179.34',
// '200DayMovingAverage': '205.7',
// SharesOutstanding: '3189200000',
// DividendDate: 'None',
// ExDividendDate: 'None'
// };
