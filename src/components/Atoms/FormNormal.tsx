import { TextField } from '@mui/material';
import React, { VFC } from 'react';
import { TreeGrowthInput } from '../../models/TreeGrowthInput';

interface Props {
  inputValues: TreeGrowthInput;
  setInputValue: React.Dispatch<React.SetStateAction<TreeGrowthInput>>;
  className?: string;
  category: 'nrf';
}

const FormNomal: VFC<Props> = React.memo((props) => {
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
});

export default FormNomal;
