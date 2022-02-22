/* eslint-disable no-self-assign */
/* eslint-disable no-return-assign */
/* eslint-disable  */
import { TextField } from '@mui/material';
import React, { VFC } from 'react';
import { ArrayFieldProps } from '../../models/ArrayFieldProps';

import './Form.css';

const FormArray: VFC<ArrayFieldProps> = (props) => {
  const { inputValues, setInputValue, category, className } = props;

  const ArrayFields = inputValues[category].map((_, index) => (
    <div className={className} key={`${category}_${index}`}>
      <TextField
        id=""
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
    </div>
  ));

  return <div className="ArrayFields">{ArrayFields}</div>;
};

export default FormArray;
