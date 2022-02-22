import { FieldType } from '../models/FieldType';

const thinningOtherData: FieldType[] = [
  {
    id: 'thinningYieldRate',
    title: '間伐材の歩留まり',
    description: '間伐材のうち、市場に出せる割合です',
    unit: '%',
  },
  {
    id: 'thinningCost',
    title: '間伐のコスト',
    description: '素材生産費と運材費の合計です',
    unit: '本/ha',
  },
  {
    id: 'thinningStumpHeight',
    title: '間伐時の伐採高',
    description: '林分で木を切る時の高さのことです',
    unit: 'm',
  },
];

const clearCutOtherData: FieldType[] = [
  {
    id: 'clearCutYieldRate',
    title: '皆伐材の歩留まり',
    description: '皆伐材のうち、市場に出せる割合です',
    unit: '%',
  },
  {
    id: 'clearCutCost',
    title: '皆伐のコスト',
    description: '素材生産費と運材費の合計です',
    unit: '本/ha',
  },
  {
    id: 'clearCutStumpHeight',
    title: '皆伐時の伐採高',
    description: '林分で木を切る時の高さのことです',
    unit: 'm',
  },
];

const CutOtherData = {
  thinningOtherData,
  clearCutOtherData,
};
export default CutOtherData;
