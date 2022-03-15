// import { InputValuesTs } from './InputValues';

export interface ArrayFieldProps {
  // inputValues: InputValuesTs;
  // setInputValue: React.Dispatch<React.SetStateAction<InputValuesTs>>;
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
