import { FieldType } from './FieldType';
// import { FormState } from './FormState';
import { inputValuesTs } from './InputValues';

export interface ObjectFieldProps {
  formInformation: FieldType[];
  inputValues: inputValuesTs;
  setInputValue: React.Dispatch<React.SetStateAction<inputValuesTs>>;
  className?: string;
  category: 'thinningOther' | 'management' | 'clearCutOther';
}
