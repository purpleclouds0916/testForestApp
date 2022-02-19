/*  eslint-disable @typescript-eslint/no-unsafe-assignment */

import { InputAdornment, TextField } from '@mui/material';
import React, { VFC } from 'react';
import { ArrayFieldProps } from '../../models/ArrayFieldProps';

import './Form.css';

const Form: VFC<ArrayFieldProps> = (props) => {
  const { formInformation, inputValues, setInputValue, category, className } =
    props;

  const ArrayFields = formInformation.map((information, index) => (
    <div className={className ?? "null"} key={information.id}>
      {information.title && <div>{information.title}</div>}
      {information.description && <p>{information.description}</p>}
      <TextField
        id=""
        type="text"
        variant="outlined"
        value={inputValues[category][index].value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue({
            ...inputValues,
            [category]: inputValues[category].map((inputValue, nestIndex) =>
              nestIndex === index
                ? { name: inputValue.name, value: event.target.value }
                : { name: inputValue.name, value: inputValue.value },
            ),
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

  return <div className="ArrayFields">{ArrayFields}</div>;
};

export default Form;
