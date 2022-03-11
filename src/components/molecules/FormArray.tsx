/* eslint-disable prefer-template */
/* eslint-disable no-useless-concat */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable react/no-array-index-key */

import { TextField } from '@mui/material';

import React, { VFC } from 'react';
import { ArrayFieldProps } from '../../models/ArrayFieldProps';

import './Form.css';
import FormItem from './FormItem';

type Props = {
  children?: JSX.Element;
  title?: JSX.Element[] | string[];
};

const FormArray: VFC<ArrayFieldProps & Props> = (props) => {
  const { inputValues, setInputValue, category, className, children, title } =
    props;

  const ArrayFields = inputValues[category].map((_, index) => (
    <React.Fragment key={`${category}_${index}`}>
      <FormItem title={title ? title[index] : undefined}>
        <TextField
          id=""
          className="form-field-item-input"
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
      </FormItem>
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
