export interface Management {
  minimumDensity: number | string;
  maximumDensity: number | string;
  minimumClearcut: number | string;
  reforestationCost: number | string;
  priceSaplings: number | string;
  minimumThinning: number | string;
  maximumThinning: number | string;
  annualProfit: number | string;
  ageOfStartThinning: number | string;
  ageOfEndThinning: number | string;
  thinningInterval: number | string;
  maximumNumberOfThinning: number | string;
  [key: string]: number | string; // [key]の型を指定する
}
