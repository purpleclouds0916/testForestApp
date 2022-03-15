/* eslint-disable no-useless-concat */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-self-assign */
/* eslint-disable  */

//　48行目  型定義がエラーになってしまう。解決策がわからない。

import { InputAdornment, TextField } from '@mui/material';

import React, { VFC } from 'react';
// import { ObjectFieldProps } from '../../models/ObjectFieldProps';

import './Form.css';
import FormItem from './FormItem';
import { ManagementInput } from '../../models/ManagementInput';
import { FieldType } from '../../models/FieldType';
import { CutOtherInput } from 'models/CutOtherInput';

interface Props {
  formInformation: FieldType[];
  inputValues: ManagementInput | CutOtherInput;
  setInputValue:
    | React.Dispatch<React.SetStateAction<ManagementInput>>
    | React.Dispatch<React.SetStateAction<CutOtherInput>>;
  className?: string;
}

const FormObject: VFC<Props> = React.memo((props) => {
  const { formInformation, inputValues, setInputValue, className } = props;
  // defaultのdataのIDとフォームのプロパティは一致させる必要があります。
  const ArrayFields = formInformation.map((information) => (
    <div className="form-field-item" key={information.id}>
      <FormItem title={information.title} description={information.description}>
        <TextField
          id=""
          type="text"
          variant="outlined"
          className="form-field-item-input"
          value={inputValues[information.id]}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const valueOfTheCategory: ManagementInput | CutOtherInput =
              inputValues;
            Object.keys(inputValues).map((key) =>
              information.id === key
                ? (inputValues[key] = event.target.value)
                : (inputValues[key] = inputValues[key]),
            );
            // @ts-ignore
            setInputValue({ ...valueOfTheCategory });
          }}
          InputProps={
            information.unit
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      {information.unit}
                    </InputAdornment>
                  ),
                }
              : undefined
          }
        />
      </FormItem>
    </div>
  ));

  return (
    <div className={`${className} ` + `form-field-items`}>{ArrayFields}</div>
  );
});

export default FormObject;
