/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { VFC } from 'react';

import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { TextField } from '@mui/material';
import FormItem from '../molecules/FormItem';
import SelectFormula from '../molecules/SelectFormula';
import TreeHeightGrowthDescription from '../molecules/TreeHeightGrowthDescription';
import MultipleSelectPlaceholder from '../molecules/Select';
import formInformation from '../../data/FormInformation';
import Card from './Card';
import './TreeGrowth.css';

import { FormValues } from '../../models/FormValues';

interface Props {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
}

const TreeGrowth: VFC<Props> = React.memo((props) => {
  const { control, register, setValue, watch, errors } = props;

  const { fields: treeHeightFields } = useFieldArray({
    control,
    name: 'treeGrowth.treeHeight',
  });
  const { fields: treeVolumeFileds } = useFieldArray({
    control,
    name: 'treeGrowth.treeVolume',
  });
  const { fields: highStandShapeFields } = useFieldArray({
    control,
    name: 'treeGrowth.highStandShape',
  });
  const { fields: dbhFields } = useFieldArray({
    control,
    name: 'treeGrowth.dbh',
  });

  return (
    <Card title="林分の成長">
      <>
        <FormItem
          title="林分密度管理図を選択する"
          description="選択することで、最適な林分材積を計算することができます"
        >
          <MultipleSelectPlaceholder setValue={setValue} />
        </FormItem>
        <SelectFormula watch={watch} control={control} />
        <FormItem
          title="樹高の成長"
          description={<TreeHeightGrowthDescription />}
        >
          <div className="tree-height-field-items">
            {treeHeightFields.map((treeHeightField, index) => (
              <React.Fragment key={treeHeightField.id}>
                <div className="form-field-item-title">
                  {formInformation.treeHeightTitles[index]}
                </div>
                <Controller
                  control={control}
                  name={`treeGrowth.treeHeight.${index}.value`}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="form-field-item-input"
                      error={Boolean(
                        errors?.treeGrowth?.treeHeight?.[index],
                      )}
                      helperText={
                        errors?.treeGrowth?.treeHeight?.[index] &&
                        errors?.treeGrowth?.treeHeight?.[index]?.value?.message
                      }
                    />
                  )}
                />
              </React.Fragment>
            ))}
          </div>
        </FormItem>
        <div className="display-none">
          {treeVolumeFileds.map((treeVolumeFiled, index) => (
            <React.Fragment key={treeVolumeFiled.id}>
              <input
                {...register(`treeGrowth.treeVolume.${index}.value` as const)}
              />
            </React.Fragment>
          ))}
        </div>
        <div className="display-none">
          {highStandShapeFields.map((highStandShapeField, index) => (
            <React.Fragment key={highStandShapeField.id}>
              <input
                {...register(`treeGrowth.treeHeight.${index}.value` as const)}
              />
            </React.Fragment>
          ))}
        </div>
        <div className="display-none">
          {dbhFields.map((dbhField, index) => (
            <React.Fragment key={dbhField.id}>
              <input {...register(`treeGrowth.dbh.${index}.value` as const)} />
            </React.Fragment>
          ))}
        </div>
        <div className="display-none">
          <input {...register('treeGrowth.nrf')} />
        </div>
      </>
    </Card>
  );
});

export default TreeGrowth;
