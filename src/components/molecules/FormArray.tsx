/* eslint-disable no-self-assign */
/* eslint-disable no-return-assign */
/* eslint-disable  */
import { TextField } from '@mui/material';
import React, { VFC } from 'react';
import { ArrayFieldProps } from '../../models/ArrayFieldProps';

import './Form.css';

type Props = {
  children?: JSX.Element;
};

const FormArray: VFC<ArrayFieldProps & Props> = (props) => {
  const { inputValues, setInputValue, category, className, children } = props;

  const ArrayFields = inputValues[category].map((_, index) => (
    <React.Fragment key={`${category}_${index}`}>
      <TextField
        id=""
        className={'form-field-item-input'}
        type="text"
        variant="outlined"
        value={inputValues[category][index]}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const valueOfTheCategory: Array<number | string> = [];
          inputValues[category].map((inputValue, nestIndex) =>
            index === nestIndex
              ? valueOfTheCategory.push(event.target.value)
              : valueOfTheCategory.push(inputValue),
          );

          setInputValue({
            ...inputValues,
            [category]: valueOfTheCategory,
          });
        }}
      />
    </React.Fragment>
  ));

  return (
    <div className={className + ' ' + 'form-field-items'}>
      {children && children}
      {ArrayFields}
    </div>
  );
};

export default FormArray;
