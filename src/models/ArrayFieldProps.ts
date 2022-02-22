import { inputValuesTs } from './InputValues';

export interface ArrayFieldProps {
  inputValues: inputValuesTs;
  setInputValue: React.Dispatch<React.SetStateAction<inputValuesTs>>;
  className?: string;
  category:
    | 'thinningPrice'
    | 'thinningDiamter'
    | 'clearCutPrice'
    | 'clearCutDiamter'
    | 'treeHeight'
    | 'treeVolume'
    | 'dbh'
    | 'highStandShape';
}
