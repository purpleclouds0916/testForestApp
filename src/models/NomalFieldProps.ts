import { inputValuesTs } from './InputValues';

export interface NormalFieldProps {
  inputValues: inputValuesTs;
  setInputValue: React.Dispatch<React.SetStateAction<inputValuesTs>>;
  className?: string;
  category: "nrf"
}
