/* eslint-disable no-useless-concat */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-self-assign */
/* eslint-disable no-return-assign */

import { InputAdornment, TextField } from '@mui/material';

import React, { VFC } from 'react';
import { Management } from '../../models/ManagementModels';
import { ObjectFieldProps } from '../../models/ObjectFieldProps';
import { ThinningOtherTs } from '../../models/ThinningOther';
import { ClearCutOtherTs } from '../../models/ClearCutOther';

import './Form.css';
import FormItem from './FormItem';

const FormObject: VFC<ObjectFieldProps> = (props) => {
  const { formInformation, inputValues, setInputValue, category, className } =
    props;
  // defaultのdataのIDとフォームのプロパティは一致させる必要があります。
  const ArrayFields = formInformation.map((information) => (
    <div className="form-field-item" key={information.id}>
      <FormItem title={information.title} description={information.description}>
        <TextField
          id=""
          type="text"
          variant="outlined"
          className="form-field-item-input"
          value={inputValues[category][information.id]}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const valueOfTheCategory:
              | Management
              | ThinningOtherTs
              | ClearCutOtherTs = inputValues[category];
            Object.keys(inputValues[category]).map((key) =>
              information.id === key
                ? (inputValues[category][key] = event.target.value)
                : (inputValues[category][key] = inputValues[category][key]),
            );

            setInputValue({
              ...inputValues,
              [category]: valueOfTheCategory,
            });
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
};

export default FormObject;
