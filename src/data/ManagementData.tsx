import { FieldType } from '../models/FieldType';

const managementData: FieldType[] = [
  {
    id: 1,
    title: '最小の植林密度',
    description: 'この値よりも小さい植林密度にはなりません',
    defaultValue: 1,
    unit: '本/ha',
  },
  {
    id: 2,
    title: '最大の植林密度',
    description: 'この値よりも大きい植林密度にはなりません',
    defaultValue: 9,
    unit: '本/ha',
  },
  {
    id: 3,
    title: '主伐の直前の最小の植林密度',
    description: 'この値を下回る植林密度になる間伐は実施しません',
    defaultValue: 1,
    unit: '本/ha',
  },
  {
    id: 4,
    title: '植林・育林費用',
    description: '地拵え,下刈り、枝打ち、除伐、獣害対策の合計費用',
    defaultValue: 9,
    unit: '円/ha',
  },
  {
    id: 5,
    title: '苗木の価格',
    description: '苗木一本あたりの費用',
    defaultValue: 1,
    unit: '円/本',
  },
  {
    id: 6,
    title: '最小の間伐率',
    description: 'この値以下の間伐は実施されません',
    defaultValue: 1,
    unit: '%',
  },
  {
    id: 7,
    title: '最大の間伐率',
    description: 'この値以上の間伐は実施されません',
    defaultValue: 9,
    unit: '%',
  },
  {
    id: 8,
    title: '年利',
    description:
      '林業経営におけるリスクのことです。一般的には0.8 ~ 0.9になります',
    defaultValue: 1,
    unit: '%',
  },
  {
    id: 9,
    title: '間伐を開始する林齢',
    description: 'この値以下の林齢では、間伐を実施しません',
    defaultValue: 9,
    unit: '年',
  },
  {
    id: 10,
    title: '最大伐期',
    description: 'この値以下の林業施業を提案します',
    defaultValue: 1,
    unit: '年',
  },
  {
    id: 11,
    title: '間伐の間隔',
    description: '間伐をしてから次の間伐までの最小の期間です',
    defaultValue: 9,
    unit: '年',
  },
  {
    id: 12,
    title: '間伐の最大回数',
    description: 'これよりも多い間伐は実施されません',
    defaultValue: 1,
    unit: '回',
  },
];

export default managementData;
