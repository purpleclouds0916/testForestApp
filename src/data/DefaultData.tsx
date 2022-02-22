/* eslint-disable */

import { ThinningOtherTs } from '../models/ThinningOther';
import { ClearCutOtherTs } from '../models/ClearCutOther';

const treeHeight = [1, 2, 3, 4];
const treeVolume = [1, 2, 3, 4];
const dbh = [1, 2, 3];
const highStandShape = [1, 2, 3];
const management = {
  minimumDensity: 122,
  maximumDensity: 1,
  minimumClearcut: 1,
  reforestationCost: 1,
  priceSaplings: 1,
  minimumThinning: 1,
  maximumThinning: 1,
  annualProfit: 1,
  ageOfStartThinning: 1,
  ageOfEndThinning: 1,
  thinningInterval: 1,
  maximumNumberOfThinning: 1,
};

const treePrice: Array<number | string> = [
  9000, 9000, 9000, 9000, 9000, 12500, 12500, 13500, 13500, 14000, 14000,
];

const treeDiamter: Array<number | string> = [
  6, 8, 9, 12, 14, 15, 16, 18, 22, 24, 28,
];

const thinningOther: ThinningOtherTs = {
  thinningYieldRate: 10,
  thinningCost: 10,
  thinningStumpHeight: 10,
};

const clearCutOther: ClearCutOtherTs = {
  clearCutYieldRate: 10,
  clearCutCost: 10,
  clearCutStumpHeight: 10,
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
