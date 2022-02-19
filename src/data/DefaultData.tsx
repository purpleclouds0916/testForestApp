import { FieldType } from '../models/FieldType';
import { FormState } from '../models/FormState';

import sdmdData from './SdmdData';
import densityFormInformation from './ManagementData';
import treePriceAndDiamter from './TreePriceAndDiamterData';

const GetDefaultValues = (FormInformation: FieldType[]) => {
  const defaultValues: FormState[] = [];
  FormInformation.map((information) =>
    defaultValues.push({
      name: information.title ?? "Null",
      value: information.defaultValue,
    }),
  );

  return defaultValues;
};

const treeHeight = GetDefaultValues(sdmdData.treeHeight);
const treeVolume = GetDefaultValues(sdmdData.treeVolume);
const nrf = GetDefaultValues(sdmdData.nrf);
const dbh = GetDefaultValues(sdmdData.dbh);
const management = GetDefaultValues(densityFormInformation);
const treePrice = GetDefaultValues(treePriceAndDiamter.priceFormInformation);
const treeDiamter = GetDefaultValues(
  treePriceAndDiamter.diamterFormInformation,
);
const thinningOther = GetDefaultValues(
  treePriceAndDiamter.treeThinningCutInformation,
);
const clearCutOther = GetDefaultValues(
  treePriceAndDiamter.treeThinningCutInformation,
);

const defaultData = {
  treeHeight,
  treeVolume,
  nrf,
  dbh,
  management,
  treeDiamter,
  treePrice,
  thinningOther,
  clearCutOther,
};

export default defaultData;
