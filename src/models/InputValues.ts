import { Management } from './ManagementModels';
import { ThinningOtherTs } from './ThinningOther';
import { ClearCutOtherTs } from './ClearCutOther';

export interface InputValuesTs {
  treeHeight: Array<number | string>;
  treeVolume: Array<number | string>;
  highStandShape: Array<number | string>;
  dbh: Array<number | string>;
  nrf: number | string;
  management: Management;
  thinningOther: ThinningOtherTs;
  thinningPrice: Array<number | string>;
  thinningDiamter: Array<number | string>;
  clearCutOther: ClearCutOtherTs;
  clearCutPrice: Array<number | string>;
  clearCutDiamter: Array<number | string>;
}
