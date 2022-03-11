import { FieldType } from './FieldType';
import { InputValuesTs } from './InputValues';

export interface ObjectFieldProps {
  formInformation: FieldType[];
  inputValues: InputValuesTs;
  setInputValue: React.Dispatch<React.SetStateAction<InputValuesTs>>;
  className?: string;
  category: 'thinningOther' | 'management' | 'clearCutOther';
}

