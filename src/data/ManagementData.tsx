import { FieldType } from '../models/FieldType';

const managementData: FieldType[] = [
  {
    id: 'minimumDensity',
    title: '最小の植林密度',
    description: 'この値よりも小さい植林密度にはなりません',
    unit: '本/ha',
  },
  {
    id: 'maximumDensity',
    title: '最大の植林密度',
    description: 'この値よりも大きい植林密度にはなりません',
    unit: '本/ha',
  },
  {
    id: 'minimumClearcut',
    title: '主伐の直前の最小の植林密度',
    description: 'この値を下回る植林密度になる間伐は実施しません',
    unit: '本/ha',
  },
  {
    id: 'reforestationCost',
    title: '植林・育林費用',
    description: '地拵え,下刈り、枝打ち、除伐、獣害対策の合計費用',
    unit: '円/ha',
  },
  {
    id: 'priceSaplings',
    title: '苗木の価格',
    description: '苗木一本あたりの費用',
    unit: '円/本',
  },
  {
    id: 'minimumThinning',
    title: '最小の間伐率',
    description: 'この値以下の間伐は実施されません',
    unit: '%',
  },
  {
    id: 'maximumThinning',
    title: '最大の間伐率',
    description: 'この値以上の間伐は実施されません',
    unit: '%',
  },
  {
    id: 'annualProfit',
    title: '年利',
    description:
      '林業経営におけるリスクのことです。一般的には0.8 ~ 0.9になります',
    unit: '%',
  },
  {
    id: 'ageOfStartThinning',
    title: '間伐を開始する林齢',
    description: 'この値以下の林齢では、間伐を実施しません',
    unit: '年',
  },
  {
    id: 'ageOfEndThinning',
    title: '最大伐期',
    description: 'この値以下の林業施業を提案します',
    unit: '年',
  },
  {
    id: 'thinningInterval',
    title: '間伐の間隔',
    description: '間伐をしてから次の間伐までの最小の期間です',
    unit: '年',
  },
  {
    id: 'maximumNumberOfThinning',
    title: '間伐の最大回数',
    description: 'これよりも多い間伐は実施されません',
    unit: '回',
  },
];

export default managementData;
