import { FieldType } from './FieldType';

export interface ArrayFieldProps {
  formInformation: FieldType[];
  inputValues: {
    name: string;
    value: number | string;
  }[];
  setInputValue: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        value: number | string;
      }[]
    >
  >;
}
