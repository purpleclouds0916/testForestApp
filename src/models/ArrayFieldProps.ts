import { FieldType } from './FieldType';
import { FormState } from './FormState';

interface inputValues {
  management: FormState[];
  thinningOther: FormState[];
  thinningPrice: FormState[];
  thinningDiamter: FormState[];
  clearCutOther: FormState[];
  clearCutPrice: FormState[];
  clearCutDiamter: FormState[];
  treeHeight: FormState[];
  treeVolume: FormState[];
  nrf: FormState[];
  dbh: FormState[];
}

export interface ArrayFieldProps {
  formInformation: FieldType[];
  inputValues: inputValues;
  setInputValue: React.Dispatch<React.SetStateAction<inputValues>>;
  className?: string;
  category:
    | 'management'
    | 'thinningOther'
    | 'thinningPrice'
    | 'thinningDiamter'
    | 'clearCutOther'
    | 'clearCutPrice'
    | 'clearCutDiamter'
    | 'treeHeight'
    | 'treeVolume'
    | 'nrf'
    | 'dbh';
}
