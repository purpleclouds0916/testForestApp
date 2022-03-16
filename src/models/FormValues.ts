interface Cut {
  other: {
    yieldRate: string | number;
    cost: string | number;
    stumpHeight: string | number;
  };
  price: { value: number }[];
  diamter: { value: number }[];
}

export interface FormValues {
  treeGrowth: {
    treeHeight: { value: number }[];
    treeVolume: { value: number }[];
    highStandShape: { value: number }[];
    dbh: { value: number }[];
    nrf: number | string;
  };
  management: {
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
  };
  thinning: Cut;
  clearCut: Cut;

  // clearCutOther: ClearCutOtherTs;
  // clearCutPrice: Array<number | string>;
  // clearCutDiamter: Array<number | string>;
}
