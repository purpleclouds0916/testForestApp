/* eslint-disable */

import { ThinningOtherTs } from '../models/ThinningOther';
import { ClearCutOtherTs } from '../models/ClearCutOther';
import StandDensityData from './StandDensityData.json';
//  [32.8441393, -1, -0.01360109, 4];
const treeHeight = [32.84414, 0.0136, 0, 0.92438];
const treeVolume = StandDensityData.tohokuSugi.SDMD.V;
const dbh = StandDensityData.tohokuSugi.SDMD.DBH;
const highStandShape = StandDensityData.tohokuSugi.SDMD.HF;
const management = {
  minimumDensity: 500,
  maximumDensity: 5000,
  minimumClearcut: 450,
  reforestationCost: 1953682,
  priceSaplings: 375,
  minimumThinning: 10,
  maximumThinning: 50,
  annualProfit: 0.8,
  ageOfStartThinning: 10,
  ageOfEndThinning: 200,
  thinningInterval: 5,
  maximumNumberOfThinning: 10,
};

const treePrice: Array<number | string> = [
  9000, 9000, 9000, 9000, 9000, 12500, 12500, 13500, 13500, 14000, 14000,
];

const treeDiamter: Array<number | string> = [
  6, 8, 9, 12, 14, 15, 16, 18, 22, 24, 28,
];

const thinningOther: ThinningOtherTs = {
  thinningYieldRate: 0.58,
  thinningCost: 10947,
  thinningStumpHeight: 0.5,
};

const clearCutOther: ClearCutOtherTs = {
  clearCutYieldRate: 0.58,
  clearCutCost: 6869,
  clearCutStumpHeight: 0.5,
};

const defaultData = {
  treeHeight,
  treeVolume,
  highStandShape,
  dbh,
  management,
  treeDiamter,
  treePrice,
  thinningOther,
  clearCutOther,
};

export default defaultData;
