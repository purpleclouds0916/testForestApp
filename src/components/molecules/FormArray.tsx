/* eslint-disable prefer-template */
/* eslint-disable no-useless-concat */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable  */

import { TextField } from '@mui/material';
import React, { VFC } from 'react';
import { TreePriceInput } from '../../models/TreePriceInput';
import { TreeGrowthInput } from '../../models/TreeGrowthInput';

import './Form.css';
import FormItem from './FormItem';

type Props = {
  children?: JSX.Element;
  title?: JSX.Element[] | string[];
  inputValues: TreeGrowthInput | TreePriceInput;
  setInputValue:
    | React.Dispatch<React.SetStateAction<TreeGrowthInput>>
    | React.Dispatch<React.SetStateAction<TreePriceInput>>;
  className: string;
  category:
    | 'treeHeight'
    | 'treeVolume'
    | 'dbh'
    | 'highStandShape'
    | 'price'
    | 'diamter';
};

const FormArray: VFC<Props> = React.memo((props) => {
  const { inputValues, setInputValue, category, className, children, title } =
    props;
  // @ts-ignore
  const ArrayFields = inputValues[category].map((_, index) => (
    <React.Fragment key={`${category}_${index}`}>
      <FormItem title={title ? title[index] : undefined}>
        <TextField
          id=""
          className="form-field-item-input"
          type="text"
          variant="outlined"
          // @ts-ignore
          value={inputValues[category][index]}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const valueOfTheCategory: Array<number | string> = [];
            // @ts-ignore
            inputValues[category].map((inputValue, nestIndex) =>
              index === nestIndex
                ? valueOfTheCategory.push(event.target.value)
                : valueOfTheCategory.push(inputValue),
            );
            // @ts-ignore
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
});

export default FormArray;
