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

const treePriceAndDiamter = {
  priceFormInformation,
  diamterFormInformation
}

export default treePriceAndDiamter;
