import { TextField } from '@mui/material';
import React, { VFC } from 'react';
import { NormalFieldProps } from '../../models/NomalFieldProps';

const FormNomal: VFC<NormalFieldProps> = (props) => {
  const { inputValues, setInputValue, category, className } = props;

  return (
    <div className={className} key={category}>
      <TextField
        id=""
        type="text"
        variant="outlined"
        value={inputValues[category]}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue({
            ...inputValues,
            [category]: event.target.value,
          });
        }}
      />
    </div>
  );
};

export default FormNomal;
