/* eslint-disable no-self-assign */
/* eslint-disable no-return-assign */
/* eslint-disable */

import { InputAdornment, TextField } from '@mui/material';

import React, { VFC } from 'react';
import { Management } from '../../models/ManagementModels';
import { ObjectFieldProps } from '../../models/ObjectFieldProps';
import { ThinningOtherTs } from '../../models/ThinningOther';
import { ClearCutOtherTs } from '../../models/ClearCutOther';

import './Form.css';

const FormObject: VFC<ObjectFieldProps> = (props) => {
  const { formInformation, inputValues, setInputValue, category, className } =
    props;
  // defaultのdataのIDとフォームのプロパティは一致させる必要があります。
  const ArrayFields = formInformation.map((information) => (
    <div className="form-field-item" key={information.id}>
      {information.title && <div className='form-field-item-title'>{information.title}</div>}
      {information.description && <p className='form-field-item-description'>{information.description}</p>}
      <TextField
        id=""
        type="text"
        variant="outlined"
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
    </div>
  ));

  return (
    <div className={className + ' ' + 'form-field-items'}>{ArrayFields}</div>
  );
};

export default FormObject;
