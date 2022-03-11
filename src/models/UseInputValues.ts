import { InputValuesTs } from './InputValues';

export interface UseInputValues {
  inputValues: InputValuesTs
  setInputValue: React.Dispatch<React.SetStateAction<InputValuesTs>>;
}
