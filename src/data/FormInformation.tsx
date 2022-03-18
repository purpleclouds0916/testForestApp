/* eslint-disable array-callback-return */
import TeX from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';
import StandDensityData from './StandDensityData.json';

// const checkIsfilled: (state: string) => boolean = (state) => state.length <= 0;
const treePrice: Array<number> = [
  9000, 9000, 9000, 9000, 9000, 12500, 12500, 13500, 13500, 14000, 14000,
];
const treeDiamter: Array<number> = [6, 8, 9, 12, 14, 15, 16, 18, 22, 24, 28];

const treeVolume: { value: number }[] = [];
const dbh: { value: number }[] = [];
const highStandShape: { value: number }[] = [];
const price: { value: number }[] = [];
const diamter: { value: number }[] = [];

StandDensityData.tohokuSugi.SDMD.V.map((value) => {
  treeVolume.push({ value });
});
StandDensityData.tohokuSugi.SDMD.V.map((value) => {
  dbh.push({ value });
});
StandDensityData.tohokuSugi.SDMD.V.map((value) => {
  highStandShape.push({ value });
});

treePrice.map((value) => {
  price.push({ value });
});
treeDiamter.map((value) => {
  diamter.push({ value });
});

// useFieldArray のみここでdefault値を設置
const defaultValue = {
  treeGrowth: {
    treeHeight: [
      {
        value: 32.84414,
      },
      {
        value: 0.0136,
      },
      {
        value: 0,
      },
      {
        value: 0.92438,
      },
    ],
    treeVolume,
    highStandShape,
    dbh,
    nrf: StandDensityData.tohokuSugi.SDMD.NRf,
  },
  management: {
    minimumDensity: 500,
    maximumDensity: 2000,
  },
  thinning: {
    price,
    diamter,
  },
  clearCut: {
    price,
    diamter,
  },
};

const thinningOther = [
  {
    id: 'yieldRate',
    title: '間伐材の歩留まり',
    description: '間伐材のうち、市場に出せる割合です',
    defaultValue: 0.58,
    unit: '%',
  },
  {
    id: 'cost',
    title: '間伐のコスト',
    description: '素材生産費と運材費の合計です',
    defaultValue: 10947,
    unit: '本/ha',
  },
  {
    id: 'stumpHeight',
    title: '間伐時の伐採高',
    description: '林分で木を切る時の高さのことです',
    defaultValue: 0.5,
    unit: 'm',
  },
] as const;

const clearCutOther = [
  {
    id: 'yieldRate',
    title: '皆伐材の歩留まり',
    description: '皆伐材のうち、市場に出せる割合です',
    defaultValue: 0.58,
    unit: '%',
  },
  {
    id: 'cost',
    title: '皆伐のコスト',
    description: '素材生産費と運材費の合計です',
    defaultValue: 6869,
    unit: '本/ha',
  },
  {
    id: 'stumpHeight',
    title: '皆伐時の伐採高',
    description: '林分で木を切る時の高さのことです',
    defaultValue: 0.5,
    unit: 'm',
  },
] as const;

const management = [
  {
    id: 'minimumDensity',
    title: '最小の植林密度',
    description: 'この値よりも小さい植林密度にはなりません',
    unit: '本/ha',
    defaultValue: 500,
  },
  {
    id: 'maximumDensity',
    title: '最大の植林密度',
    description: 'この値よりも大きい植林密度にはなりません',
    defaultValue: 3000,
    unit: '本/ha',
  },
  {
    id: 'minimumClearcut',
    title: '主伐の直前の最小の植林密度',
    description: 'この値を下回る植林密度になる間伐は実施しません',
    defaultValue: 450,
    unit: '本/ha',
  },
  {
    id: 'reforestationCost',
    title: '植林・育林費用',
    description: '地拵え,下刈り、枝打ち、除伐、獣害対策の合計費用',
    defaultValue: 1953682,
    unit: '円/ha',
  },
  {
    id: 'priceSaplings',
    title: '苗木の価格',
    description: '苗木一本あたりの費用',
    defaultValue: 375,
    unit: '円/本',
  },
  {
    id: 'minimumThinning',
    title: '最小の間伐率',
    description: 'この値以下の間伐は実施されません',
    defaultValue: 10,
    unit: '%',
  },
  {
    id: 'maximumThinning',
    title: '最大の間伐率',
    description: 'この値以上の間伐は実施されません',
    defaultValue: 50,
    unit: '%',
  },
  {
    id: 'annualProfit',
    title: '年利',
    description:
      '林業経営におけるリスクのことです。一般的には0.8 ~ 0.9になります',
    defaultValue: 0.8,
    unit: '%',
  },
  {
    id: 'ageOfStartThinning',
    title: '間伐を開始する林齢',
    description: 'この値以下の林齢では、間伐を実施しません',
    defaultValue: 10,
    unit: '年',
  },
  {
    id: 'ageOfEndThinning',
    title: '最大伐期',
    description: 'この値以下の林業施業を提案します',
    defaultValue: 200,
    unit: '年',
  },
  {
    id: 'thinningInterval',
    title: '間伐の間隔',
    description: '間伐をしてから次の間伐までの最小の期間です',
    defaultValue: 5,
    unit: '年',
  },
  {
    id: 'maximumNumberOfThinning',
    title: '間伐の最大回数',
    description: 'これよりも多い間伐は実施されません',
    defaultValue: 10,
    unit: '回',
  },
] as const;

const treeHeightTitles = [
  <TeX>{String.raw`a`}</TeX>,
  <TeX>{String.raw`b`}</TeX>,
  <TeX>{String.raw`c`}</TeX>,
  <TeX>{String.raw`d`}</TeX>,
];

const formInformation = {
  thinningOther,
  clearCutOther,
  management,
  treeHeightTitles,
  defaultValue,
};
export default formInformation;
