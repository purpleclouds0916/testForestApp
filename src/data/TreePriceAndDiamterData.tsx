/* eslint-disable array-callback-return */
import { FieldType } from '../models/FieldType';

const priceArray = [
  9000, 9000, 9000, 9000, 9000, 12500, 12500, 13500, 13500, 14000, 14000,
];

const diamterArray = [6, 8, 9, 12, 14, 15, 16, 18, 22, 24, 28];

const priceFormInformation: FieldType[] = [];
const diamterFormInformation: FieldType[] = [];

priceArray.map((_price, index) => {
  priceFormInformation.push({
    id: index,
    title: `tree-price-${index}`,
    defaultValue: priceArray[index],
  });

  diamterFormInformation.push({
    id: index,
    title: `tree-diamter-${index}`,
    defaultValue: diamterArray[index],
  });
});

const treeThinningCutInformation: FieldType[] = [
  {
    id: 1,
    title: '間伐材の歩留まり',
    description: '間伐材のうち、市場に出せる割合です',
    defaultValue: 0.58,
    unit: '%',
  },
  {
    id: 2,
    title: '間伐のコスト',
    description: '素材生産費と運材費の合計です',
    defaultValue: 10343,
    unit: '本/ha',
  },
  {
    id: 3,
    title: '間伐時の伐採高',
    description: '林分で木を切る時の高さのことです',
    defaultValue: 0.5,
    unit: 'm',
  },
];

const treeClearCutInformation: FieldType[] = [
  {
    id: 1,
    title: '皆伐材の歩留まり',
    description: '皆伐材のうち、市場に出せる割合です',
    defaultValue: 0.62,
    unit: '%',
  },
  {
    id: 2,
    title: '皆伐のコスト',
    description: '素材生産費と運材費の合計です',
    defaultValue: 7182,
    unit: '本/ha',
  },
  {
    id: 3,
    title: '皆伐時の伐採高',
    description: '林分で木を切る時の高さのことです',
    defaultValue: 0.5,
    unit: 'm',
  },
];

const treePriceAndDiamterData = {
  priceFormInformation,
  diamterFormInformation,
  treeThinningCutInformation,
  treeClearCutInformation
}
export default treePriceAndDiamterData;
