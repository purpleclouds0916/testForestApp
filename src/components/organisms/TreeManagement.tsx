/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-useless-fragment */

import React, { VFC } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import formInformation from '../../data/FormInformation';
// import FormObject from '../molecules/FormObject';
import Card from './Card';
import FormItem from '../molecules/FormItem';
import '../molecules/Form.css';
import { FormValues } from '../../models/FormValues';

interface Props {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
}

const TreeManagement: VFC<Props> = React.memo((props) => {
  const ArrayFields = formInformation.management.map((information) => (
    <div className="form-field-item" key={information.id}>
      <FormItem title={information.title} description={information.description}>
        <>
          <Controller
            name={`management.${information.id}`}
            control={props.control}
            defaultValue={information.defaultValue}
            render={({ field }) => (
              <TextField
                {...field}
                className="form-field-item-input"
                error={Boolean(props.errors?.management?.[information.id])}
                helperText={
                  props.errors?.management?.[information.id] &&
                  props.errors?.management?.[information.id]?.message
                }
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
            )}
          />
        </>
      </FormItem>
    </div>
  ));

  return (
    <Card title="経営方法の詳細">
      <div className="form-field-items management-field-items">
        {ArrayFields}
      </div>
    </Card>
  );
});

export default TreeManagement;
